from openai import OpenAI
import requests
import urllib.parse
import xml.etree.ElementTree as ET

openai_id = "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"
wolfram_id = "RGJ9W6-TUQ5GA9KXV"

point1 = (0,0,0) # one must be origin
point2 = (3, 2, 1) # points from user movement

# open ai prompts
# right = -x, left = +x
# forward = -y, back = +y
# down = -z, up = +z
client = OpenAI(api_key = openai_id)
question = f'''given: -x = right, +x = left, -y = forward, +y = back, -z = down, 
            and +z = up \n give me the general directions to move this vector point ({point2[0]}, {point2[1]}, {point2[2]}) 
            to the origin format the response in 'Move your hands ___, ____, and ____' (without reasoning, units, or numbers)'''

# generating gpt response
    # from https://www.youtube.com/watch?v=NVmNwD8RxJg 
try:
    chat_completion = client.chat.completions.create(
        model = "gpt-4o",
        max_tokens = 300,
        messages = [
            {"role": "user",
             "content" : question}]
    )
    print(chat_completion.choices[0].message.content)
except Exception as e:
    print("an error occured")

# wolfram calculations
query_url = f"http://api.wolframalpha.com/v1/query?" \
            f"appid={wolfram_id}" \
            f"&input={urllib.parse.quote_plus(f'vector magnitude of ({point2[0]},{point2[1]},{point2[2]})')}"

# making request
r = requests.get(query_url)

if r.status_code == 200:
    root = ET.fromstring(r.content) 
    result_pod = root.find(".//pod[@id='Result']")  
    if result_pod is not None:
        plaintext = result_pod.findtext(".//plaintext") 
        print(f"Wolfram Alpha Magnitude Calculation: {plaintext}")