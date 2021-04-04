import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def 疫苗接种点_func():
    #获取各市id
    url = 'https://stars.news.qq.com/'
    params = {'service' : 'App.Answer_YiMiaoMap.getList'}
    response = requests.get(url = url,params = params).json()

    city_province_list = [{ 'city'     : city['city'],
                            'province' : city['province']}
                          for city in response['data']['data']]

    疫苗接种点_list = []
    def 一市接种点func(city,province):
        url = 'https://apis.map.qq.com/place_cloud/search/region'
        headers = { 'Origin'     : 'https://new.qq.com',
                    'Referer'    : 'https://new.qq.com/',
                    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'}
        params = {  'region'     : f'{province},{city}',
                    'key'        : 'ZTCBZ-M6FWU-DFTVG-2HCU2-OM7SV-2LBCF',
                    'orderby'    : 'distance(39.90387,116.389893)',
                    'table_id'   : '5fed45b33fc08460dcadf521',
                    'page_size'  : 20,
                    'page_index' : 1}
        #城市列表里有些城市是没有数据的，发请求会返回请求非法，所以要try一下
        try:
            response = requests.get(url = url,headers = headers,params = params).json()

            result = response['result']['data']
            for hospital in result:
                疫苗接种点_dict = { 'address'  : hospital['address'],
                                    'province' : hospital['province'],
                                    'city'     : hospital['city'],
                                    'district' : hospital['district'],
                                    'title'    : hospital['title'],
                                    'tel'      : hospital['tel']}
                疫苗接种点_list.append(疫苗接种点_dict)
        except :
            return


    thread_list = []
    for city in city_province_list:
        thread = Thread(target = 一市接种点func,args = (city['city'],city['province'],))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/腾讯新闻疫苗接种点.json', 'w', encoding = 'utf-8') as file:
        file.write(json.dumps(疫苗接种点_list, ensure_ascii = False))



func_list = [疫苗接种点_func]