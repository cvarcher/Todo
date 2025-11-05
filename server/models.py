from pydantic import BaseModel,Field
from datetime import datetime
from typing import Optional

class TodoTask(BaseModel):
  user_id: Optional[str] = None
  task_id: str
  task_desc: str
  is_completed: bool = False
  created_at: datetime = Field(default_factory = datetime)
  

 

