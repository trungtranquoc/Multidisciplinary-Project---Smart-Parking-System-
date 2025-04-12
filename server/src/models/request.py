from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    password: str
    role: str
    email: str
    name: str
    phone: str
    student_id: Optional[int] = None
    account_due: Optional[datetime] = None