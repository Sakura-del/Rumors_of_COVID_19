# -*-coding:utf-8-*-
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import RumorInfo
from common.models import News
from django.db.models import Q


def getRumorDetails(request):
    try:
        title = request.params.get('title', None)
        tag = request.params.get('tag', None)
        if title:
            rumor = RumorInfo.objects.values().filter(title=title)
            rumor = list(rumor)

    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 2, "msg": "未知错误"})

    try:
        qs = News.objects.values('title', 'publish_time').order_by('-publish_time')
        conditions = [
                Q(title__contains=one) for one in title.split(' ') if one
        ]
        query = Q() | Q(title__contains=tag[0]) | Q(title__contains=tag[1])
        for condition in conditions:
            query |= condition
        qs = qs.filter(query)
        news_list = list(qs)

    except News.DoesNotExist:

       return JsonResponse({"ret": 1, "msg": "未查到相关信息"})

    try:
        qs = RumorInfo.objects.values('title', 'date',
                                      'cover', 'result', 'explain', 'tag').order_by('-date')
        conditions = [
                Q(title__contains=one) for one in title.split(' ') if one
        ]
        query = Q() | Q(title__contains=tag[0]) | Q(title__contains=tag[1])
        for condition in conditions:
            query |= condition

        qs = qs.filter(query)

    except RumorInfo.DoesNotExist:

       return JsonResponse({"ret": 1, "msg": "未查到相关信息"})

    rumors_list = list(qs)
    return JsonResponse({
        "ret": 0,
        "rumor": rumor,
        "news": news_list,
        "rumors": rumors_list,
        "total_news": len(news_list),
        "total_rumors": len(rumors_list)
    })


ActionHandler = {
    'get_rumors_details': getRumorDetails
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)

