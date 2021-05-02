from django.http import JsonResponse
import fasttext
from lib.handler import dispatcherBase
from common.models import RumorInfo, Question, Answer
from common.models import HeadlinesNews
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage
import jieba
from datetime import datetime


# Create your views here.
# 谣言初始化界面
def list_rumors(request):
    try:
        data = RumorInfo.objects.values('urlid','title', 'date', 'markstyle', 'result',
                                        'explain', 'tag', 'videourl', 'cover',
                                        'coverrect', 'coversqual').order_by('-date')[:10]
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询新闻
def get_news(request):
    try:
        # 新闻查询
        qs = HeadlinesNews.objects.values('title','date','link','summary').order_by('-date')
        # 获取用户的输入
        title = request.params['title']
        stopwords = [
            line.strip() for line in open(
                'search_stopwords.txt', "r", encoding='UTF-8').readlines()
        ]
        # 分词，获取用户输入的关键词
        keywords = jieba.cut(title)
        if keywords:
            conditions = [
                Q(title__contains=one) for one in keywords if one not in stopwords  # 去除停用词
            ]
            # 引用Q查询
            query = Q()
            for condition in conditions:
                query |= condition
            qs = qs.filter(query)
            # 获取页数
            pagenum = request.params['pagenum']
            # 每页谣言数量
            pagesize = request.params['pagesize']
            pgnt = Paginator(qs, pagesize)
            page = pgnt.page(pagenum)
            # 转换为可序列化的列表
            news = list(page)

            return JsonResponse({'ret': 0, 'retlist': news, 'total': len(news), 'msg': ''})

    except EmptyPage:
        # 数据查完
        return JsonResponse({'ret': 0, 'total_rumors': [], 'total': 0, "msg": "没有更多数据了"})

    except HeadlinesNews.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 查询谣言
def get_rumors(request):
    try:
        # 谣言查询
        qs = RumorInfo.objects.values('urlid','id', 'title', 'date', 'markstyle', 'result',
                                      'explain', 'tag', 'videourl', 'cover',
                                      'coverrect', 'coversqual').order_by('-date')
        # 获取用户的输入
        title = request.params['title']
        stopwords = [
            line.strip() for line in open(
                'search_stopwords.txt', "r", encoding='UTF-8').readlines()
        ]
        # 分词，获取用户输入的关键词
        keywords = jieba.cut(title)
        if keywords:
            conditions = [
                Q(title__contains=one) for one in keywords if one not in stopwords  # 去除停用词
            ]
            # 引用Q查询
            query = Q()
            for condition in conditions:
                query |= condition
            qs = qs.filter(query)
            # 获取页数
            pagenum = request.params['pagenum']
            # 每页谣言数量
            pagesize = request.params['pagesize']
            pgnt = Paginator(qs, pagesize)
            total = pgnt.count
            page = pgnt.page(pagenum)
            # 转换为可序列化的列表
            rumors = list(page)

    except EmptyPage:
        # 数据查完
        return JsonResponse({'ret': 0, 'total_rumors': [], 'total': 0, "msg": "没有更多数据了"})

    except RumorInfo.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    return JsonResponse(
        {'ret': 0, 'rumors': rumors, 'total_rumors': len(rumors), 'total':total,
         "msg": ""})


def get_news(request):
    try:
        # 获取用户的输入
        title = request.params['title']
        stopwords = [
            line.strip() for line in open(
                'search_stopwords.txt', "r", encoding='UTF-8').readlines()
        ]
        # 分词，获取用户输入的关键词
        keywords = jieba.cut(title)
        if keywords:
            conditions = [
                Q(title__contains=one) for one in keywords if one not in stopwords  # 去除停用词
            ]
            # 引用Q查询
            query = Q()
            for condition in conditions:
                query |= condition
            # 获取页数
            pagenum = request.params['pagenum']
            # 每页谣言数量
            pagesize = request.params['pagesize']
        # 相关新闻查询
        # 查询条件类似
        news = HeadlinesNews.objects.values(
            'title', 'date', 'link', 'field', 'summary'
        ).filter(query).order_by('-date')
        pgnt = Paginator(news, pagesize)
        total = pgnt.count
        page = pgnt.page(pagenum)
        news = list(page)

    except EmptyPage:
        return JsonResponse({'ret': 0, 'total_news': [], 'total': 0, "msg": "没有更多数据了"})

    except HeadlinesNews.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    return JsonResponse(
        {'ret': 0,  'retlist': news,  'total_news': len(news), 'total': total,
         "msg": ""})



# 查询当日谣言
def search_rumors(request):
    date = request.params['date']
    try:
        qs = RumorInfo.objects.values('title', 'result', 'date', 'abstract').distinct().filter(date=date)

        retlist = list(qs)

        return JsonResponse({"ret": 0, 'retlist': retlist})
    except RumorInfo.DoesNotExist:
        return JsonResponse({'ret': 0, 'msg': "信息获取失败"})


# 加载更多谣言
def list_more_rumors(request):
    try:
        qs = RumorInfo.objects.values('urlid','id', 'title', 'date', 'markstyle', 'result',
                                      'explain', 'tag', 'videourl', 'cover',
                                      'coverrect', 'coversqual').order_by('-date')
        # 页数
        pagenum = request.params['pagenum']
        # 每页谣言数量
        pagesize = request.params['pagesize']

        pgnt = Paginator(qs, pagesize)
        page = pgnt.page(pagenum)
        page = list(page)

        return JsonResponse({"ret": 0, "retlist": page, "total": len(page), "msg": ""})

    except EmptyPage:
        return JsonResponse({'ret': 0, 'retlist': [], 'total': 0, "msg": "没有更多数据了"})

    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 加载模型判断谣言
def judge_rumors(request):
    title = request.params['title']

    try:
        # 加载模型
        model_path = 'fasttext_model.pkl'
        clf = fasttext.load_model(model_path)
    except:
        print("模型加载失败")

    # 加载停用词表
    stopwords = [
        line.strip()
        for line in open('search_stopwords.txt', encoding='UTF-8').readlines()
    ]

    # 对输入的话进行分词处理
    words = jieba.cut(title)
    newstr = ""
    for word in words:
        if word not in stopwords:
            newstr += word + " "
    newstr = newstr[0:-1]  # 删除最后一个多余的空格

    try:
        pred_res = clf.predict(newstr)
        flag = pred_res[0][0]  # 预测的分类标签  __label__0表示假，即是谣言；__label__1表示真，即不是谣言
        flag = "true" if flag == "__label__1" else "false"
        prob = pred_res[1][0]  # 属于该类别的概率
    except:
        print("预测失败")

    return JsonResponse({"ret": 0, "flag": flag, "prob": prob, "msg": ""})

# 函数字典
ActionHandler = {
    'get_rumors': get_rumors,
    'list_rumors': list_rumors,
    'list_more_rumors': list_more_rumors,
    'judge_rumors': judge_rumors,
    'search_rumors': search_rumors,
    'get_news': get_news
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
