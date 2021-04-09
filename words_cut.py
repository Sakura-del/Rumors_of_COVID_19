# -*-coding:utf-8-*-
# 独立使用django的model
import sys
import os
import django
import json
pwd = os.path.dirname(os.path.realpath(__file__))
sys.path.append(pwd + "../")
# 找到根目录（与工程名一样的文件夹）下的settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Rumor_of_COVID_19.settings')

django.setup()
from common.models import RumorInfo
import jieba
import jieba.posseg as psg
from collections import Counter
from pyhanlp import *


# 分词
def cut_words_jieba():
    stopwords = [line.strip() for line in open('cn_stopwords.txt',encoding='UTF-8').readlines()]
    rumor_text = ''
    rumor_list = RumorInfo.objects.values('abstract')

    rumor_list = list(rumor_list)
    for rumor in rumor_list:
        rumor_text += rumor['abstract'].strip()

    cut_rumors = psg.lcut(rumor_text.strip())
    out_list = []
    for item in cut_rumors:
        if item.word not in stopwords:
            if item.flag == 'ns':
                if item.word != '\t' and item.word != '钟南山':
                    out_list.append(item.word)

    counter = Counter(out_list)
    print(counter)


def cut_words_hanlp():
    stopwords = [line.strip() for line in open('cn_stopwords.txt',encoding='UTF-8').readlines()]
    rumor_text = ''
    rumor_list = RumorInfo.objects.values('abstract')
    rumor_list = list(rumor_list)

    for rumor in rumor_list:
        rumor_text += rumor['abstract'].strip()

    segment = HanLP.newSegment().enablePlaceRecognize(True)
    cut_rumors = segment.seg(rumor_text)

    out_list = []
    for item in cut_rumors:
        if item.word not in stopwords:
            item = str(item).split('/')
            if item[1]== 'ns':
                if item[0] != '\t' and item[0] != '钟南山':
                    out_list.append(item[0])

    counter = Counter(out_list)
    print(counter)

cut_words_hanlp()
cut_words_jieba()