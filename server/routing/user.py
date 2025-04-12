from fastapi import APIRouter, Body, HTTPException
from books import Book
from pydantic import BaseModel

router = APIRouter()


class UserInfo(BaseModel):
    user_id: str
    name: str
    location: str


class UserBook(Book):
    is_read: bool


class AddUserRequest(BaseModel):
    token: str
    name: str
    location: str


class AddUserResponse(BaseModel):
    user_id: str


class GetUserRequest(BaseModel):
    user_id: str


class AddReadingListRequest(BaseModel):
    token: str
    book_id: str
    is_read: bool


class RemoveReadingListRequest(BaseModel):
    token: str
    book_id: str


class GetReadingListRequest(BaseModel):
    user_id: str


class MarkIsReadRequest(BaseModel):
    token: str
    book_id: str


class MarkUnreadRequest(BaseModel):
    token: str
    book_id: str


class GetReadCountRequest(BaseModel):
    user_id: str


class GetReadCountResponse(BaseModel):
    count: int


class ChangeUserNameRequest(BaseModel):
    token: str
    name: str


class ChangeLocationRequest(BaseModel):
    token: str
    location: str
