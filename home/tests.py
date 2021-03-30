from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'get_rumors', 'title': '新冠'}

response = requests.get("http://127.0.0.1:8000/home/", params=payload)

pprint.pprint(response.json())
