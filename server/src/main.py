from fastapi import FastAPI, Depends, HTTPException, Body
from contextlib import asynccontextmanager
from db import connect_to_mongo, db
from routers import user, admin
from datetime import timedelta, datetime, timezone
from typing import Optional
from auth import create_access_token, verify_password, require_role, get_password_hash
from models.account import Account
from models.request import LoginRequest, RegisterRequest

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/login")
async def login(data: LoginRequest):
    account_data = await db.accounts.find_one({"username": data.username})
    if not account_data:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    account = Account(**account_data)

    if not verify_password(data.password, account.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    access_token = create_access_token(
        data={"sub": account.username, "role": account.role, "student_id": account.student_id},
        expires_delta=timedelta(minutes=30)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": account.role
    }

@app.post("/register")
async def register(data: RegisterRequest):
    role = data.role.upper()

    existing_account = await db.accounts.find_one({"username": data.username})
    if existing_account:
        raise HTTPException(status_code=400, detail="Username already exists")

    if data.student_id:
        student = await db.students.find_one({"student_id": data.student_id})
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

    new_account = Account(
        username=data.username,
        hashed_password=get_password_hash(data.password),
        email=data.email,
        name=data.name,
        phone=data.phone,
        role=role,
        register_bike=[],
        bike_certificate=None,
        student_id=data.student_id,
        created_at=datetime.now(timezone.utc),
        account_due=data.account_due,
        last_parking=None
    )
    await db.accounts.insert_one(new_account.model_dump())
    return {"message": "Account created successfully"}


app.include_router(user.router, prefix="/user", tags=["User"], dependencies=[Depends(require_role("USER"))])
app.include_router(admin.router, prefix="/admin", tags=["Admin"], dependencies=[Depends(require_role("ADMIN"))])