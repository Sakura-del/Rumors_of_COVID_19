import os
import json
import requests


if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def DinXiang_rumor_func():
    url = 'https://file1.dxycdn.com/2020/0130/454/3393874921745912507-115.json'
    response = requests.get(url = url).json()
    result  = response['data']

    with open('data_source/data_from_creeper/丁香医生谣言.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))



func_list = [DinXiang_rumor_func]