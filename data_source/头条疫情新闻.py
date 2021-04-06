import os
import re
import json
import requests
from lxml import etree
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def 头条疫情新闻_func():
    url = 'http://www.cp79115.cn/tag/疫情/page/2'
    response = requests.get(url = url,).text

    新闻列表_list = []
    def 一页新闻_func(page):
        article_list = etree.HTML(response).xpath('//article')
        for article in article_list:
            新闻信息_dict = {   'title'    : article.xpath('./h2/a/text()')[0],
                                'link'     : article.xpath('./h2/a/@href')[0],
                                'date'     : re.findall('(^\d+年\d+月\d+日)',article.xpath('./small/text()')[0])[0],
                                'field'    : article.xpath('./small/a[2]/text()')[0],
                                'summary'  : article.xpath('./div/p[1]/text()')[0].strip(),
                                'tag_list' : [a.xpath('./text()')[0] for a in article.xpath('./div/p[2]/a')]}
            新闻列表_list.append(新闻信息_dict)


    thread_list = []
    for page in range(300):
        thread = Thread(target = 一页新闻_func,args = (page,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/头条疫情新闻.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(新闻列表_list,ensure_ascii = False))



func_list = [头条疫情新闻_func]