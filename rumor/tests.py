from django.test import TestCase

# Create your tests here.
import requests, pprint

payload = {'action': 'list_covid_news'}

response = requests.get("http://127.0.0.1:8000/rumor/news", params=payload)

pprint.pprint(response.json())
