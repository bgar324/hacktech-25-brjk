import urllib.parse
import xml.etree.ElementTree as ET
import requests
from openai import OpenAI


point1 = (0, 0, 0)
def openAI(x, y, z): # parameter values: (x, y, z)
    point2 = (x, y, z)

    # OpenAI ID
    openai_id = "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"
    
    # prompt for gpt to answer
        # clockwise = -x, counterclockwise = +x
        # counterclockwise = -y, clockwise = +y
        # up = -z,           down = +z
    client = OpenAI(api_key = openai_id)

    question = f'''consider a vector coordinate (x,y,z)
                    if {point2[0]} is greater than 0 make the user go counterclockwise, otherwise make {point2[0]} go clockwise
                    if {point2[1]} is greater than 0 make the user wrist rotate clockwise, otherwise make {point2[1]} user wrist rotate counterclockwise
                    if {point2[2]} is greater than 0 make the user's wrist go down, otherwise make {point2[2]} go up
                    when {point2[0]}, {point2[1]}, {point2[2]} equal zero, explicitly state that the user is at optimal wrist position
                    are all equal to 0, do NOT give directions, just tell the user they are at optimal position
                    format your answer in 'Move ____, ____, ____' if spaces applicable and only answer in one sentence
                    do not include reasing, numbers, or values in your answer
                    '''

    # generating gpt response
    try:
        chat_completion = client.chat.completions.create(
            model = "gpt-4o",
            max_tokens = 300,
            messages = [
                {"role": "user",
                "content" : question}]
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return "an error occured"


def wolframAI(a, b, c): # parameter values: (x, y, z)
    point2 = (a, b, c)
    wolfram_id = "RGJ9W6-TUQ5GA9KXV"

    # wolfram calculations
        # generating question 
    query_url = f"http://api.wolframalpha.com/v1/query?" \
                f"appid={wolfram_id}" \
                f"&input={urllib.parse.quote_plus(f'vector magnitude of ({point2[0]},{point2[1]},{point2[2]})')}"

    
    # generating response
    r = requests.get(query_url)

    if r.status_code == 200:
        root = ET.fromstring(r.content) 
        result_pod = root.find(".//pod[@id='Result']")  
        if result_pod is not None:
            plaintext = result_pod.findtext(".//plaintext") 
            return "Wolfram Alpha Magnitude Calculation: " + plaintext
print(openAI(1, 3, 4))