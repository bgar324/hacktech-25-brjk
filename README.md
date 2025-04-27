# HackTech 2025 Hei.AI
Hei.AI is a website that utilizing the Leap Motion Controller 1, Wolfram Alpha AI, and OpenAI to emphasize the importance of proper ergonomic practices. 

## Table of Contents
* About
* Features
* Installation
* Usage
* Contributing
* License
* Acknowledgements

## About
Within Hei.AI's website, users can monitor their wrists' angle measurements with animations, graphs, and instant feedback, all occurring in real-time. The Leap Motion Controller 1 records the user's wrist angle measurements and inputs those values into a dynamic graph representing the user's wrist movement over time. User data is defined as vector points for Wolfram Alpha AI and OpenAI to utilize. Wolfram Alpha AI computes the vector's magnitude of the user's hand movements to the optimal position for typing, which is the origin. OpenAI produces feedback as directional output for users to follow to adjust their typing position if needed. 

## Features
* Leap Motion Controller 1
* Wolfram Alpha AI
* OpenAI

## Installation
1. Get API Keys from Wolfram Alpha AI and Open AI
2. Clone the repository: \n
git clone https://github.com/bgar324/hacktech-25-brjk.git <br>
cd hacktech-25-brjk
3. Install all neccessary files for NPM and Leap
* Download UltraLeap Software <br>
* cd newFolder
* Follow all installations in README.md inside of newFolder
* Create and activate a virtual environment <br>
pip install -r requirements.txtgit <br>
python -m build leapc-cffi <br>
pip install leapc-cffi/dist/leapc_cffi-0.0.1.tar.gz <br>
pip install -e leapc-python-api <br>
4. Enter your API keys in open_wolfram.py

## Acknowledgements 
* Firebase Documentation
* Leap Documentation
* Numpy Documentation
