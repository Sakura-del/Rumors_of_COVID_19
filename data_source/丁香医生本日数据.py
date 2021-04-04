import re
import os
import json
import time
from lxml import etree
from threading import Thread
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def 丁香医生本日数据_func():
    国内总体数据_list = []
    def 国内总体数据_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options=chrome_options)

        bro.get(url)
        time.sleep(1)

        tree = etree.HTML(bro.page_source)
        国内数据_ul = tree.xpath('//ul[@class = "count___2lQ55"]')[0]   #有两个ul的class都叫这名，一个国内数据，一个全球数据

        li_data_type_list = ['current_confirmed','abroad','current_asym','confirmed','death','cured']
        type_index = 0
        for li in 国内数据_ul.xpath('./li'):
            较昨日变化_str = li.xpath('string(./div/div/b)').replace('较昨日','').replace(',','')
            国内总体数据_list.append({  'type'  : li_data_type_list[type_index],
                                        'count' : eval(str(li.xpath('./strong/text()')[0]).replace(',','')),
                                        'incr'  : 0 if 较昨日变化_str == '无变化' else eval(较昨日变化_str)})
            type_index += 1


    全球总体数据_list = []
    def 全球总体数据_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options=chrome_options)

        bro.get(url)
        time.sleep(1)

        tree = etree.HTML(bro.page_source)
        全球数据_ul = tree.xpath('//ul[@class = "count___2lQ55"]')[1]

        li_data_type_list = ['current_confirmed','confirmed','death','cured']
        type_index = 0
        for li in 全球数据_ul.xpath('./li'):
            较昨日变化_str = li.xpath('string(./div/div/b)').replace('昨日','').replace(',','')
            全球总体数据_list.append({  'type'  : li_data_type_list[type_index],
                                        'count' : eval(str(li.xpath('./strong/text()')[0]).replace(',','')),
                                        'incr'  : 0 if 较昨日变化_str == '无变化' else eval(较昨日变化_str)})
            type_index += 1


    国内数据_list = []
    def 国内数据_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options=chrome_options)

        bro.get(url)
        time.sleep(1)

        #找到展开更多按钮
        unfold_button = bro.find_elements_by_xpath('//div[@class = "expandRow___1Y0WD internalTable___bQT_T"]/img')[0]  #有俩div的class叫这，一个国内数据，一个全球数据
        #滚动屏幕到那个按钮
        bro.execute_script("arguments[0].scrollIntoView();", unfold_button)
        #点那个按钮
        #获得html
        ActionChains(bro).click(unfold_button).perform()
        tree = etree.HTML(bro.page_source)

        国内数据_div = tree.xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[0]
        for 一省数据_div in 国内数据_div.xpath('./div'):
            #这里声明这些空变量只是为了让程序员知道这个for循环会产生哪些信息，对软件运行并无影响，下同
            一省数据_dict = {}
            一省总体数据_dict = {}
            一省城市数据_list = []
            额外信息_str = ''

            #这俩pass用来跳过表头
            if 一省数据_div.xpath('./@class')[0] == 'areaBlock1___3qjL7 titleBlock___wqKiU':
                pass
            elif 一省数据_div.xpath('./@class')[0] == 'stickyTableHeader___1_88m stickyTableHidden___2X-X0':
                pass
            #跳过表尾
            elif 一省数据_div.xpath('./@class')[0] == 'hint___1-dxq':
                pass

            else:
                一省总体数据_dict = {   'area'              : 一省数据_div.xpath('./div[1]/p[1]/text()')[0],
                                        'current_confirmed' : eval(一省数据_div.xpath('./div[1]/p[2]/text()')[0].replace(',','')),
                                        'confirmed'         : eval(一省数据_div.xpath('./div[1]/p[3]/text()')[0].replace(',','')),
                                        'death'             : eval(一省数据_div.xpath('./div[1]/p[4]/text()')[0].replace(',','')),
                                        'cured'             : eval(一省数据_div.xpath('./div[1]/p[5]/text()')[0].replace(',',''))}

                for 一市数据_div in 一省数据_div.xpath('./div')[1:]:
                    一市数据_dict = {}

                    #额外信息的div里有个span，城市数据的div里没有span
                    if len(一市数据_div.xpath('./span')) == 1:
                        额外信息_str = 一市数据_div.xpath('./span/text()')[0]
                    else:
                        地区_str = 一市数据_div.xpath('./p[1]/span/text()')[0]

                        text = 一市数据_div.xpath('./p[2]/text()')[0].replace(',','')
                        现存确诊_int = eval(text) if text != '-' else -1

                        text = 一市数据_div.xpath('./p[3]/text()')[0].replace(',','')
                        累计确诊_int = eval(text) if text != '-' else -1

                        text = 一市数据_div.xpath('./p[4]/text()')[0].replace(',','')
                        死亡_int = eval(text) if text != '-' else -1

                        text = 一市数据_div.xpath('./p[5]/text()')[0].replace(',','')
                        治愈_int = eval(text) if text != '-' else -1

                        一市数据_dict = {   'area'              : 地区_str,
                                            'current_confirmed' : 现存确诊_int,
                                            'confirmed'         : 累计确诊_int,
                                            'death'             : 死亡_int,
                                            'cured'             : 治愈_int}
                        一省城市数据_list.append(一市数据_dict)

                一省数据_dict = {   'overall_data' : 一省总体数据_dict,
                                    'city_data'    : 一省城市数据_list,
                                    'extra_info'   : 额外信息_str}
                国内数据_list.append(一省数据_dict)


    全球数据_list = []
    def 全球数据_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options=chrome_options)

        bro.get(url)
        time.sleep(1)

        #展开所有表
        #每个州都有个展开更多按钮，都要点一次，但是因为有表头遮挡，又不能直接滚动到展开更多按钮，要滚到展开更多按钮的上一行，真的很麻烦
        div = bro.find_elements_by_xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[1]
        #这个div有两行表头，6行表，1行表尾，只要中间六行
        for block in div.find_elements_by_xpath('./div')[2:9]:
            #滚到展开更多前一行
            scroll_target = block.find_elements_by_xpath('./div')[-2]
            bro.execute_script("arguments[0].scrollIntoView();", scroll_target)

            #点展开更多
            unfold_button = block.find_elements_by_xpath('./div')[-1]
            ActionChains(bro).click(unfold_button).perform()

        tree = etree.HTML(bro.page_source)
        全球数据_div = tree.xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[1]

        for 一州数据_div in 全球数据_div.xpath('./div')[2:9]:
            一州数据_dict = {}
            州总体数据_dict = {}
            州各国数据_list = []

            for 一国数据_div in 一州数据_div.xpath('./div'):
                #一国数据_div表头是总体数据
                if 一国数据_div.xpath('./@class')[0] == 'areaBlock1___3qjL7':
                    州总体数据_dict = { 'area'              : re.findall(r'(.+)[(]',str(一国数据_div.xpath('p[1]/text()')[0]))[0],
                                        'current_confirmed' : eval(一国数据_div.xpath('./p[2]/text()')[0].replace(',','')),
                                        'confirmed'         : eval(一国数据_div.xpath('./p[3]/text()')[0].replace(',','')),
                                        'death'             : eval(一国数据_div.xpath('./p[4]/text()')[0].replace(',','')),
                                        'cured'             : eval(一国数据_div.xpath('./p[5]/text()')[0].replace(',',''))}
                else:
                    一国数据_dict = {}

                    地区_str = str(一国数据_div.xpath('p[1]/span/text()')[0])

                    text = 一国数据_div.xpath('./p[2]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        现存确诊_int = eval(text) if text != '-' else -1
                    else:
                        现存确诊_int = -1

                    text = 一国数据_div.xpath('./p[3]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        累计确诊_int = eval(text) if text != '-' else -1
                    else:
                        累计确诊_int = -1

                    text = 一国数据_div.xpath('./p[4]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        死亡_int = eval(text) if text != '-' else -1
                    else:
                        死亡_int = -1

                    text = 一国数据_div.xpath('./p[5]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        治愈_int = eval(text) if text != '-' else -1
                    else:
                        治愈_int = -1

                    一国数据_dict = {   'area'              : 地区_str,
                                        'current_confirmed' : 现存确诊_int,
                                        'confirmed'         : 累计确诊_int,
                                        'death'             : 死亡_int,
                                        'cured'             : 治愈_int}
                    州各国数据_list.append(一国数据_dict)

            一州数据_dict = {   'island_data'        : 州总体数据_dict,
                                'island_nation_data' : 州各国数据_list}
            全球数据_list.append(一州数据_dict)


    func_list = [国内总体数据_func,全球总体数据_func,国内数据_func,全球数据_func]
    thread_list = []
    for func in func_list:
        thread = Thread(target = func)
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/丁香医生本日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps({ 'current_covid_internal'  : 国内总体数据_list,
                                'current_covid_global'    : 全球总体数据_list,
                                'current_covid_provinces' : 国内数据_list,
                                'current_covid_national'  : 全球数据_list},ensure_ascii = False))



func_list = [丁香医生本日数据_func]