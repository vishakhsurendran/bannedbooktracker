import routing.books as books
from database import Database
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.router.include_router(books.router, prefix="/books", tags=["Books"])
