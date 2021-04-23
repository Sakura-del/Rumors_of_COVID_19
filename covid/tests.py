from django.test import TestCase


# Create your tests here.
import requests, pprint

payload = {'action': 'list_covid_news', "field": "社会", 'pagenum': 2, 'pagesize': 10}

response = requests.get("http://127.0.0.1:8000/covid/news", params=payload)

pprint.pprint(response.json())
