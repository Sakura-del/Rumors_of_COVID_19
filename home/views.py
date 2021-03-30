from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from common.models import RumorInfo


# Create your views here.
# 首页初始化界面
def index(request):
    data = RumorInfo.objects.values('id', 'title', 'date', 'markstyle', 'result',
                                    'explain', 'tag', 'videourl', 'cover',
                                    'coverrect', 'coversqual').order_by('date')[:5]
    
    data = list(data)

    return JsonResponse({"ret": 0, "data": data, "total": len(data)})


# 查询谣言
def getrumors(request):
    title = request.params['title']


def dispatcher(request):
    if request.method == 'GET':
        request.params = request.GET

    elif request.method in ['POST', 'PUT', 'DELETE']:
        # 根据接口，POST/PUT/DELETE 请求的消息体都是 json格式
        request.params = json.loads(request.body)

    action = request.params['action']
    if action == 'get_rumors':
        getrumors(request)
