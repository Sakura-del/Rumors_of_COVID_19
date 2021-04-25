# -*-coding:utf-8-*-
# 独立使用django的model
import re
import sys
import os

import PIL
import django
import csv
import json

import numpy as np
import wordcloud
from django.db import transaction

pwd = os.path.dirname(os.path.realpath(__file__))
sys.path.append(pwd + "../")
# 找到根目录（与工程名一样的文件夹）下的settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Rumor_of_COVID_19.settings')

django.setup()
from common.models import RumorInfo, HeadlinesNews, Question, Answer,NLPrumors
import jieba
import jieba.posseg as psg
from collections import Counter
from pyhanlp import *
from gensim.corpora import Dictionary
from gensim import models
import pandas as pd
from django_pandas.io import read_frame
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import pyLDAvis
import pyLDAvis.sklearn
from datetime import datetime
import matplotlib.pyplot as plt


# 分词
def cut_words_jieba():
    stopwords = [
        line.strip() for line in open(
            'lda_stopwords.txt', "r", encoding='UTF-8').readlines()
    ]
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


# 使用hanlp提取地名
def cut_words_hanlp():
    # 加载停用词表
    stopwords = [
        line.strip()
        for line in open('lda_stopwords.txt', encoding='UTF-8').readlines()
    ]
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
            if item[1] == 'ns':
                if item[0] != '\t' and item[0] != '钟南山':
                    out_list.append(item[0])

    counter = Counter(out_list)
    print(counter)


def save_data():
    stopwords = [
        line.strip()
        for line in open('lda_stopwords.txt', encoding='UTF-8').readlines()
    ]
    rumor_text = ''
    rumor_list = RumorInfo.objects.values('abstract')
    rumor_list = list(rumor_list)

    for rumor in rumor_list:
        rumor_text += rumor['abstract'].strip()

    with open("谣言数据.txt", "w", encoding="UTF-8") as f:
        f.write(rumor_text)
        f.close()

    words_list = []
    with open("谣言数据.txt", "r", encoding="UTF-8") as f:
        for line in f:
            words = []
            for word in jieba.cut(line):
                if word not in stopwords:
                    words.append(word)
            words_list.append(words)

    print(words_list)

    dictionary = Dictionary(words_list)
    print(dictionary)
    corpus = [dictionary.doc2bow(words) for words in words_list]
    lda = models.ldamodel.LdaModel(corpus=corpus,
                                   id2word=dictionary,
                                   num_topics=5)
    for i in range(5):
        print("topic :" + str(i))
        print(print(lda.print_topics(i)))
    print(lda.inference(corpus))


def chinese_word_cut(mytext):
    return ' '.join(jieba.cut(mytext))


def cut_rumors_sklearn():
    qs = NLPrumors.objects.all()
    # 将QuerySet转换成dataframe
    qs_df = read_frame(qs=qs, fieldnames=['abstract'])

    # 取出abstract列的数据
    df = pd.DataFrame(qs_df['abstract'].astype(str))
    # 分词
    df['abstract_cutted'] = df['abstract'].apply(chinese_word_cut)

    # 加载停用词
    stopwords = [
        line.strip()
        for line in open('lda_stopwords.txt', encoding='UTF-8').readlines()
    ]
    n_features = 2000
    tf_vectorizer = TfidfVectorizer(strip_accents='unicode',
                                    max_features=n_features,
                                    stop_words=stopwords,
                                    max_df=0.99,
                                    min_df=0.002)  #去除文档内出现几率过大或过小的词汇

    print(tf_vectorizer)
    tf = tf_vectorizer.fit_transform(df.abstract_cutted)
    print(tf)
    n_topics = 5

    lda = LatentDirichletAllocation(n_components=n_topics,
                                    max_iter=100,
                                    learning_method='online',
                                    learning_offset=50,
                                    random_state=0)
    lda.fit(tf)
    #显示主题数 model.topic_word_
    # print(lda.components_)
    #几个主题就是几行 多少个关键词就是几列
    # print(lda.components_.shape)
    #定义好函数之后 暂定每个主题输出前20个关键词
    n_top_words = 20
    tf_feature_names = tf_vectorizer.get_feature_names()
    #调用函数
    print_top_words(lda, tf_feature_names, n_top_words)

    data = pyLDAvis.sklearn.prepare(lda, tf, tf_vectorizer)
    pyLDAvis.save_html(data, 'lda.html')


def print_top_words(model, tf_feature_names, n_top_words):
    for topic_idx, topic in enumerate(
            model.components_):  # lda.component相当于model.topic_word_
        print('Topic #%d:' % topic_idx)
        print(' '.join([
            tf_feature_names[i] for i in topic.argsort()[:-n_top_words - 1:-1]
        ]))
        print("")


def save_rumors():
    # qs = RumorInfo.objects.values('title','abstract', 'markstyle')
    # qs = list(qs)
    # rows = []
    # for data in qs:
    #     row = []
    #     row.append(data['title'])
    #     row.append(data['abstract'])
    #     if data['markstyle'] == 'fake':
    #         row.append('1')
    #     elif data['markstyle'] == 'true':
    #         row.append('2')
    #     else:
    #         row.append('3')
    #     rows.append(row)
    # print(rows)
    # with open("谣言训练.csv", "w", encoding="utf-8-sig", newline='') as f:
    #     writer = csv.writer(f)
    #     writer.writerow(['title', 'abstract','mark'])
    #     writer.writerows(rows)

    # qs = HeadlinesNews.objects.values('title', 'summary')
    # qs = list(qs)
    # rows = []
    # for data in qs:
    #     row = []
    #     row.append(data['title'])
    #     row.append(data['summary'])
    #     row.append(1)
    #     rows.append(row)
    # print(rows)
    # with open("新闻.csv", "w", encoding="utf-8-sig", newline='') as f:
    #     writer = csv.writer(f)
    #     writer.writerow(['title', 'abstract', 'mark'])
    #     writer.writerows(rows)

    filename = 'data_source/data_from_creeper/丁香医生谣言.json'
    with open(filename, "r", encoding='utf-8') as f23:
        rumors = json.load(f23)

    rows = []
    for data in rumors:
        row = []
        row.append(data['title'])
        row.append(data['mainSummary'])
        if data['rumorType'] == 0:
            row.append('1')
        elif data['rumorType'] == 1:
            row.append('2')
        else:
            row.append('3')
        rows.append(row)
    with open("丁香医生.csv", "w", encoding="utf-8-sig", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['title', 'abstract', 'mark'])
        writer.writerows(rows)


def import_data():
    with open('data_source/data_from_creeper/较真网问答.json',
              'r',
              encoding='UTF-8') as f:
        data_list = json.load(f)

    Question.objects.all().delete()
    Answer.objects.all().delete()
    answer_list = []
    question_list = []

    for data in data_list:
        question_list.append(data['question'])
        answer_list.append(data['answer_list'])

    with transaction.atomic():
        for index, data in enumerate(question_list):
            question = Question.objects.create(
                question=data,
                question_text=data,
                pub_date=datetime.now(),
            )
            Answer.objects.create(
                questionid=question,
                answer=answer_list[index][0],
                answer_date=datetime.now(),
            )


def get_tag_count():
    # 加载停用词表
    stopwords = [
        line.strip()
        for line in open('lda_stopwords.txt', encoding='UTF-8').readlines()
    ]

    # 得到所有谣言
    rumor_text = ''
    rumor_list = RumorInfo.objects.values('abstract')

    # 将QuerySet转成列表
    rumor_list = list(rumor_list)
    # 去除空格
    for rumor in rumor_list:
        rumor_text += rumor['abstract'].replace(' ', '')

    # jieba分词
    cut_rumors = jieba.cut(rumor_text.strip())
    tag_list = []
    for item in cut_rumors:
        if item not in stopwords:
            if re.match(r"[\u4e00-\u9fa5]", item) is not None:
                tag_list.append(item)

    # 用Counter字典计数
    c = Counter(tag_list)
    #
    # retlist = dict()
    # index = 0
    # for key,value in c:
    #     retlist['key'] = value
    #     index +=1
    #     if index >=200:
    #         break

    image = PIL.Image.open('病毒.png')
    mask_image = np.array(image)
    wc = wordcloud.WordCloud(font_path="C:/Windows/Fonts/STXINWEI.TTF",
                             max_words=200,
                             width=512,
                             height=512,
                             mask=mask_image,
                             background_color='white',
                             repeat=False,
                             mode='RGBA')
    word_cloud = wc.generate_from_frequencies(c)
    word_cloud.to_file('词云图.png')
    plt.imshow(word_cloud,interpolation='bilinear')
    plt.axis('off')
    plt.show()


# save_data()
# cut_words_hanlp()
# cut_words_jieba()
# cut_rumors_sklearn()
# save_rumors()
import_data()
# get_tag_count()