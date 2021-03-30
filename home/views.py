from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import RumorInfo


# Create your views here.
# 首页初始化界面
def listrumors(request):
    data = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                    'explain', 'tag', 'videourl', 'cover',
                                    'coverrect', 'coversqual').order_by('date')[:5]
    
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询谣言
def getrumors(request):
    title = request.params['title']
    rumors = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                    'explain', 'tag', 'videourl', 'cover',
                                    'coverrect', 'coversqual').filter(title__contains=title)

    rumors = list(rumors)

    return JsonResponse({'ret': 0, 'retlist': rumors, 'total': len(rumors)})


ActionHandler = {
    'get_rumors': getrumors,
    'list_rumors': listrumors,
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)

