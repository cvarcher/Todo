from pydantic import BaseModel
from typing import Optional

class UserRegister(BaseModel):
  email : str
  username : str
  password : str

class UserLogin(BaseModel):
  email : str
  password : str

class TaskCreate(BaseModel):
  task_desc : str
  is_completed : Optional[bool] = False
  created_at : Optional[str] = None
  completed_at: Optional[str] =None

class TaskUpdate(BaseModel):
  task_desc : Optional[str] = None
  is_completed : Optional[bool] = None
  created_at : Optional[str] = None
  completed_at : Optional[str] = None