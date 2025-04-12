from datetime import date
from typing import List, Optional
from database import Database
from pydantic import BaseModel
from fastapi import APIRouter, Body, HTTPException

router = APIRouter()


class Book(BaseModel):
    id: int
    author: Optional[str]
    title: Optional[str]
    type_of_ban: Optional[str]
    secondary_authors: Optional[str]
    illustrators: Optional[str]
    translators: Optional[str]
    state: Optional[str]
    district: Optional[str]
    date_of_challenge_removal: Optional[str]
    origin_of_challenge: Optional[str]


class StateRequest(BaseModel):
    state: str


class AuthorRequest(BaseModel):
    author: str


class DistrictRequest(BaseModel):
    district: str


class TitleRequest(BaseModel):
    title: str


class MonthYearRequest(BaseModel):
    month: int
    year: int


class BetweenMonthYearsRequest(BaseModel):
    start_month: int
    start_year: int
    end_month: int
    end_year: int


def next_month(year: int, month: int) -> date:
    if month == 12:
        return date(year + 1, 1, 1)
    return date(year, month + 1, 1)


@router.post("/state/", response_model=List[Book])
async def get_books_by_state(state: StateRequest = Body(...)) -> List[Book]:
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE state = %s;
        """
        try:
            cursor.execute(query, (state.state,))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/author/", response_model=List[Book])
async def get_books_by_author(author: AuthorRequest = Body(...)) -> List[Book]:
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE author = %s;
        """
        try:
            cursor.execute(query, (author.author,))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/district/", response_model=List[Book])
async def get_books_by_district(district: DistrictRequest = Body(...)) -> List[Book]:
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE district = %s;
        """
        try:
            cursor.execute(query, (district.district,))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/title/", response_model=List[Book])
async def get_books_by_title(title: TitleRequest = Body(...)) -> List[Book]:
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE title = %s;
        """
        try:
            cursor.execute(query, (title.title,))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/all/", response_model=List[Book])
async def select_all_books() -> List[Book]:
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans;
        """
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        # Retrieve column names from the cursor description
        columns = [desc[0] for desc in cursor.description]
        # Convert each row to a dictionary and create a Book instance
        books = [Book(**dict(zip(columns, row))) for row in rows]

    return books


@router.post("/period/before_month_year", response_model=List[Book])
async def before_month_year(request: MonthYearRequest = Body(...)) -> List[Book]:
    threshold_date = date(request.year, request.month, 1)
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE date_of_challenge_removal < %s;
        """
        try:
            cursor.execute(query, (threshold_date,))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        if not rows:
            raise HTTPException(
                status_code=204,
                detail="No books found before the specified month and year",
            )

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/period/after_month_year", response_model=List[Book])
async def after_month_year(request: MonthYearRequest = Body(...)) -> List[Book]:
    threshold_date = next_month(request.year, request.month)
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE date_of_challenge_removal >= %s;
        """
        try:
            cursor.execute(query, (threshold_date,))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        if not rows:
            raise HTTPException(
                status_code=204,
                detail="No books found after the specified month and year",
            )

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/period/during_month_year", response_model=List[Book])
async def during_month_year(request: MonthYearRequest = Body(...)) -> List[Book]:
    start_date = date(request.year, request.month, 1)
    end_date = next_month(request.year, request.month)
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE date_of_challenge_removal >= %s AND date_of_challenge_removal < %s;
        """
        try:
            cursor.execute(query, (start_date, end_date))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        if not rows:
            raise HTTPException(
                status_code=204,
                detail="No books found during the specified month and year",
            )

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books


@router.post("/period/between_month_years", response_model=List[Book])
async def between_month_years(
    request: BetweenMonthYearsRequest = Body(...),
) -> List[Book]:
    start_date = date(request.start_year, request.start_month, 1)
    end_date = next_month(request.end_year, request.end_month)
    with Database() as db:
        cursor = db.connection.cursor()
        query = """
            SELECT id, author, title, type_of_ban, secondary_authors, illustrators,
                   translators, state, district, date_of_challenge_removal, origin_of_challenge
            FROM book_bans
            WHERE date_of_challenge_removal >= %s AND date_of_challenge_removal < %s;
        """
        try:
            cursor.execute(query, (start_date, end_date))
            rows = cursor.fetchall()
        except Exception as err:
            raise HTTPException(status_code=404, detail=f"Error executing query: {err}")

        if not rows:
            raise HTTPException(
                status_code=204, detail="No books found between the specified periods"
            )

        columns = [desc[0] for desc in cursor.description]
        books = [Book(**dict(zip(columns, row))) for row in rows]
    return books
