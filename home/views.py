from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import RumorInfo
from common.models import HeadlinesNews
from django.db.models import Q
import jieba


# Create your views here.
# 首页初始化界面
def listrumors(request):
    try:
        data = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                        'explain', 'tag', 'videourl', 'cover',
                                        'coverrect', 'coversqual').order_by('date')[:5]
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询谣言
def getrumors(request):
    # title = request.params['title']
    try:
        qs = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                      'explain', 'tag', 'videourl', 'cover',
                                      'coverrect', 'coversqual').order_by('-date')
        title = request.params.get('title', None)
        keywords = jieba.cut(title)
        if keywords:
            conditions = [
                Q(title__contains=one) for one in keywords if one
            ]
            query = Q()
            for condition in conditions:
                query |= condition
            qs = qs.filter(query)[:20]
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    #
    # rumors = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
    #                                 'explain', 'tag', 'videourl', 'cover',
    #                                 'coverrect', 'coversqual').filter(title__contains=title)

    rumors = list(qs)
    try:
        news = HeadlinesNews.objects.values(
            'title', 'date', 'link', 'field', 'summary'
        ).filter(query).order_by('-date')[:20]
    except HeadlinesNews.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    news = list(news)

    return JsonResponse(
        {'ret': 0, 'rumors': rumors, 'news': news, 'total_rumors': len(rumors), 'total_news': len(news)})


ActionHandler = {
    'get_rumors': getrumors,
    'list_rumors': listrumors,
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
