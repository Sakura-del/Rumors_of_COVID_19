from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import RumorInfo
from django.db.models import Q


# Create your views here.
# 谣言初始化界面
def list_rumors(request):
    try:
        data = RumorInfo.objects.values('id', 'title', 'date', 'markstyle',
                                        'result', 'explain', 'tag', 'videourl',
                                        'cover', 'coverrect',
                                        'coversqual').order_by('-date')[:5]
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询谣言
def get_rumors(request):
    title = request.params['title']
    # qs = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
    #                               'explain', 'tag', 'videourl', 'cover',
    #                               'coverrect', 'coversqual').order_by('-date')
    # keywords = request.params.get('title', None)
    # if keywords:
    #     conditions = [
    #         Q(title__contains=one) for one in keywords.split(' ') if one
    #     ]
    #     query = Q()
    #     for condition in conditions:
    #         query |= condition
    #     qs = qs.filter(query)

    rumors = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                    'explain', 'tag', 'videourl', 'cover',
                                    'coverrect', 'coversqual').filter(title__contains=title)

    rumors = list(qs)

    return JsonResponse({'ret': 0, 'retlist': rumors, 'total': len(rumors)})


ActionHandler = {
    'get_rumors': get_rumors,
    'list_rumors': list_rumors,
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
