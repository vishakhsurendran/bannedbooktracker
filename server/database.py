import psycopg2
import os

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

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.conn.close()
