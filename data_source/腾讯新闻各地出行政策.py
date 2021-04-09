import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def QQ_news_travel_policy_func():
    #获取各市id
    url = 'https://r.inews.qq.com/api/trackmap/citylist'
    response = requests.get(url = url).json()

    region_id_list = []
    for province in response["result"]:
        region_id_list.append(province['id'])

        for city in province['list']:
            region_id_list.append(city['id'])

            for district in city['list']:
                region_id_list.append(district['id'])

    region_id_list = set(region_id_list)    #有很多重复的id，转成集合来去重

    region_travel_policy_list = []
    def region_travel_policy_func(region_id):
        url = 'https://r.inews.qq.com/api/trackmap/citypolicy'
        params = { 'city_id' : f'110000,{region_id}'}
        #有些地区没有出行政策或者腾讯那边json格式有问题，要try一下
        try:
            response = requests.get(url = url, params = params).json()

            region_travel_policy_dict = {}
            target_region = response['result']['data'][1]
            region_travel_policy_dict = {   'province'          : target_region['province'],
                                            'city'              : target_region['city'],
                                            'district'          : target_region['district'] if target_region['district'] != '' else target_region['city'],
                                            'leave_policy_list' : [leave_policy.strip() for leave_policy in target_region['leave_policy_list']],
                                            'back_policy_list'  : [back_policy.strip() for back_policy in target_region['back_policy_list']],
                                            'stay_info_list'    : [stay_info.strip() for stay_info in target_region['stay_info_list']]}
            region_travel_policy_list.append(region_travel_policy_dict)
        except :
            return


    thread_list = []
    for region_id in region_id_list:
        thread = Thread(target = region_travel_policy_func,args = (region_id,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/腾讯新闻各地出行政策.json', 'w', encoding = 'utf-8') as file:
        file.write(json.dumps(region_travel_policy_list, ensure_ascii = False))



func_list = [QQ_news_travel_policy_func]