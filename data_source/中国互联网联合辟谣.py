import os
import re
import json
import time
import requests
from lxml import etree
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def Piyao_org_cn_func():
    rumor_list = []
    def One_page_func(page):
        url = f'https://qcwa.news.cn/nodeart/list'
        params = {  'nid'      : '11215616',
                    'pgnum'    : page,
                    'cnt'      : 10,
                    'attr'     : 63,
                    'tp'       : 1,
                    'orderby'  : 1,
                    'callback' : 'jQuery112403357250426621905_1617889402895',
                    '_'        : int(time.time())}
        response = requests.get(url = url,params = params).text

        result = re.search(r'jQuery[0-9_]+\((.*)\)',response,re.S).groups()[0].replace('\n','')
        rumor_list_source_format = json.loads(result)

        try:
            for rumor in rumor_list_source_format['data']['list']:
                rumor_dict = {  'title':rumor['Title'],
                                'date':rumor['PubTime'],
                                'link':rumor['LinkUrl'],
                                'keyword':rumor['keyword'],
                                'editor':rumor['Editor'],
                                'author':rumor['Author'],
                                'source':rumor['SourceName'],
                                'pic_link':rumor['Title']}
                rumor_list.append(rumor_dict)
        except :
            pass


    thread_list = []
    for page in range(1,120):
        thread = Thread(target = One_page_func,args = (page,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/中国互联网联合辟谣.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(rumor_list,ensure_ascii = False))



func_list = [Piyao_org_cn_func]