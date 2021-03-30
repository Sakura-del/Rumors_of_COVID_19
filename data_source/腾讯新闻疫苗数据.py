import json
import requests



url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=ChinaVaccineTrendData'
response = requests.get(url = url).json()
中国疫苗每日趋势  = response['data']['ChinaVaccineTrendData']
with open('data_source/腾讯新闻疫苗数据/中国疫苗每日趋势.json','w',encoding = 'utf-8') as file:
    file.write(json.dumps(中国疫苗每日趋势,ensure_ascii = False))

url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTrendData'
response = requests.get(url = url).json()
重点国家地区疫苗每日趋势  = response['data']['VaccineTrendData']
with open('data_source/腾讯新闻疫苗数据/重点国家地区疫苗每日趋势.json','w',encoding = 'utf-8') as file:
    file.write(json.dumps(重点国家地区疫苗每日趋势,ensure_ascii = False))

url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTopData'
response = requests.get(url = url).json()
中国及全球截至今日总疫苗接种量  = response['data']['VaccineTopData']
with open('data_source/腾讯新闻疫苗数据/中国及全球截至今日总疫苗接种量.json','w',encoding = 'utf-8') as file:
    file.write(json.dumps(中国及全球截至今日总疫苗接种量,ensure_ascii = False))

url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineSituationData'
response = requests.get(url = url).json()
各国截至今日疫苗接种情况  = response['data']['VaccineSituationData']
with open('data_source/腾讯新闻疫苗数据/各国截至今日疫苗接种情况.json','w',encoding = 'utf-8') as file:
    file.write(json.dumps(各国截至今日疫苗接种情况,ensure_ascii = False))