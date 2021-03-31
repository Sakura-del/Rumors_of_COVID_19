import re
import json
import time
import requests
from threading import Thread



def 较真网_func():

    rumor_needed_list = []
    def creeper_thread(page):
        url = f'https://vp.fact.qq.com/loadmore?artnum=0&page={i}&stopic=&_={int(time.time())}&callback=jsonp{i}'
        text = requests.get(url).text

        rumor_list = []
        try:
            rumor_list = json.loads(re.findall(r'^jsonp(?:\d*)[(](.*)[)]$',text,re.S)[0].replace('\\n','').replace('\\',''))['content']
        except:
            pass

        for rumor in rumor_list:
            for tag in rumor['tag']:
                if re.search('疫情',tag) or re.search('新冠',tag) or re.search('疫苗',tag) or re.search('新型冠状病毒',tag):
                    rumor_needed_list.append(rumor)
                    break


    thread_list = []
    for i in range(100):
        thread = Thread(target = creeper_thread,args = (i,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    json_data = json.dumps(rumor_needed_list,ensure_ascii=False)
    with open('data_source/较真网.json','w',encoding='utf-8') as file:
        file.write(json_data)



func_list = [较真网_func]