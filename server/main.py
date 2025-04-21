import routing.books as books
import routing.user as user
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import initialize_app

load_dotenv()

default_app = initialize_app()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.router.include_router(books.router, prefix="/books", tags=["Books"])
app.router.include_router(user.router, prefix="/user", tags=["User"])
