from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://sthasurja123_db_user:aruDvGF3LUJ624Kt@cluster0.alqt4go.mongodb.net/?appName=Cluster0"
)

db = client.todos_db
todos_collection = db["todo_collection"]
