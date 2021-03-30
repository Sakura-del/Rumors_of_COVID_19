import json
import requests



url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=ChinaVaccineTrendData'
response = requests.get(url = url).json()
中国疫苗每日趋势  = response['data']['ChinaVaccineTrendData']

url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTrendData'
response = requests.get(url = url).json()
重点国家地区疫苗每日趋势  = response['data']['VaccineTrendData']

url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTopData'
response = requests.get(url = url).json()
中国及全球截至今日总疫苗接种量  = response['data']['VaccineTopData']

url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineSituationData'
response = requests.get(url = url).json()
各国截至今日疫苗接种情况  = response['data']['VaccineSituationData']