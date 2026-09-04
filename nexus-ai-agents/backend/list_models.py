import os
import requests
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get('GOOGLE_API_KEY')
r = requests.get(f'https://generativelanguage.googleapis.com/v1beta/models?key={api_key}')
models = r.json().get('models', [])
for m in models:
    if 'generateContent' in m.get('supportedGenerationMethods', []):
        print(f"Name: {m['name']}")
