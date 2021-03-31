# -*-coding:utf-8-*-
# 新闻详情
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import News
from django.db.models import Q


def getNewsDetails(request):
    try:
        title = request.params.get('title', None)
        if title:
            news = News.objects.values().filter(title=title)

            news = list(news)

    except News.DoesNotExist:
        return JsonResponse({"ret": 2, "msg": "未知错误"})

    try:
        qs = News.objects.values('title', 'publish_time', 'category_cn','tags').order_by('-publish_time')
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
    'get_news_details': getNewsDetails
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)