from pydantic import BaseModel
from datetime import datetime, timezone

class SensorLog(BaseModel):
    temperature: float
    humidity: float
    light: float
    fanStatus: bool
    lightStatus: bool
    timestamp: datetime = datetime.now(timezone.utc)