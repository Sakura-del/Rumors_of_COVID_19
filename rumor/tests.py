from django.test import TestCase

# Create your tests here.
import requests, pprint

# 请求数据
# payload = {'action': 'ask_question', 'question': '疫苗是免费的吗？','question_text': '我想知道疫苗是免费的不？'}
payload = {'action': 'answer_question','question_id':1, 'answer':'我国的疫苗是免费的，但是要分批接种.'}

# 相应内容
# response = requests.post("http://127.0.0.1:8000/rumor/questions", json=payload)

getload = {"action": 'get_count_trend', "question": "疫苗", 'pagesize': 1, 'pagenum': 1}
response = requests.get("http://127.0.0.1:8000/rumor/shows", params=getload)

# 引用pprint结构化输出数据
pprint.pprint(response.json())
