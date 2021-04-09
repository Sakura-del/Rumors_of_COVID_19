import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def QQ_news_testing_agency_func():
    testing_agency_list = []
    def Province_testing_agency_func(province):
        province_testing_agency_list_source_format = []
        for page in range(1,6):
            url = 'https://apis.map.qq.com/place_cloud/search/region'
            params = {  'region'     : province,
                        'table_id'   : '6013e1aeb1f45f2f3791cbc5',
                        'orderby'    : 'id',
                        'page_index' : page,
                        'page_size'  : 200,
                        'key'        : 'YNVBZ-FRJK3-BPX36-3XHBZ-U7WFQ-KBFMJ'}
            response = requests.get(url = url, params = params).json()
            province_testing_agency_list_source_format += response['result']['data']

        province_testing_agency_list = []
        testing_agency_dict = {}
        for testing_agency_source_format in province_testing_agency_list_source_format:
            testing_agency_dict = { 'address'  :testing_agency_source_format['address'],
                                    'province' :testing_agency_source_format['province'],
                                    'city'     :testing_agency_source_format['city'],
                                    'district' :testing_agency_source_format['district'],
                                    'tel'      :testing_agency_source_format['tel'],
                                    'title'    :testing_agency_source_format['title']}
            province_testing_agency_list.append(testing_agency_dict)

        province_testing_agency_dict = {'province' : province,
                                        'count'    : len(province_testing_agency_list),
                                        'data'     : province_testing_agency_list}
        testing_agency_list.append(province_testing_agency_dict)


    thread_list = []
    for province in ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆']:
        thread = Thread(target = Province_testing_agency_func,args = (province,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/腾讯新闻核酸检测机构.json', 'w', encoding = 'utf-8') as file:
        file.write(json.dumps(testing_agency_list, ensure_ascii = False))



func_list = [QQ_news_testing_agency_func]