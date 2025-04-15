from fastapi import APIRouter, HTTPException, Header, Depends
from db import db
from auth import get_current_user

router = APIRouter()

@router.get("/parking_status")
async def get_parking_status():
    status = await db.parking_status.find_one()
    if not status:
        raise HTTPException(status_code=404, detail="Parking status not found.")
    return status

@router.get("/parking_history")
async def get_parking_history(student_data: dict = Depends(get_current_user)):
    student_id = student_data.get('student_id')
    logs = await db.parking_logs.find({"student_id": student_id}).to_list(length=None)
    return logs

@router.get("/current_parking")
async def get_current_parking(student_data: dict = Depends(get_current_user)):
    student_id = student_data.get('student_id')
    listparking = await db.parking_logs.find({"student_id": student_id, "exit": None}).to_list(length=None)
    status = await db.parking_status.find_one()
    if not status:
        status = {
            "closing": None
        }
    if not listparking:
        return {"is_parking": False}
    
    listparking = [
        { key: park_log.get(key) for key in ["bike", "enter", "date"] }
        | {"closing_at": status["closing"]}
        for park_log in listparking
    ]
    return {
        "is_parking": True,
        "list_parking": listparking
    }

@router.get("/personal_information")
async def get_personal_information(student_data: dict = Depends(get_current_user)):
    student_id = student_data.get('student_id')
    account_info = await db.accounts.find_one({"student_id": student_id})
    if not account_info:
        raise HTTPException(status_code=404, detail="Account information not found.")
    account_info = {
        key: account_info.get(key) for key in ["name", "email", "phone", "register_bike", "bike_certificate", "account_due", "last_parking"]
    }
    return account_info