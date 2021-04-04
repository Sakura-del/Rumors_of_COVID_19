from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import RumorInfo
from django.db.models import *
from collections import *


# Create your views here.
# 谣言可视化界面
def get_count_trend(request):
    try:
        data = RumorInfo.objects.values('date').annotate(rumor_count=Count('date')).order_by('date')
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询谣言
def get_tag_count(request):
    qs = RumorInfo.objects.values('tag')
    rumors = list(qs)

    tag_list = []
    for rumor in rumors:
        if len(rumor) == 1:
            tag_list.append(rumor['tag'][0])
        else:
            tag_list.append(rumor['tag'][0])
            tag_list.append(rumor['tag'][1])
    c = Counter(tag_list)
    retlist = sorted(c.items(), key=lambda t: t[1], reverse=True)
    return JsonResponse({'ret': 0, 'retlist': retlist, 'total': len(rumors)})


ActionHandler = {
    'get_count_trend': get_count_trend,
    'get_tag_count': get_tag_count,

}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
