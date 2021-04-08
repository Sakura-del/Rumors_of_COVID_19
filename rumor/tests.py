from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'list_more_rumors', 'title': '美国疫情', 'pagenum': 2,'pagesize': 10}

response = requests.get("http://127.0.0.1:8000/rumor/views", params=payload)

pprint.pprint(response.json())
