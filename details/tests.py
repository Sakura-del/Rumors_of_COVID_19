from django.test import TestCase

# Create your tests here.
import requests,pprint

tag = ['新冠', '疫苗']
payload = {'action': 'get_rumors_details', 'title': '尼帕病毒是下一个全球大流行病毒，比新冠危险75倍', "tag": tag}
payload2 = {'action': 'get_news_details', 'title': '日厚劳省23人无视防疫要求深夜聚餐 菅义伟：非常抱歉'}
response = requests.get("http://127.0.0.1:8000/details/rumors", params=payload)

pprint.pprint(response.json())
