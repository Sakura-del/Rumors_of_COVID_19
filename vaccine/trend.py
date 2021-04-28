# -*-coding:utf-8-*-
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import TrendVaccinesInternal
from common.models import PerTrendVaccinesNations
from common.models import TotalTrendVaccinesNations
from django.db.models import Q


# 各国疫苗趋势
def getTrendNations(request):
    try:
        per_data_list = PerTrendVaccinesNations.objects.values()

        per_data_list = list(per_data_list)
    except PerTrendVaccinesNations.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    try:
        total_data_list = TotalTrendVaccinesNations.objects.values()

        total_data_list = list(total_data_list)
    except PerTrendVaccinesNations.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    return JsonResponse({
        "ret": 0,
        "perHundredTrend": per_data_list,
        "totalTrend": total_data_list,
        "total_per": len(per_data_list),
        "total": len(total_data_list),
        "msg": ""
    })


# 国内疫苗趋势
def getTrendInternal(request):
    try:
        data_list = TrendVaccinesInternal.objects.values()

        data_list = list(data_list)
    except TrendVaccinesInternal.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})

    return JsonResponse({
        "ret": 0,
        "retlist": data_list,
        "total": len(data_list),
        "msg": ""
    })


# 函数字典
ActionHandler = {
    'get_trend_nations': getTrendNations,
    "get_trend_internal": getTrendInternal
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)