import json
import requests



url = 'https://file1.dxycdn.com/2020/0130/454/3393874921745912507-115.json?t=26951607'
response = requests.get(url = url).json()
丁香医生谣言  = response['data']