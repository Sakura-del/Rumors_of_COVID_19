import json
import requests



url = 'https://file1.dxycdn.com/2020/0130/454/3393874921745912507-115.json?t=26951607'
response = requests.get(url = url).json()
丁香医生谣言  = response['data']
with open('data_source/丁香医生谣言.json','w',encoding = 'utf-8') as file:
    file.write(json.dumps(丁香医生谣言,ensure_ascii = False))