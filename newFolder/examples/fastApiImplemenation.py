from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import subprocess
# Create a FastAPI instance
app = FastAPI()

# # Define a Pydantic model for the request body
# class Item(BaseModel):
#     name: str
#     description: Optional[str] = None
#     price: float
#     tax: Optional[float] = None

# # Define a route for GET requests
# @app.get("/")
# def read_root():
#     return {"message": "Hello, World!"}

# # Define a route for POST requests
# @app.post("/items/")
# def create_item(item: Item):
#     item_dict = item.dict()
#     if item.tax:
#         total_price = item.price + item.tax
#         item_dict["total_price"] = total_price
#     return item_dict

# # Define a route with a path parameter
# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Optional[str] = None):
#     return {"item_id": item_id, "q": q}
origins = [
    "http://localhost:3000",  # React app URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/start-recording")
async def start_recording():
    # Path to your Python script
    script_path = "./fastApiImplemenation.py"
    
    # Run the script
    try:
        subprocess.run(["python", script_path], check=True)
        return {"message": "Recording started successfully!"}
    except subprocess.CalledProcessError:
        return {"message": "Error occurred while running the script."}