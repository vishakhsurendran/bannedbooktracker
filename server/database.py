import psycopg2
import os

__all__ = ["database"]

HOST = os.environ.get("DATABASE_HOST")
USER = os.environ.get("DATABASE_USER")
PASSWORD = os.environ.get("DATABASE_PASSWORD")


class Database(object):
    def __init__(self):
        conn_string = f"host='{HOST}' dbname='prod' user='{USER}' password='{PASSWORD}'"
        self.conn = psycopg2.connect(conn_string)

    @property
    def connection(self):
        return self.conn


database = Database()
