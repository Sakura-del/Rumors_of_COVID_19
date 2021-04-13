from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_travel_policy_province', "field": "探索", 'pagenum': 2, 'pagesize': 10}

response = requests.get("http://127.0.0.1:8000/covid/views", params=payload)

pprint.pprint(response.json())
