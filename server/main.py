from fastapi import FastAPI
from uuid import uuid4
from datetime import datetime
from config.database import todos_collection
from models import TodoTask
from bson import ObjectId
from typing import List

app = FastAPI()

@app.get("/tasks")
def get_all_tasks():
    tasks = list(todos_collection.find())
    for task in tasks:
        task["_id"] = str(task["_id"])
    return tasks


@app.post("/tasks")
def create_task(task_request: TodoTask):
    created_time = datetime.now()
    item = {
        "user_id": task_request.user_id,
        "task_id": f"task_{uuid4().hex}",
        "task_desc": task_request.task_desc,
        "is_completed": task_request.is_completed,
        "created_at": created_time
    }
    result = todos_collection.insert_one(item)
    item["_id"] = str(result.inserted_id)  
    return item

# @app.get("/tasks/{id}")
# def get_task(_id:id):
#     item = todos_collection.find_one({"_id":_id})
#     return item 

# @app.delete("/tasks/{id}")
# def delete_task(_id:id):
#     todos_collection.delete_one({"_id":_id})
#     return "success"
    
