from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_trend_internal'}

response = requests.get("http://127.0.0.1:8000/vaccine/trend", params=payload)

pprint.pprint(response.json())