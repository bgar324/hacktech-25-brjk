
import os
from google.cloud import firestore

# Tell google client where your service account file is
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/jonnie/Downloads/hacktech25brjk-firebase-adminsdk-fbsvc-fcb62fcc70.json"

db = firestore.Client()

# Reference to the Firestore collection
collection_ref = db.collection('first')

# Custom Document ID
custom_id = 'my_custom_id_123'  # <-- You define your ID here

# Data to be added to the document
data = {
    'name': 'John Doe',
    'age': 30,
    'city': 'New York'
}

# Create a reference to the document with the custom ID
doc_ref = collection_ref.document(custom_id)

# Set the data for the document
doc_ref.set(data)

print(f'Document with ID {custom_id} added.')