import os
import json
import requests



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')

if not os.path.isdir('data_source/data_from_creeper/腾讯新闻疫苗数据'):
    os.makedirs('data_source/data_from_creeper/腾讯新闻疫苗数据')


def 中国疫苗每日趋势_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=ChinaVaccineTrendData'
    response = requests.get(url = url).json()
    中国疫苗每日趋势  = response['data']['ChinaVaccineTrendData']
    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/中国疫苗每日趋势.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(中国疫苗每日趋势,ensure_ascii = False))

def 重点国家地区疫苗每日趋势_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTrendData'
    response = requests.get(url = url).json()
    trend_data = response['data']['VaccineTrendData']

    perHundredTrend = {}
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '匈牙利' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend.update({'Israel':trend_data['perHundredTrend']['以色列']})

    perHundredTrend = { 'Israel'     : trend_data['perHundredTrend']['以色列'],
                        'Hungary'    : trend_data['perHundredTrend']['匈牙利'],
                        'Turkey'     : trend_data['perHundredTrend']['土耳其'],
                        'Austria'    : trend_data['perHundredTrend']['奥地利'],
                        'Italy'      : trend_data['perHundredTrend']['意大利'],
                        'Morocco'    : trend_data['perHundredTrend']['摩洛哥'],
                        # 'Switzerland': trend_data['perHundredTrend']['瑞士'],
                        'EU'         : trend_data['perHundredTrend']['欧盟'],
                        'Chile'      : trend_data['perHundredTrend']['智利'],
                        'US'         : trend_data['perHundredTrend']['美国'],
                        'UK'         : trend_data['perHundredTrend']['英国'],
                        # 'Portugal'   : trend_data['perHundredTrend']['葡萄牙'],
                        'Spain'      : trend_data['perHundredTrend']['西班牙'],
                        'Arab'       : trend_data['perHundredTrend']['阿联酋']}

    totalTrend = {  'Africa'    : trend_data['totalTrend']['Africa'],
                    'China'     : trend_data['totalTrend']['中国'],
                    'Russia'    : trend_data['totalTrend']['俄罗斯'],
                    'India'     : trend_data['totalTrend']['印度'],
                    'Indonesia' : trend_data['totalTrend']['印度尼西亚'],
                    'Turkey'    : trend_data['totalTrend']['土耳其'],
                    'Brazil'    : trend_data['totalTrend']['巴西'],
                    'Germany'   : trend_data['totalTrend']['德国'],
                    'EU'        : trend_data['totalTrend']['欧盟'],
                    'France'    : trend_data['totalTrend']['法国'],
                    'US'        : trend_data['totalTrend']['美国'],
                    'UK'        : trend_data['totalTrend']['英国'],}

    重点国家地区疫苗每日趋势  = {'perHundredTrend':perHundredTrend,'totalTrend':totalTrend}
    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/重点国家地区疫苗每日趋势.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(重点国家地区疫苗每日趋势,ensure_ascii = False))

def 中国及全球截至今日总疫苗接种量_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTopData'
    response = requests.get(url = url).json()
    中国及全球截至今日总疫苗接种量  = { 'china'  : response['data']['VaccineTopData']['中国'],
                                        'global' : response['data']['VaccineTopData']['全球']}
    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/中国及全球截至今日总疫苗接种量.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(中国及全球截至今日总疫苗接种量,ensure_ascii = False))

def 各国截至今日疫苗接种情况_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineSituationData'
    response = requests.get(url = url).json()
    各国截至今日疫苗接种情况  = response['data']['VaccineSituationData']
    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/各国截至今日疫苗接种情况.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(各国截至今日疫苗接种情况, ensure_ascii = False))



func_list = [中国疫苗每日趋势_func,中国及全球截至今日总疫苗接种量_func,各国截至今日疫苗接种情况_func]