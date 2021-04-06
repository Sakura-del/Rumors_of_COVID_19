# -*-coding:utf-8-*-
# 新闻页
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import News
from django.db.models import Q


# 列出疫苗新闻
def list_vaccine_news(request):
    try:
        news_list = News.objects.values('title', 'category_cn', 'comment_num', 'publish_time', 'media_name',
                                        'thumb_nail',
                                        'url').filter(title__contains='疫苗').order_by('-publish_time')[:5]
        data_list = list(news_list)
        return JsonResponse({"ret": 0, "news_list": data_list, "total": len(news_list), "msg": ""})

    except News.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})


# 列出疫情新闻
def list_covid_news(request):
    try:
        news_list = News.objects.values('title', 'category_cn', 'comment_num', 'publish_time', 'media_name',
                                        'thumb_nail',
                                        'url').exclude(title__contains='疫苗').order_by('-publish_time')[:5]
        data_list = list(news_list)
        return JsonResponse({"ret": 0, "news_list": data_list, "total": len(news_list), "msg": ""})

    except News.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})


def getNewsDetails(request):
    try:
        title = request.params.get('title', None)
        if title:
            news = News.objects.values().filter(title=title)

            news = list(news)

    except News.DoesNotExist:
        return JsonResponse({"ret": 2, "msg": "未知错误"})

    try:
        qs = News.objects.values('title', 'publish_time', 'category_cn', 'tags').order_by('-publish_time')
        conditions = [
            Q(title__contains=one) for one in title.split(' ') if one
        ]
        query = Q()
        for condition in conditions:
            query |= condition
        qs = qs.filter(query).exclude(title=title)

    except News.DoesNotExist:

        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})

    retlist = list(qs)
    return JsonResponse({
        "ret": 0,
        "news": news,
        "retlist": retlist,
        "total": len(retlist)
    })


ActionHandler = {
    'get_news_details': getNewsDetails,
    'list_vaccine_news':list_vaccine_news,
    'list_covid_news': list_covid_news
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
