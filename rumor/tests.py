from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_tag_count'}

response = requests.get("http://127.0.0.1:8000/rumor/shows", params=payload)

pprint.pprint(response.json())
