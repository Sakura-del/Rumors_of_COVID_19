from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_daily_france'}

response = requests.get("http://127.0.0.1:8000/covid/daily", params=payload)

pprint.pprint(response.json())
