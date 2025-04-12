from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class Account(BaseModel):
    username: str
    hashed_password: str
    email: str
    name: str
    phone: str
    role: str
    register_bike: Optional[list[str]]
    bike_certificate: Optional[str]
    student_id: Optional[int]
    created_at: datetime
    account_due: Optional[datetime] = None
    last_parking: Optional[datetime] = None