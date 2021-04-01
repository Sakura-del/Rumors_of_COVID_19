from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_current_vaccinesnations'}

response = requests.get("http://127.0.0.1:8000/vaccine/total", params=payload)

pprint.pprint(response.json())