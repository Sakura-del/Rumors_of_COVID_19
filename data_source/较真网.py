import re
import json
import time
import requests



headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63'}
rumor_needed_list = []

for i in range(100):
    url = f'https://vp.fact.qq.com/loadmore?artnum=0&page={i}&stopic=&_={int(time.time())}&callback=jsonp{i}'
    text = requests.get(url,headers).text

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

    time.sleep(0.1)

json_data = json.dumps(rumor_needed_list,ensure_ascii=False)
with open('data_source/较真网.json','w',encoding='utf-8') as file:
    file.write(json_data)