from pydantic import BaseModel, Field

class Student(BaseModel):
    student_id: int
    name: str
    faculty: str