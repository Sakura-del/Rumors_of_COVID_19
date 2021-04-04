import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def 腾讯新闻疫情新闻_func():
    疫情新闻_list = []
    def 一页新闻_func(page):
        url = 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list'
        params = {  'sub_srv_id' : 'antip',
                    'srv_id'     : 'pc',
                    'offset'     : page * 20,
                    'limit'      : 20,
                    'strategy'   : 1,
                    'ext'        : '{"pool":["high","top"],"is_filter":10,"check_type":true}'}
        response = requests.get(url = url,params = params).json()

        result = response['data']['list']
        for news in result:
            疫情新闻_list.append(news)


    for page in range(2):
        一页新闻_func(page)


    with open('data_source/data_from_creeper/腾讯新闻疫情新闻.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(疫情新闻_list,ensure_ascii = False))



func_list = [腾讯新闻疫情新闻_func]