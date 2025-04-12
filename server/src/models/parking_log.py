from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ParkingLog(BaseModel):
    student_id: int = Field(..., alias="studentID")
    date: datetime
    day_in_week: str
    bike: str
    enter: datetime
    exit: datetime
    parking_lot: str
    responsible: str