from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_risk_level', "province":"四川"}

response = requests.get("http://127.0.0.1:8000/covid/views", params=payload)

pprint.pprint(response.json())
