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


def DinXiang_today_data_func():
    overall_domestic_data_list = []
    def Overall_Domestic_data_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options = chrome_options)

        bro.get(url)
        time.sleep(1)

        tree = etree.HTML(bro.page_source)
        domestic_data_ul = tree.xpath('//ul[@class = "count___2lQ55"]')[0]   #有两个ul的class都叫这名，一个国内数据，一个全球数据

        li_data_type_list = ['current_confirmed','abroad','current_asym','confirmed','death','cured']
        type_index = 0
        for li in domestic_data_ul.xpath('./li'):
            change_from_yesterday_str = li.xpath('string(./div/div/b)').replace('较昨日','').replace(',','')
            overall_domestic_data_list.append({ 'type'  : li_data_type_list[type_index],
                                                'count' : eval(str(li.xpath('./strong/text()')[0]).replace(',','')),
                                                'incr'  : 0 if change_from_yesterday_str == '无变化' else eval(change_from_yesterday_str)})
            type_index += 1


    overall_global_data_list = []
    def Overall_Global_data_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options = chrome_options)

        bro.get(url)
        time.sleep(1)

        tree = etree.HTML(bro.page_source)
        global_data_ul = tree.xpath('//ul[@class = "count___2lQ55"]')[1]

        li_data_type_list = ['current_confirmed','confirmed','death','cured']
        type_index = 0
        for li in global_data_ul.xpath('./li'):
            change_from_yesterday_str = li.xpath('string(./div/div/b)').replace('昨日','').replace(',','')
            overall_global_data_list.append({   'type'  : li_data_type_list[type_index],
                                                'count' : eval(str(li.xpath('./strong/text()')[0]).replace(',','')),
                                                'incr'  : 0 if change_from_yesterday_str == '无变化' else eval(change_from_yesterday_str)})
            type_index += 1


    domestic_data_list = []
    def Domestic_data_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options = chrome_options)

        bro.get(url)
        time.sleep(1)

        #找到展开更多按钮
        unfold_button = bro.find_elements_by_xpath('//div[@class = "expandRow___1Y0WD internalTable___bQT_T"]/img')[0]  #有俩div的class叫这，一个国内数据，一个全球数据
        #滚动屏幕到那个按钮
        bro.execute_script("arguments[0].scrollIntoView();", unfold_button)
        #点那个按钮
        ActionChains(bro).click(unfold_button).perform()
        #获得html
        tree = etree.HTML(bro.page_source)

        domestic_data_div = tree.xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[0]
        for province_data_div in domestic_data_div.xpath('./div'):
            #这里声明这些空变量只是为了让程序员知道这个for循环会产生哪些信息，对软件运行并无影响，下同
            province_data_dict = {}
            overall_province_data_dict = {}
            province_city_data_list = []
            extra_info_str = ''

            #这俩pass用来跳过表头
            if province_data_div.xpath('./@class')[0] == 'areaBlock1___3qjL7 titleBlock___wqKiU':
                pass
            elif province_data_div.xpath('./@class')[0] == 'stickyTableHeader___1_88m stickyTableHidden___2X-X0':
                pass
            #跳过表尾
            elif province_data_div.xpath('./@class')[0] == 'hint___1-dxq':
                pass

            else:
                overall_province_data_dict = {  'area'              : province_data_div.xpath('./div[1]/p[1]/text()')[0],
                                                'current_confirmed' : eval(province_data_div.xpath('./div[1]/p[2]/text()')[0].replace(',','')),
                                                'confirmed'         : eval(province_data_div.xpath('./div[1]/p[3]/text()')[0].replace(',','')),
                                                'death'             : eval(province_data_div.xpath('./div[1]/p[4]/text()')[0].replace(',','')),
                                                'cured'             : eval(province_data_div.xpath('./div[1]/p[5]/text()')[0].replace(',',''))}

                for city_data_div in province_data_div.xpath('./div')[1:]:
                    city_data_dict = {}

                    #额外信息的div里有个span，城市数据的div里没有span
                    if len(city_data_div.xpath('./span')) == 1:
                        extra_info_str = city_data_div.xpath('./span/text()')[0]
                    else:
                        area_str = city_data_div.xpath('./p[1]/span/text()')[0]

                        #这一栏有几个是空，要判断下是不是空
                        text = city_data_div.xpath('./p[2]/text()')[0].replace(',','') if city_data_div.xpath('./p[2]/text()') else '0'
                        current_confirm_int = eval(text) if text != '-' else -1

                        text = city_data_div.xpath('./p[3]/text()')[0].replace(',','')
                        total_confirm_int = eval(text) if text != '-' else -1

                        text = city_data_div.xpath('./p[4]/text()')[0].replace(',','')
                        death_int = eval(text) if text != '-' else -1

                        text = city_data_div.xpath('./p[5]/text()')[0].replace(',','')
                        curred_int = eval(text) if text != '-' else -1

                        city_data_dict = {  'area'              : area_str,
                                            'current_confirmed' : current_confirm_int,
                                            'confirmed'         : total_confirm_int,
                                            'death'             : death_int,
                                            'cured'             : curred_int}
                        province_city_data_list.append(city_data_dict)

                province_data_dict = {  'overall_data' : overall_province_data_dict,
                                        'city_data'    : province_city_data_list,
                                        'extra_info'   : extra_info_str}
                domestic_data_list.append(province_data_dict)


    global_data_list = []
    def Global_data_func():
        url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        bro = webdriver.Chrome('data_source/chromedriver.exe', options = chrome_options)

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
        global_data_div = tree.xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[1]

        for island_data_div in global_data_div.xpath('./div')[2:9]:
            island_data_dict = {}
            island_total_data_dict = {}
            contry_data_list = []

            for contry_data_div in island_data_div.xpath('./div'):
                #contry_data_div表头是总体数据
                if contry_data_div.xpath('./@class')[0] == 'areaBlock1___3qjL7':
                    island_total_data_dict = { 'area'              : re.findall(r'(.+)[(]',str(contry_data_div.xpath('p[1]/text()')[0]))[0],
                                        'current_confirmed' : eval(contry_data_div.xpath('./p[2]/text()')[0].replace(',','')),
                                        'confirmed'         : eval(contry_data_div.xpath('./p[3]/text()')[0].replace(',','')),
                                        'death'             : eval(contry_data_div.xpath('./p[4]/text()')[0].replace(',','')),
                                        'cured'             : eval(contry_data_div.xpath('./p[5]/text()')[0].replace(',',''))}
                else:
                    contry_data_dict = {}

                    area_str = str(contry_data_div.xpath('p[1]/span/text()')[0])

                    text = contry_data_div.xpath('./p[2]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        current_confirm_int = eval(text) if text != '-' else -1
                    else:
                        current_confirm_int = -1

                    text = contry_data_div.xpath('./p[3]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        total_confirm_int = eval(text) if text != '-' else -1
                    else:
                        total_confirm_int = -1

                    text = contry_data_div.xpath('./p[4]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        death_int = eval(text) if text != '-' else -1
                    else:
                        death_int = -1

                    text = contry_data_div.xpath('./p[5]/text()')
                    if len(text) != 0:
                        text = text[0].replace(',','')
                        curred_int = eval(text) if text != '-' else -1
                    else:
                        curred_int = -1

                    contry_data_dict = {    'area'              : area_str,
                                            'current_confirmed' : current_confirm_int,
                                            'confirmed'         : total_confirm_int,
                                            'death'             : death_int,
                                            'cured'             : curred_int}
                    contry_data_list.append(contry_data_dict)

            island_data_dict = {    'island_data'        : island_total_data_dict,
                                    'island_nation_data' : contry_data_list}
            global_data_list.append(island_data_dict)


    func_list = [Overall_Domestic_data_func,Overall_Global_data_func,Domestic_data_func,Global_data_func]
    thread_list = []
    for func in func_list:
        thread = Thread(target = func)
        thread.start()
        thread_list.append(thread)

    for thread in thread_list:
        thread.join()


    with open('data_source/data_from_creeper/丁香医生本日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps({ 'current_covid_internal'  : overall_domestic_data_list,
                                'current_covid_global'    : overall_global_data_list,
                                'current_covid_provinces' : domestic_data_list,
                                'current_covid_national'  : global_data_list},ensure_ascii = False))



func_list = [DinXiang_today_data_func]