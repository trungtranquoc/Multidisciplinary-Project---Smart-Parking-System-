from pydantic import BaseModel, Field

class Student(BaseModel):
    student_id: int = Field(..., alias="studentID")
    name: str
    faculty: str