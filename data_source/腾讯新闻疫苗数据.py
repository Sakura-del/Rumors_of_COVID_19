import os
import json
import requests



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')

if not os.path.isdir('data_source/data_from_creeper/腾讯新闻疫苗数据'):
    os.makedirs('data_source/data_from_creeper/腾讯新闻疫苗数据')


def 中国疫苗每日趋势_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list'
    params = {'modules' : 'ChinaVaccineTrendData'}
    response = requests.get(url = url,params = params).json()
    result  = response['data']['ChinaVaccineTrendData']

    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/中国疫苗每日趋势.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def 重点国家地区疫苗每日趋势_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list'
    params = {'modules' : 'VaccineTrendData'}
    response = requests.get(url = url,params = params).json()
    trend_data = response['data']['VaccineTrendData']

    perHundredTrend_dict = {}
    if '以色列' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Israel'        : trend_data['perHundredTrend']['以色列']})
    if '匈牙利' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Hungary'       : trend_data['perHundredTrend']['匈牙利']})
    if '土耳其' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Turkey'        : trend_data['perHundredTrend']['土耳其']})
    if '奥地利' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Austria'       : trend_data['perHundredTrend']['奥地利']})
    if '意大利' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Italy'         : trend_data['perHundredTrend']['意大利']})
    if '摩洛哥' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Morocco'       : trend_data['perHundredTrend']['摩洛哥']})
    if '瑞士' in trend_data['perHundredTrend']  :
        perHundredTrend_dict.update({'Switzerland'   : trend_data['perHundredTrend']['瑞士']})
    if '欧盟' in trend_data['perHundredTrend']  :
        perHundredTrend_dict.update({'EU'            : trend_data['perHundredTrend']['欧盟']})
    if '智利' in trend_data['perHundredTrend']  :
        perHundredTrend_dict.update({'Chile'         : trend_data['perHundredTrend']['智利']})
    if '美国' in trend_data['perHundredTrend']  :
        perHundredTrend_dict.update({'US'            : trend_data['perHundredTrend']['美国']})
    if '英国' in trend_data['perHundredTrend']  :
        perHundredTrend_dict.update({'UK'            : trend_data['perHundredTrend']['英国']})
    if '葡萄牙' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Portugal'      : trend_data['perHundredTrend']['葡萄牙']})
    if '西班牙' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Spain'         : trend_data['perHundredTrend']['西班牙']})
    if '阿联酋' in trend_data['perHundredTrend']:
        perHundredTrend_dict.update({'Arab'          : trend_data['perHundredTrend']['阿联酋']})

    totalTrend_dict = {}
    if 'Africa' in trend_data['totalTrend']:
        totalTrend_dict.update({'Africa'      : trend_data['totalTrend']['Africa']})
    if '中国' in trend_data['totalTrend']:
        totalTrend_dict.update({'China'       : trend_data['totalTrend']['中国']})
    if '俄罗斯' in trend_data['totalTrend']:
        totalTrend_dict.update({'Russia'      : trend_data['totalTrend']['俄罗斯']})
    if '印度' in trend_data['totalTrend']:
        totalTrend_dict.update({'India'       : trend_data['totalTrend']['印度']})
    if '印度尼西亚' in trend_data['totalTrend']:
        totalTrend_dict.update({'Indonesia'   : trend_data['totalTrend']['印度尼西亚']})
    if '土耳其' in trend_data['totalTrend']:
        totalTrend_dict.update({'Turkey'      : trend_data['totalTrend']['土耳其']})
    if '巴西' in trend_data['totalTrend']:
        totalTrend_dict.update({'Brazil'      : trend_data['totalTrend']['巴西']})
    if '德国' in trend_data['totalTrend']:
        totalTrend_dict.update({'Germany'     : trend_data['totalTrend']['德国']})
    if '欧盟' in trend_data['totalTrend']:
        totalTrend_dict.update({'EU'          : trend_data['totalTrend']['欧盟']})
    if '法国' in trend_data['totalTrend']:
        totalTrend_dict.update({'France'      : trend_data['totalTrend']['法国']})
    if '美国' in trend_data['totalTrend']:
        totalTrend_dict.update({'US'      : trend_data['totalTrend']['美国']})
    if '英国' in trend_data['totalTrend']:
        totalTrend_dict.update({'UK'          : trend_data['totalTrend']['英国']})

    重点国家地区疫苗每日趋势  = {   'perHundredTrend' : perHundredTrend_dict,
                                    'totalTrend'      : totalTrend_dict}

    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/重点国家地区疫苗每日趋势.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(重点国家地区疫苗每日趋势,ensure_ascii = False))


重点国家地区疫苗每日趋势_func()
def 中国及全球截至今日总疫苗接种量_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list'
    params = {'modules' : 'VaccineTopData'}
    response = requests.get(url = url,params = params).json()
    result = { 'china'  : response['data']['VaccineTopData']['中国'],
                                        'global' : response['data']['VaccineTopData']['全球']}

    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/中国及全球截至今日总疫苗接种量.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def 各国截至今日疫苗接种情况_func():
    url = 'https://api.inews.qq.com/newsqa/v1/automation/modules/list'
    params = {'modules' : 'VaccineSituationData'}
    response = requests.get(url = url,params = params).json()
    result  = response['data']['VaccineSituationData']

    with open('data_source/data_from_creeper/腾讯新闻疫苗数据/各国截至今日疫苗接种情况.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result, ensure_ascii = False))



func_list = [中国疫苗每日趋势_func,重点国家地区疫苗每日趋势_func,中国及全球截至今日总疫苗接种量_func,各国截至今日疫苗接种情况_func]