from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# Allow CORS for the React app running on localhost:3000
origins = [
    "http://localhost:3000",  # Your React app's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow requests from React
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/start-recording")
async def start_recording():
    script_path = "/Users/jonnie/Documents/hackaton/hacktech-25-brjk/newFolder/examples/tracking_event_example.py"  # Replace with your actual script path
    try:
        subprocess.run(["python", script_path], check=True)
        return {"message": "Recording started successfully!"}
    except subprocess.CalledProcessError:
        return {"message": "Error occurred while running the script."}
