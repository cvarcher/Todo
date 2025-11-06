from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client.todos_db
todos_collection = db["todo_collection"]
users_collection = db["users_collection"]

