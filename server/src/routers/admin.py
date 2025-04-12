from fastapi import APIRouter, HTTPException
from db import db
from typing import Optional
from datetime import date

router = APIRouter()

@router.get("/parking_status")
async def get_parking_status():
    status = await db.parking_status.find_one()
    if not status:
        raise HTTPException(status_code=404, detail="System status not found.")
    listbike = await db.parking_logs.find({"exit_date": None}).to_list(length=None)
    listbike = [
        {"No.": i} |
        {key: log.get(key) for key in ["student_id", "bike", "enter", "parking_lot"]}
        for i, log in enumerate(listbike)
    ]
    return status | {
        "parking_bikes": listbike
    }

@router.get("/parking_condition")
async def get_parking_condition():
    sensor_log = await db.sensor_logs.find_one(
        sorted=[("timestamp", -1)]
    )
    if not sensor_log:
        raise HTTPException(status_code=404, detail="Sensor log not found.")
    return sensor_log

@router.get("/parking_history")
async def get_parking_history(requested_date: Optional[date], student_id: Optional[int]):
    if (student_id):
        list_parking_log = await db.parking_logs.find({"student_id": student_id}, {"student_id": 0}).to_list(length=None)
        if not list_parking_log:
            raise HTTPException(status_code=404, detail="Student parking log not found.")
        return list_parking_log
    return {}

@router.get("/reporting_statistic")
async def get_reporting_statistic():
    return {}

@router.get("/monitor_system")
async def get_monitor_system():
    light_system = await db.sensor.find({"type": "light"}).to_list(length=None)
    ventilation_system = await db.sensor.find({"type": "ventilation"}).to_list(length=None)
    return {
        "light_system": light_system,
        "ventilation_system": ventilation_system
    }

@router.put("/toggle_device_system")
async def toggle_device_system():
    return {
        "isSuccess": False,
        "message": None
    }