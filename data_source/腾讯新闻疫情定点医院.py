import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def 疫情定点医院_func():
    疫情定点医院_list = []
    def 一省定点医院数据_func(province):
        url = 'https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince'
        data = {'service' : 'THPneumoniaOuterService',
                'args'    : {'req': {'province': province}},
                'func'    : 'getHospitalCityByProvince',
                'context' : {'channel': 'AAEEviDRbllNrToqonqBmrER'}}
        response = requests.post(url=url, data=json.dumps(data)).json()
        疫情定点医院_list.append(response['args']['rsp']['info'])


    thread_list = []
    for province in ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆']:
        thread = Thread(target = 一省定点医院数据_func,args = (province,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/腾讯新闻疫情定点医院.json', 'w', encoding='utf-8') as file:
        file.write(json.dumps(疫情定点医院_list, ensure_ascii=False))



func_list = [疫情定点医院_func]