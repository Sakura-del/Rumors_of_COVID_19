import os
import json
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')

def 腾讯新闻疫情新闻_func():

    news_page_1_list = []
    def news_page_1_func():
        url = r'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=antip&srv_id=pc&offset=0&limit=20&strategy=1&ext={%22pool%22:[%22high%22,%22top%22],%22is_filter%22:10,%22check_type%22:true}'
        response = requests.get(url = url).json()
        news_page_1_list.append(response['data']['list'])   #如果用news_page_1_list+=会报变量未定义，用append就不会，原因不明

    news_page_2_list = []
    def news_page_2_func():
        url = r'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=antip&srv_id=pc&offset=0&limit=23&strategy=1&ext={%22pool%22:[%22hot%22],%22is_filter%22:2,%22check_type%22:true}'
        response = requests.get(url = url).json()
        news_page_2_list.append(response['data']['list'])

    news_page_3_list = []
    def news_page_3_func():
        url = r'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=antip&srv_id=pc&offset=20&limit=20&strategy=1&ext={%22pool%22:[%22high%22,%22top%22],%22is_filter%22:10,%22check_type%22:true}'
        response = requests.get(url = url).json()
        news_page_3_list.append(response['data']['list'])

    news_page_4_list = []
    def news_page_4_func():
        url = r'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=antip&srv_id=pc&offset=40&limit=20&strategy=1&ext={%22pool%22:[%22high%22,%22top%22],%22is_filter%22:10,%22check_type%22:true}'
        response = requests.get(url = url).json()
        news_page_4_list.append(response['data']['list'])


    func_list = [news_page_1_func,news_page_2_func,news_page_3_func,news_page_4_func]
    thread_list = []
    for func in func_list:
        thread = Thread(target = func)
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    news_list = news_page_1_list[0] + news_page_2_list[0] + news_page_3_list[0] + news_page_4_list[0]
    with open('data_source/data_from_creeper/腾讯新闻疫情新闻.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(news_list,ensure_ascii = False))



func_list = [腾讯新闻疫情新闻_func]