import os
import re
import json
import requests
from lxml import etree
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def TouTiao_epidemic_news_func():
    news_list = []
    def One_page_func(page):
        url = f'http://www.cp79115.cn/tag/疫情/page/{page}'
        response = requests.get(url = url).text

        article_list = etree.HTML(response).xpath('//article')
        for article in article_list:
            #有些新闻好像有问题
            try:
                data = re.findall('(^\d+年\d+月\d+日)',article.xpath('./small/text()')[0])[0]
                news_dict = {   'title'    : article.xpath('./h2/a/text()')[0],
                                'link'     : article.xpath('./h2/a/@href')[0],
                                'date'     : re.sub(r'(\d+)年(\d+)月(\d+)日',r'\1-\2-\3',data),
                                'field'    : article.xpath('./small/a[2]/text()')[0],
                                'summary'  : article.xpath('./div/p[1]/text()')[0].strip(),
                                'tag_list' : [a.xpath('./text()')[0] for a in article.xpath('./div/p[2]/a')]}
                news_list.append(news_dict)
            except:
                pass


    thread_list = []
    for page in range(250):
        thread = Thread(target = One_page_func,args = (page,))
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/头条疫情新闻.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(news_list,ensure_ascii = False))


# TouTiao_epidemic_news_func()
func_list = [TouTiao_epidemic_news_func]