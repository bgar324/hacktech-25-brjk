from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ensure this matches the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint to stop 404
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI server!"}

@app.get("/start-recording")
async def start_recording():
    script_path = "./tracking_event_example.py"  # Your script
    script_path1 = "../wolframalpha/open_wolfram.py"
    json_path = "newFolder/examples/output.json"  # <-- Path to the JSON file your script creates
    try:
        subprocess.run(["python", script_path1], check=True, capture_output=True, text=True)
        subprocess.run(["python", script_path], check=True)
        # # return {"message": "Welcome to!"}
        # print("JSON data:")
        # if os.path.exists(json_path):
        #     with open(json_path, "r") as f:
        #         data = json.load(f)
        #         print("JSON data:", data)  # <<< This will print the JSON to your server console
        #         return data  # <<< This will RETURN the JSON to the client!
        # else:
        #     print("JSON file not found.")
        #     return {"message": "Script ran but no JSON file was found."}

    except subprocess.CalledProcessError as e:
        print(f"Error running script: {e}")
        print( {"message": "Error occurred while running the script."})

@app.get("/stop-recording")
async def stop_recording():
    global tracking_process
    if tracking_process and tracking_process.poll() is None:
        tracking_process.terminate()   # politely ask it to stop
        tracking_process.wait(timeout=5)  # give it up to 5s
        tracking_process = None
        return {"message": "Recording stopped"}
    else:
        return {"message": "No recording in progress"}