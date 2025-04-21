from typing import List, Optional

from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from firebase_admin import auth 

from routing.books import Book
from database import Database


router = APIRouter()


def _verify_token(token: str) -> str:
    """Return Firebase `uid` or raise 401."""
    try:
        return auth.verify_id_token(token)["uid"]
    except Exception as err:  # noqa: BLE001
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {err}")


def _update_read_status(*, uid: str, book_id: int, is_read: bool) -> None:
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            """
            UPDATE reading_list
               SET is_read = %s
             WHERE uid = %s AND book_id = %s;
            """,
            (is_read, uid, book_id),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Entry not found in reading list")
        db.connection.commit()


class UserInfo(BaseModel):
    user_id: str
    name: str
    location: Optional[str] = None


class UserBook(Book):
    is_read: bool


class AddUserRequest(BaseModel):
    token: str
    name: str
    location: Optional[str] = None


class AddUserResponse(BaseModel):
    user_id: str


class GetUserRequest(BaseModel):
    user_id: str


class AddReadingListRequest(BaseModel):
    token: str
    book_id: int
    is_read: bool = False


class RemoveReadingListRequest(BaseModel):
    token: str
    book_id: int


class GetReadingListRequest(BaseModel):
    user_id: str


class MarkIsReadRequest(BaseModel):
    token: str
    book_id: int


class MarkUnreadRequest(BaseModel):
    token: str
    book_id: int


class GetReadCountRequest(BaseModel):
    user_id: str


class ChangeUserNameRequest(BaseModel):
    token: str
    name: str


class ChangeLocationRequest(BaseModel):
    token: str
    location: str


@router.post("/add_user/", response_model=AddUserResponse, status_code=201)
def add_user(payload: AddUserRequest = Body(...)) -> AddUserResponse:
    uid = _verify_token(payload.token)
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            """
            INSERT INTO users (uid, name, location)
            VALUES (%s, %s, %s)
            ON CONFLICT (uid)
            DO UPDATE SET name = EXCLUDED.name,
                          location = COALESCE(EXCLUDED.location, users.location)
            RETURNING uid;
            """,
            (uid, payload.name, payload.location),
        )
        db.connection.commit()
        return AddUserResponse(user_id=cur.fetchone()[0])


@router.post("/get_user/", response_model=UserInfo)
def get_user(payload: GetUserRequest = Body(...)) -> UserInfo:
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            "SELECT uid, name, location FROM users WHERE uid = %s;", (payload.user_id,)
        )
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="User not found")
        return UserInfo(user_id=row[0], name=row[1], location=row[2])


@router.post("/add_reading_list/", status_code=201)
def add_reading_list(payload: AddReadingListRequest = Body(...)):
    uid = _verify_token(payload.token)
    with Database() as db:
        cur = db.connection.cursor()
        try:
            cur.execute(
                """
                INSERT INTO reading_list (book_id, uid, is_read)
                VALUES (%s, %s, %s)
                ON CONFLICT (book_id, uid)
                DO UPDATE SET is_read = EXCLUDED.is_read;
                """,
                (payload.book_id, uid, payload.is_read),
            )
            db.connection.commit()
            return {"detail": "Book added to reading list"}
        except Exception as err:  # noqa: BLE001
            db.connection.rollback()
            raise HTTPException(status_code=500, detail=f"Database error: {err}")


@router.post("/remove_reading_list/", status_code=204)
def remove_reading_list(payload: RemoveReadingListRequest = Body(...)):
    uid = _verify_token(payload.token)
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            "DELETE FROM reading_list WHERE book_id = %s AND uid = %s;",
            (payload.book_id, uid),
        )
        db.connection.commit()


@router.post("/get_reading_list/", response_model=List[UserBook])
def get_reading_list(payload: GetReadingListRequest = Body(...)) -> List[UserBook]:
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            """
            SELECT b.*, rl.is_read
              FROM reading_list rl
              JOIN book_bans b ON b.id = rl.book_id
             WHERE rl.uid = %s
          ORDER BY b.title;
            """,
            (payload.user_id,),
        )
        cols = [c.name for c in cur.description]
        return [UserBook(**dict(zip(cols, row))) for row in cur.fetchall()]


@router.post("/mark_is_read/")
def mark_is_read(payload: MarkIsReadRequest = Body(...)):
    uid = _verify_token(payload.token)
    _update_read_status(uid=uid, book_id=payload.book_id, is_read=True)
    return {"detail": "Marked as read"}


@router.post("/mark_is_unread/")
def mark_is_unread(payload: MarkUnreadRequest = Body(...)):
    uid = _verify_token(payload.token)
    _update_read_status(uid=uid, book_id=payload.book_id, is_read=False)
    return {"detail": "Marked as unread"}


@router.post("/get_read_count/", response_model=int)
def get_read_count(payload: GetReadCountRequest = Body(...)) -> int:
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            "SELECT COUNT(*) FROM reading_list WHERE uid = %s AND is_read = TRUE;",
            (payload.user_id,),
        )
        return cur.fetchone()[0]


@router.post("/change_user_name/")
def change_user_name(payload: ChangeUserNameRequest = Body(...)):
    uid = _verify_token(payload.token)
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute("UPDATE users SET name = %s WHERE uid = %s;", (payload.name, uid))
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        db.connection.commit()
        return {"detail": "Name updated"}


@router.post("/change_location/")
def change_location(payload: ChangeLocationRequest = Body(...)):
    uid = _verify_token(payload.token)
    with Database() as db:
        cur = db.connection.cursor()
        cur.execute(
            "UPDATE users SET location = %s WHERE uid = %s;",
            (payload.location, uid),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        db.connection.commit()
        return {"detail": "Location updated"}
