# -*-coding:utf-8-*-
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import CurrentVaccinations
from common.models import CurrentVaccinesNations
from django.db.models import Q


# 获取当前疫苗接种情况
def getCurrentVaccinations(request):
    try:
        data = CurrentVaccinations.objects.values()

        data = list(data)

        return JsonResponse({
            "ret": 0,
            "retlist": data,
            "total": len(data),
            "msg": ""
        })
    except CurrentVaccinations.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 获取当前各国疫苗接种情况
def getCurrentVaccinesNations(request):
    try:
        data = CurrentVaccinesNations.objects.values().order_by('-date')

        data = list(data)

        return JsonResponse({
            "ret": 0,
            "retlist": data,
            "total": len(data),
            "msg": ""
        })
    except CurrentVaccinesNations.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})



ActionHandler = {
    "get_current_vaccinations": getCurrentVaccinations,
    "get_current_vaccines_nations": getCurrentVaccinesNations
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
