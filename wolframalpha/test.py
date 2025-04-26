# import requests
# import urllib.parse
# import json

# # Your WolframAlpha AppID here
# appid = "J6768W-6KQWT3742A"

# def wolfram_query(question):
#     # URL encode the question
#     query = urllib.parse.quote_plus(question)
    
#     # Build the API request
#     query_url = (
#         f"http://api.wolframalpha.com/v2/query"
#         f"?appid={appid}"
#         f"&input={query}"
#         f"&format=plaintext"
#         f"&output=json"
#     )
    
#     # Send the request
#     response = requests.get(query_url)
#     r = response.json()
#     # Check if the query was successful
#     if not r.get("queryresult", {}).get("success", False):
#         return "WolframAlpha query failed or no results."

#     # Try to pull out a text answer
#     pods = r["queryresult"].get("pods", [])
#     if not pods:
#         return "No data pods found."
    
#     for pod in pods:
#         if pod.get("title", "").lower() in ["result", "definition", "value", "solution"]:
#             subpods = pod.get("subpods", [])
#             if subpods:
#                 return subpods[0].get("plaintext", "No plaintext available.")

#     # If no special pod found, return first pod
#     subpods = pods[0].get("subpods", [])
#     if subpods:
#         return subpods[0].get("plaintext", "No plaintext available.")
    
#     return "No answer found."

# # Example usage:
# answer = wolfram_query("lifespan of a mosquito")
# def wolframAlphaImages():
#     query = "plot y = x + 0.00001 from -10 to 10"
#     # Build the API request
#     query_url = (
#         f"http://api.wolframalpha.com/v2/query"
#         f"?appid={appid}"
#         f"&input={query}"
#         f"&format=plaintext"
#         f"&output=json"
#     )
#     response = requests.get(query_url, params={"format": "image"})
#     r = response.json()

#     pods = r.get("queryresult", {}).get("pods", [])

#     # Flags for plot availability
#     plot_3d_url = None
#     plot_2d_url = None

#     # Loop through pods and check for 3D or 2D plot
#     for pod in pods:
#         title = pod.get("title", "").lower()
        
#         # # Check for 3D plot
#         # if "3d" in title:
#         #     subpods = pod.get("subpods", [])
#         #     if subpods:
#         #         img = subpods[0].get("img")
#         #         if img and "src" in img:
#         #             plot_3d_url = img["src"]
        
#         # Check for 2D contour plot
#         if "contour" in title or "2d" in title:
#             subpods = pod.get("subpods", [])
#             if subpods:
#                 img = subpods[0].get("img")
#                 if img and "src" in img:
#                     plot_2d_url = img["src"]

#     # # Download the 3D plot if available
#     # if plot_3d_url:
#     #     img_name = "3d_plot.jpg"
#     #     img_data = requests.get(plot_3d_url).content
#     #     with open(img_name, 'wb') as handler:
#     #         handler.write(img_data)
#     #     print(f"3D Plot Image Saved to {img_name}.")

#     # Download the 2D plot if available
#     if plot_2d_url:
#         img_name = "2d_plot.jpg"
#         img_data = requests.get(plot_2d_url).content
#         with open(img_name, 'wb') as handler:
#             handler.write(img_data)
#         print(f"2D Plot Image Saved to {img_name}.")

#     # If no plot found
#     else:
#         print("No plot image available.")
# wolframAlphaImages()

import requests

app_id = "J6768W-6KQWT3742A"
query = "plot y = x"

query_url = f"http://api.wolframalpha.com/v2/query?appid={app_id}&input={query}&output=json"

response = requests.get(query_url)
r = response.json()

# Extract pods
pods = r["queryresult"]["pods"]

# Look for the pod with title containing 'Plot'
plot_image_url = None

for pod in pods:
    if 'Plot' in pod["title"]:  # 'Plot' could be 'Plot', '3D plot', 'Contour plot', etc.
        subpods = pod.get("subpods", [])
        if subpods:
            img_info = subpods[0].get("img")
            if img_info:
                plot_image_url = img_info.get("src")
                break

if plot_image_url:
    print(f"Found plot image URL: {plot_image_url}")
    
    # Download the image
    img_data = requests.get(plot_image_url).content
    with open("plot.png", "wb") as handler:
        handler.write(img_data)
    print("Saved plot image as 'plot.png'.")
else:
    print("No plot image found.")