import re
import json
import time
from lxml import etree
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options



url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline'
chrome_options = Options()

chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
bro = webdriver.Chrome('chromedriver.exe', options=chrome_options)

bro.get(url)
time.sleep(1)



国内总体数据_list = []
#有些数据要点击页面刷新html后才能获取，所以所有数据都统一重新获取html页面，免得被上一项数据的页面操作污染
tree = etree.HTML(bro.page_source)
国内数据_ul = tree.xpath('//ul[@class = "count___2lQ55"]')[0]   #有两个ul的class都叫这名，一个国内数据，一个全球数据
li_data_type_list = ['current_confirmed','abroad','current_asym','confirmed','death','cured']
type_index = 0
for li in 国内数据_ul.xpath('./li'):
    较昨日变化 = li.xpath('string(./div/div/b)').replace('较昨日','').replace(',','')
    国内总体数据_list.append({  'type'  : li_data_type_list[type_index],
                                'count' : eval(str(li.xpath('./strong/text()')[0]).replace(',','')),
                                'incr'  : 0 if 较昨日变化 == '无变化' else eval(较昨日变化)})
    type_index += 1



全球总体数据_list = []
tree = etree.HTML(bro.page_source)
全球数据_ul = tree.xpath('//ul[@class = "count___2lQ55"]')[1]
li_data_type_list = ['current_confirmed','confirmed','death','cured']
type_index = 0
for li in 全球数据_ul.xpath('./li'):
    较昨日变化 = li.xpath('string(./div/div/b)').replace('昨日','').replace(',','')
    全球总体数据_list.append({  'type'  : li_data_type_list[type_index],
                                'count' : eval(str(li.xpath('./strong/text()')[0]).replace(',','')),
                                'incr'  : 0 if 较昨日变化 == '无变化' else eval(较昨日变化)})
    type_index += 1



国内数据_list = []
#展开更多按钮
unfold_button = bro.find_elements_by_xpath('//div[@class = "expandRow___1Y0WD internalTable___bQT_T"]/img')[0]  #有俩div的class叫这，一个国内数据，一个全球数据
#滚动屏幕到那个按钮
bro.execute_script("arguments[0].scrollIntoView();", unfold_button)
#点那个按钮
ActionChains(bro).click(unfold_button).perform()
#重新获得html
tree = etree.HTML(bro.page_source)

国内数据_div = tree.xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[0]
for 一省数据_div in 国内数据_div.xpath('./div'):
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

        一市数据_dict = {}
        for 一市数据_div in 一省数据_div.xpath('./div')[1:]:
            #额外信息的div里有个span，城市数据的div里没有span
            if len(一市数据_div.xpath('./span')) == 1:
                额外信息_str = 一市数据_div.xpath('./span/text()')[0]
            else:
                地区 = 一市数据_div.xpath('./p[1]/span/text()')[0]

                text = 一市数据_div.xpath('./p[2]/text()')[0].replace(',','')
                现存确诊 = eval(text) if text != '-' else -1

                text = 一市数据_div.xpath('./p[3]/text()')[0].replace(',','')
                累计确诊 = eval(text) if text != '-' else -1

                text = 一市数据_div.xpath('./p[4]/text()')[0].replace(',','')
                死亡 = eval(text) if text != '-' else -1

                text = 一市数据_div.xpath('./p[5]/text()')[0].replace(',','')
                治愈 = eval(text) if text != '-' else -1

                一市数据_dict = {   'area'              : 地区,
                                    'current_confirmed' : 现存确诊,
                                    'confirmed'         : 累计确诊,
                                    'death'             : 死亡,
                                    'cured'             : 治愈}
                一省城市数据_list.append(一市数据_dict)

        一省数据_dict = {   'overall_data' : 一省总体数据_dict,
                            'city_data'    : 一省城市数据_list,
                            'extra_info'   : 额外信息_str}
        国内数据_list.append(一省数据_dict)



全球数据_list = []

#展开所有表
#每个州都有个展开更多按钮，都要点一次，但是因为有表头遮挡，又不能直接滚动到展开更多按钮，要滚到展开更多按钮的上一行，真的很麻烦
div = bro.find_elements_by_xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[1]
#这个div有两行表头，6行表，1行表尾，只要中间六行
for block in div.find_elements_by_xpath('./div')[2:9]:
    scroll_target = block.find_elements_by_xpath('./div')[-2]
    #滚到展开更多前一行
    bro.execute_script("arguments[0].scrollIntoView();", scroll_target)

    #点展开更多
    unfold_button = block.find_elements_by_xpath('./div')[-1]
    ActionChains(bro).click(unfold_button).perform()

#重新获得html
tree = etree.HTML(bro.page_source)
全球数据_div = tree.xpath('//div[@class = "areaBox___Sl7gp themeA___1BO7o numFormat___nZ7U7 flexLayout___1pYge"]')[1]

州数据 = {}
for 州数据_div in 全球数据_div.xpath('./div')[2:9]:
    州总体数据_dict = {}
    州各国数据_list = []
    一国数据 = {}

    for 一国数据_div in 州数据_div.xpath('./div'):
        #表头
        if 一国数据_div.xpath('./@class')[0] == 'areaBlock1___3qjL7':
            州总体数据_dict = { 'area'              : re.findall(r'(.+)[(]',str(一国数据_div.xpath('p[1]/text()')[0]))[0],
                                'current_confirmed' : eval(一国数据_div.xpath('./p[2]/text()')[0].replace(',','')),
                                'confirmed'         : eval(一国数据_div.xpath('./p[3]/text()')[0].replace(',','')),
                                'death'             : eval(一国数据_div.xpath('./p[4]/text()')[0].replace(',','')),
                                'cured'             : eval(一国数据_div.xpath('./p[5]/text()')[0].replace(',',''))}
        else:
            地区 = str(一国数据_div.xpath('p[1]/span/text()')[0])

            text = 一国数据_div.xpath('./p[2]/text()')
            if len(text) != 0:
                text = text[0].replace(',','')
                现存确诊 = eval(text) if text != '-' else -1
            else:
                现存确诊 = -1

            text = 一国数据_div.xpath('./p[3]/text()')
            if len(text) != 0:
                text = text[0].replace(',','')
                累计确诊 = eval(text) if text != '-' else -1
            else:
                累计确诊 = -1

            text = 一国数据_div.xpath('./p[4]/text()')
            if len(text) != 0:
                text = text[0].replace(',','')
                死亡 = eval(text) if text != '-' else -1
            else:
                死亡 = -1

            text = 一国数据_div.xpath('./p[5]/text()')
            if len(text) != 0:
                text = text[0].replace(',','')
                治愈 = eval(text) if text != '-' else -1
            else:
                治愈 = -1

            一国数据 = {'area'              : 地区,
                        'current_confirmed' : 现存确诊,
                        'confirmed'         : 累计确诊,
                        'death'             : 死亡,
                        'cured'             : 治愈}
            州各国数据_list.append(一国数据)

    州数据 = {  'island_data'        : 州总体数据_dict,
                'island_nation_data' : 州各国数据_list}
    全球数据_list.append(州数据)



with open('data_source/丁香医生本日数据.json','w',encoding='utf-8') as file:
    file.write(json.dumps({ 'current_covid_internal'  : 国内总体数据_list,
                            'current_covid_global'    : 全球总体数据_list,
                            'current_covid_provinces' : 国内数据_list,
                            'current_covid_national'  : 全球数据_list},ensure_ascii=False))