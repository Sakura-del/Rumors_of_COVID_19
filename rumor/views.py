from django.http import JsonResponse
from lib.handler import dispatcherBase
from common.models import RumorInfo
from common.models import HeadlinesNews
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage
import jieba


# Create your views here.
# 谣言初始化界面
def list_rumors(request):
    try:
        data = RumorInfo.objects.values('title', 'date', 'markstyle', 'result',
                                        'explain', 'tag', 'videourl', 'cover',
                                        'coverrect', 'coversqual').order_by('-date')[:10]
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询谣言
def get_rumors(request):
    try:
        # 谣言查询
        qs = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                      'explain', 'tag', 'videourl', 'cover',
                                      'coverrect', 'coversqual').order_by('-date')
        # 获取用户的输入
        title = request.params['title']
        stopwords = [
            line.strip() for line in open(
                'cn_stopwords.txt', "r", encoding='UTF-8').readlines()
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
            rumors = list(page)

    except EmptyPage:
        # 数据查完
        return JsonResponse({'ret': 0, 'total_rumors': [], 'total': 0, "msg": "没有更多数据了"})

    except RumorInfo.DoesNotExist:
        # 数据获取成功
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    try:
        # 相关新闻查询
        # 查询条件类似
        news = HeadlinesNews.objects.values(
            'title', 'date', 'link', 'field', 'summary'
        ).filter(query).order_by('-date')
        pgnt = Paginator(news, pagesize)
        page = pgnt.page(pagenum)
        news = list(page)

    except EmptyPage:
        return JsonResponse({'ret': 0, 'total_news': [], 'total': 0, "msg": "没有更多数据了"})

    except HeadlinesNews.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    return JsonResponse(
        {'ret': 0, 'rumors': rumors, 'news': news, 'total_rumors': len(rumors), 'total_news': len(news),
         "msg": ""})


# 加载更多谣言
def list_more_rumors(request):
    try:
        qs = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                      'explain', 'tag', 'videourl', 'cover',
                                      'coverrect', 'coversqual').order_by('date')
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


ActionHandler = {
    'get_rumors': get_rumors,
    'list_rumors': list_rumors,
    'list_more_rumors': list_more_rumors
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
