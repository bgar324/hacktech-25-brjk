import urllib.parse
import xml.etree.ElementTree as ET
import requests
from openai import OpenAI


point1 = (0, 0, 0)
def openAI(a, b, c): # parameter values: (x, y, z)
    point2 = (a, b, c)

    # OpenAI ID
    openai_id = "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"
    
    # prompt for gpt to answer
        # right = -x, left = +x
        # forward = -y, back = +y
        # down = -z, up = +z
    client = OpenAI(api_key = openai_id)
    question = f'''for each coordinate axis, individually, check whether the value is positive, negative, or zero. if the value is zero,
                do not change the direction. otherwise, move all negative x to the right, negative y forward, negative z down. additionally, 
                move postiive x to the left, positive y back, and negative z up. use the points of this vector ({point2[0]}, {point2[1]}, {point2[2]})
                to determine the direction changes. 
                for example: (-1, -1, -1) would be 'Move your hands to the right, forward, and down since x, y, and z are negative'
                another example: (1, 1, 1) would be 'Move your hands to the left, backward, and up since x, y, and z are positive' 
                you do not have to provide reasoning, numbers, or points in your response'''

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