import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


核酸检测机构_list = []
def 核酸检测机构_func():
    def 一省_核酸检测机构_func(province):
        一省_核酸检测机构_list = []
        for page in range(1,6):
            url = 'https://apis.map.qq.com/place_cloud/search/region'
            params = {  'region'     : province,
                        'table_id'   : '6013e1aeb1f45f2f3791cbc5',
                        'orderby'    : 'id',
                        'page_index' : page,
                        'page_size'  : 200,
                        'key'        : 'YNVBZ-FRJK3-BPX36-3XHBZ-U7WFQ-KBFMJ'}
            response = requests.get(url = url, params = params).json()
            一省_核酸检测机构_list += response['result']['data']

        一省_核酸检测机构_dict = {  'province' : province,
                                    'count'    : len(一省_核酸检测机构_list),
                                    'data'     : 一省_核酸检测机构_list}
        核酸检测机构_list.append(一省_核酸检测机构_dict)


    thread_list = []
    for province in ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆']:
        thread = Thread(target = 一省_核酸检测机构_func,args = (province,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()

    with open('data_source/data_from_creeper/腾讯新闻核酸检测机构.json', 'w', encoding='utf-8') as file:
        file.write(json.dumps(核酸检测机构_list, ensure_ascii=False))



func_list = [核酸检测机构_func]