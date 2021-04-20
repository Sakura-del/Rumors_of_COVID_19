from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'load_more_news', 'province': '四川', "field": '社会','pagesize':10,"pagenum":2}

response = requests.get("http://127.0.0.1:8000/vaccine/news", params=payload)

pprint.pprint(response.json())