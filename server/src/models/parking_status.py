from pydantic import BaseModel
from datetime import datetime

class ParkingStatus(BaseModel):
    temperature: int
    status: bool
    closing: datetime
    opening: datetime
    available_slot: int
    maximum_slot: int