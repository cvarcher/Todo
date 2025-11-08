from fastapi import FastAPI,HTTPException
from uuid import uuid4
from datetime import datetime
from config.database import *
from models import TodoTask,User
from bson import ObjectId
from typing import List
from auth import *
from schemas import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],     
)

@app.post("/api/register")
def register(user: UserRegister):
    if users_collection.find_one({"email": user.email}):
        return HTTPException(status_code = 400, detail = "User already exists")
    hashed_password =  hash_password(user.password)
    users_collection.insert_one({
        "email": user.email,
        "username": user.username, 
        "password": hashed_password
    })
    return {"message": "User registered"}

@app.post('/api/login')
def login(user: UserLogin):
    try:
        logged_user = users_collection.find_one({'email': user.email})
        if logged_user:
            if verify_password(user.password, logged_user["password"]):
                access_token = create_access_token({'email': logged_user["email"], "user_id": str(logged_user["_id"])})
                refresh_token = create_refresh_token({'email': logged_user["email"], "user_id": str(logged_user["_id"])})
                return {
                "email": logged_user["email"],
                "access_token": access_token,
                "refresh_token": refresh_token
            }
        else:
            raise HTTPException(status_code = 400, detail = "Invalid credentials")
    except:
        raise HTTPException(status_code = 400)
        


@app.post("/api/refresh")
def refresh_token(refresh_token: str):
    payload = verify_token(refresh_token, "refresh")
    data = {"email": payload.get("email"), "user_id": payload.get("user_id")}
    new_access_token = create_access_token(data)
    return {"access_token": new_access_token, "token_type": "bearer"}



@app.get("/api/tasks")
def get_all_tasks(user = Depends(get_current_user)):
    tasks = list(todos_collection.find({"user_id": str(user["_id"])}))
    for task in tasks:
        task["_id"] = str(task["_id"])
    return tasks



@app.get("/api/todo")
def get_all_todo_tasks(user = Depends(get_current_user)):
    tasks = list(todos_collection.find({"user_id":str(user["_id"])}))
    todo_tasks = [t for t in tasks if t.get("is_completed") == False]
    
    for task in todo_tasks:
        task["_id"] = str(task["_id"])
    return todo_tasks



@app.get("/api/tasks_completed/today")
def tasks_completed_todady(user = Depends(get_current_user)):
    now = datetime.now()
    today = datetime(now.year, now.month, now.day)
    tomorrow = today + timedelta(days = 1)

    query = {
        "user_id":str(user["_id"]),
        "is_completed" :True,
        "completed_at": {"$gte": today, "$lt":tomorrow} 
    }
    completed_tasks = list(todos_collection.find(query))

    for task in completed_tasks:
        task["_id"]= str(task["_id"])


    return completed_tasks

@app.post("/api/tasks")
def create_task(task_request: TaskCreate, user= Depends(get_current_user)):
    created_time = datetime.now()
    item = {
        "user_id": str(user["_id"]),
        "task_id": f"task_{uuid4().hex}",
        "task_desc": task_request.task_desc,
        "is_completed": task_request.is_completed,
        "created_at": task_request.created_at,
        "completed_at": datetime.now() if task_request.is_completed else None
    }
    result = todos_collection.insert_one(item)
    item["_id"] = str(result.inserted_id)  
    return item


@app.get("/api/tasks/{id}")
def get_task(id:str, user = Depends(get_current_user)):
    item = todos_collection.find_one({"task_id":id, "user_id": str(user["_id"])})

    if not item:
        raise HTTPException(status_code = 404, detail = "task not found")
    item["_id"] = str(item["_id"])
    item["created_at"]= str(item["created_at"])
    return item 

@app.delete("/api/tasks/{id}")
def delete_task(id:str,user= Depends(get_current_user)):
    result = todos_collection.delete_one({"task_id":id, "user_id": str(user["_id"])})
    if result.deleted_count ==0:
        raise HTTPException(status_code =404)
    return {"message": "Task deleted"}



@app.patch("/api/tasks/{id}")
def edit_task(id:str,  updated_data: TaskUpdate,user = Depends(get_current_user,)):
    updated_values = dict()

    for k,v in updated_data.dict().items():
        if v is not None:
            updated_values[k] = v
    if "is_completed" in updated_values:
        if updated_values["is_completed"]:
            updated_values["completed_at"] = datetime.now()
        else:
            updated_values["completed_at"]=None

    result = todos_collection.update_one({"task_id":id, "user_id": str(user["_id"])},{
        "$set":updated_values
    })
    if result.modified_count == 0: raise HTTPException(status_code=404, detail="Task not found or no changes applied") 
    updated_task = todos_collection.find_one({"task_id": id, "user_id": str(user["_id"])})
    
    updated_task["_id"] = str(updated_task["_id"]) 
    
    return updated_task

    
