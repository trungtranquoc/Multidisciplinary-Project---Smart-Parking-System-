from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGOURI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["smart_parking"]

async def connect_to_mongo():
    await db.sensor_logs.create_index(
        [("timestamp", 1)],
        expireAfterSeconds=60 * 60 * 24,
        partialFilterExpression={"metadata.device_id": {"$exists": True}}
    )
