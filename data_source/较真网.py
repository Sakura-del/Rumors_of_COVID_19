import re
import os
import json
import time
import requests
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def 较真网_func():
    rumor_needed_list = []

    def 较真网一页_func(page):
        url = f'https://vp.fact.qq.com/loadmore'
        params = {  'artnum'   : 0,
                    'page'     : page,
                    'stopic'   : '',
                    '&_'       : int(time.time()),
                    'callback' : page,}
        text = requests.get(url = url,params = params).text

        rumor_list = []
        try:
            rumor_list = json.loads(re.findall(r'(?:\d*)[(](.*)[)]$',text,re.S)[0].replace('\\n','').replace('\\',''))['content']
        except:
            print(f'较真网，第{page}页解析为json失败')
            return

        target_tag_list = ['疫情','新冠','疫苗','新型冠状']
        check_tag_func = lambda target_source_pair : True if re.search(target_source_pair[0],target_source_pair[1]) else False
        #target_source_pair是一个元组，第0个是目标tag，第1个是需验证的tag

        for rumor in rumor_list:
            #标题或者tag里有target_tag_list里的内容就把这谣言加rumor_needed_list里去
            flag = False
            for tag in rumor['tag']:
                #把每个目标tag和当前tag成对
                target_source_pair = zip(target_tag_list,[tag] * len(target_tag_list))
                if any(map(check_tag_func,target_source_pair)):
                    rumor_needed_list.append(rumor)
                    flag = True
                    break

            if flag == False:
                #把每个目标tag和标题成对
                target_source_pair = zip(target_tag_list,[rumor['title']] * len(target_tag_list))
                if any(map(check_tag_func,target_source_pair)):
                    rumor_needed_list.append(rumor)


    thread_list = []
    for i in range(200):
        thread = Thread(target = 较真网一页_func,args = (i,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/较真网.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(rumor_needed_list,ensure_ascii = False))



func_list = [较真网_func]