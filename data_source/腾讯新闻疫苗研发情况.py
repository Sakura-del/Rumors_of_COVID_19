import os
import json
import requests



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def QQ_news_vaccine_development_status_func():
    url = 'https://v.qq.com/cache/wuji_public/object'
    params = {  'appid'     :'yimiao',
                'schemaid'  :'vaccine_progress_foreign',
                'schemakey' :'1091e06cbb704b40963accd816770461',
                'size'      :500,
                'sort'      :'rank',
                'order'     :'asc',}
    response = requests.get(url = url,params = params).json()
    result  = response['data']


    vaccine_development_status_list = []
    progress_comparison_dict = {'1':'临床II期','2':'临床II/III期','3':'临床III期','4':'上市'}
    vaccine_type_dict = {'1':'灭活疫苗','2':'腺病毒载体疫苗','3':'核酸疫苗','4':'重组蛋白疫苗'}
    for data in result:
        vaccine_development_status_dict = { 'organization_name' : data['devunit'],
                                            'progress'          : progress_comparison_dict[data['progress']],
                                            'vaccine_name'      : data['vaccine_name'],
                                            'vaccine_type'      : vaccine_type_dict[data['progress']]}
        vaccine_development_status_list.append(vaccine_development_status_dict)


    with open('data_source/data_from_creeper/腾讯新闻疫苗研发情况.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(vaccine_development_status_list,ensure_ascii = False))



func_list = [QQ_news_vaccine_development_status_func]