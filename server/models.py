from pydantic import BaseModel,Field
from datetime import datetime
from typing import Optional

class TodoTask(BaseModel):
  task_desc: str
  is_completed: bool = False
  created_at: datetime = Field(default_factory = datetime.now)
  completed_at : Optional[datetime] = None

 

class User(BaseModel):
  email : str
  username : str
  password : str