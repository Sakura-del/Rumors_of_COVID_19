from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_vaccination_point_region', 'province': '四川'}

response = requests.get("http://127.0.0.1:8000/vaccine/views", params=payload)

pprint.pprint(response.json())