import csv
from dataclasses import dataclass

@dataclass
class Book:
    id: int
    author: str
    title: str
    type_of_ban: str
    secondary_authors: str
    illustrators: str
    translators: str
    state: str
    district: str
    date_of_challenge_removal: str
    origin_of_challenge: str

def process_csv(file_path):
    books = []
    
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for n in range(3):
            next(reader)
        
        for idx, row in enumerate(reader, start=1):
            book = Book(
                id = idx,
                state = row[0],
                district = row[1],
                origin_of_challenge = row[2],
                date_of_challenge_removal = row[3],
                type_of_ban = row[4],
                author = row[5],
                title = row[6],
                secondary_authors = row[7],
                illustrators = row[8],
                translators = row[9],
            )
            books.append(book)
    
    return books

def process_csv_alternate(file_path):
    books = []
    
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for n in range(3): 
            next(reader)
        
        for idx, row in enumerate(reader, start=1):
            book = Book(
                id = idx,
                title = row[0],
                author = row[1],
                secondary_authors = row[2],
                illustrators = row[3],
                translators = row[4],
                state = row[6], 
                district = row[7],
                date_of_challenge_removal = row[8],
                type_of_ban = row[9],
                origin_of_challenge = row[10]
            )
            books.append(book)

    return books
