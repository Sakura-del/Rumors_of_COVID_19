from django.test import TestCase

# Create your tests here.
import requests, pprint

# 请求数据
payload = {'action': 'get_rumors','title':"印度疫苗"}

# 相应内容
response = requests.get("http://127.0.0.1:8000/rumor/views", params=payload)

# 引用pprint结构化输出数据
pprint.pprint(response.json())