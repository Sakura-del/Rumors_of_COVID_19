# -*-coding:utf-8-*-
from lib.handler import dispatcherBase
from django.http import HttpResponse, JsonResponse
import json
import datetime
from common.models import *
from lib.handler import dispatcherBase


# 获取每日国内数据
def getDailyInternal(request):
    try:
        data = InternalDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except InternalDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取全球每日数据
def getDailyGlobal(request):
    try:
        data = GlobalDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except GlobalDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取俄罗斯每日数据
def getDailyRussia(request):
    try:
        data = RussiaDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except RussiaDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})

def getDailyBrazil(request):
    try:
        data = BrazilDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except BrazilDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取德国每日数据
def getDailyGermany(request):
    try:
        data = GermanyDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except GermanyDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取意大利每日数据
def getDailyItaly(request):
    try:
        data = ItalyDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except ItalyDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取法国每日数据
def getDailyFrance(request):
    try:
        data = FranceDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except FranceDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取美国每日数据
def getDailyUS(request):
    try:
        data = USDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except USDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取英国每日数据
def getDailyUK(request):
    try:
        data = UKDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except UKDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 获取西班牙每日数据
def getDailySpain(request):
    try:
        data = SpainDailyData.objects.values()
        data = list(data)

        return JsonResponse({
            "ret": 0,
            "data": data,
            "total": len(data),
            "msg": ""
        }
        )

    except SpainDailyData.DoesNotExist:
        return JsonResponse({"ret": 0, "msg": "未查到相关信息"})


# 函数字典
ActionHandler = {
    'get_daily_internal': getDailyInternal,
    'get_daily_global': getDailyGlobal,
    'get_daily_russia': getDailyRussia,
    'get_daily_brazil': getDailyBrazil,
    'get_daily_germany': getDailyGermany,
    'get_daily_italy': getDailyItaly,
    'get_daily_france': getDailyFrance,
    'get_daily_us': getDailyUS,
    'get_daily_uk': getDailyUK,
    'get_daily_spain': getDailySpain
}


# 事件处理函数
def dispatcher(request):
    return dispatcherBase(request, ActionHandler)