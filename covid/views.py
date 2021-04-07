from django.shortcuts import render
from collections import defaultdict
from django.http import HttpResponse, JsonResponse
import json
from lib.handler import dispatcherBase
from common.models import TravelPolicy
from common.models import RiskLevel
from django.db.models import Q, Count
# Create your views here.


# 各省出行政策
def get_travel_policy_province(request):
    try:
        provinces = TravelPolicy.objects.values('province').annotate(count=Count('province'))
        provinces = list(provinces)

        return JsonResponse({"ret": 0, "provinces": provinces, "msg": ""})
    except TravelPolicy.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 各地区出行政策
def get_travel_policy_region(request):
    try:
        province = request.params['province']
        data_list = TravelPolicy.objects.values(
            'city','district','back_policy_list','leave_policy_list','stay_info_list'
        ).filter(province__contains=province)

        data_list = list(data_list)
        retlist = defaultdict(list)

        for data in data_list:
            retlist[data['city']]=data

        return JsonResponse({"ret": 0, "retlist": retlist, "msg": ""})
    except TravelPolicy.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 全国风险等级
def get_risk_level(request):
    try:
        retlist = RiskLevel.objects.values()

        retlist = list(retlist)

        return JsonResponse({"ret": 0, "retlist": retlist, "msg": ""})
    except RiskLevel.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


ActionHandler = {
    'get_travel_policy_province': get_travel_policy_province,
    'get_travel_policy_region':get_travel_policy_region,
    'get_risk_level': get_risk_level
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)