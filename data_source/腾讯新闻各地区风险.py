import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


各地区风险_list = []
def 各地区风险_func():
    url = 'https://r.inews.qq.com/api/trackmap/poilist'
    response = requests.get(url = url).json()
    result = response['result']['list']

    for province in result:
        一地风险等级_dict = {   'name'               : province['fullname'],
                                'province'           : province['province'],
                                'city'               : province['city'],
                                'district'           : province['district'],
                                'low_level_count'    : province['risk_cnt']['level1'],
                                'medium_level_count' : province['risk_cnt']['level2'],
                                'high_level_count'   : province['risk_cnt']['level3']}
        各地区风险_list.append(一地风险等级_dict)
        for city in province['list']:
            一地风险等级_dict = {   'name'               : city['fullname'],
                                    'province'           : city['province'],
                                    'city'               : city['fullname'],
                                    'district'           : city['district'],
                                    'low_level_count'    : city['risk_cnt']['level1'],
                                    'medium_level_count' : city['risk_cnt']['level2'],
                                    'high_level_count'   : city['risk_cnt']['level3']}
            各地区风险_list.append(一地风险等级_dict)
            for district in city['list']:
                一地风险等级_dict = {   'name'               : district['fullname'],
                                        'province'           : district['province'],
                                        'city'               : district['city'],
                                        'district'           : district['district'],
                                        'low_level_count'    : district['risk_cnt']['level1'],
                                        'medium_level_count' : district['risk_cnt']['level2'],
                                        'high_level_count'   : district['risk_cnt']['level3']}
                各地区风险_list.append(一地风险等级_dict)


    with open('data_source/data_from_creeper/腾讯新闻各地区风险.json', 'w', encoding='utf-8') as file:
        file.write(json.dumps(各地区风险_list, ensure_ascii=False))



各地区风险_func()
func_list = [各地区风险_func]