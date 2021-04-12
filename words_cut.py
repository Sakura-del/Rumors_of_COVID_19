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
from gensim.corpora import Dictionary
from gensim import models
import pandas as pd
from django_pandas.io import read_frame
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import pyLDAvis
import pyLDAvis.sklearn


# 分词
def cut_words_jieba():
    stopwords = [
        line.strip() for line in open(
            'cn_stopwords.txt', "r", encoding='UTF-8').readlines()
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
        for line in open('cn_stopwords.txt', encoding='UTF-8').readlines()
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
        for line in open('cn_stopwords.txt', encoding='UTF-8').readlines()
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
    qs = RumorInfo.objects.all()
    qs_df = read_frame(qs=qs, fieldnames=['abstract'])
    # print(qs_df)
    # print(qs_df.head())

    df = pd.DataFrame(qs_df['abstract'].astype(str))
    df['abstract_cutted'] = df['abstract'].apply(chinese_word_cut)
    # stopwords = []
    # with open("cn_stopwords.txt","r",encoding="UTF-8") as f:
    #     for line in f.readlines():
    #         stopwords.append(line.strip())

    stopwords = [
        line.strip()
        for line in open('cn_stopwords.txt', encoding='UTF-8').readlines()
    ]
    n_features = 2000
    tf_vectorizer = TfidfVectorizer(strip_accents='unicode',
                                    max_features=n_features,
                                    stop_words=stopwords,
                                    max_df=0.99,
                                    min_df=0.002)  #去除文档内出现几率过大或过小的词汇

    tf = tf_vectorizer.fit_transform(df.abstract_cutted)

    n_topics = 5

    lda = LatentDirichletAllocation(n_components=n_topics,
                                    max_iter=100,
                                    learning_method='online',
                                    learning_offset=50,
                                    random_state=0)
    lda.fit(tf)
    #显示主题数 model.topic_word_
    print(lda.components_)
    #几个主题就是几行 多少个关键词就是几列
    print(lda.components_.shape)
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


# save_data()
# cut_words_hanlp()
# cut_words_jieba()
cut_rumors_sklearn()