import os
import re
import json
import requests
from threading import Thread


if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')


def QQ_fact_QA_func():
    qa_list = []

    def One_page_func(cursor):
        url = 'https://vp.fact.qq.com/loadmoreHot'
        params = {'cursor': cursor if cursor != 0 else '6790215113530079597'}
        response = requests.get(url=url, params=params)
        response.encoding = 'utf-8'

        result = response.text.replace(r'\n', '').replace('\\', '')
        result = json.loads(re.findall(r'callback\("(.*)"\)', result)[0])['data']
        for question in result['oriCommList']:
            try:
                question_id = question['id']
                question_content = question['content']

                answer_list = result['repCommList'][question_id]
                answer_content_list = []
                for answer in answer_list:
                    answer_content_list.append(re.findall(r'^(.*?)[http]', answer['content'] + 'http')[0])

                qa_list.append({'question'   : question_content,
                                'answer_list': answer_content_list})
            except:
                pass

        return result['last']

    cursor = One_page_func(0)
    for i in range(1,500):
        cursor = One_page_func(cursor)

    with open('data_source/data_from_creeper/较真网问答.json', 'w', encoding='utf-8') as file:
        file.write(json.dumps(qa_list, ensure_ascii=False))



func_list = [QQ_fact_QA_func]