from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'list_current_internal'}

response = requests.get("http://127.0.0.1:8000/covid/current", params=payload)

pprint.pprint(response.json())
