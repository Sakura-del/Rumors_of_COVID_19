# -*-coding:utf-8-*-
# 当前疫情数据
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
import json
import datetime
from common.models import *
from lib.handler import dispatcherBase


# 列出当前国内疫情
def listCurrentInternal(request):
    data = CurrentCovidInternal.objects.all().filter(date=datetime.date.today()).first()
    data = model_to_dict(data)
    confirmedCount = data['confirmed']['count']
    confirmedIncr = data['confirmed']['incr']
    curedCount = data['cured']['count']
    curedIncr = data['cured']['incr']
    currentConfirmedCount = data['current_confirmed']['count']
    currentConfirmedIncr = data['current_confirmed']['incr']
    deadCount = data['death']['count']
    deadIncr = data['death']['incr']
    suspectedCount = data['confirmed']['count']
    suspectedCountIncr = data['confirmed']['incr']
    currentAsymCount = data['current_asym']['count']
    currentAsymIncr = data['current_asym']['incr']
    date = datetime.date.today()

    return JsonResponse({"confirmedCount": confirmedCount,
                         "confirmedIncr": confirmedIncr,
                         "curedCount": curedCount,
                         "curedIncr": curedIncr,
                         "currentConfirmedCount": currentConfirmedCount,
                         "currentConfirmedIncr": currentConfirmedIncr,
                         "deadCount": deadCount,
                         "deadIncr": deadIncr,
                         "currentAsymCount": currentAsymCount,
                         "currentAsymIncr": currentAsymIncr,
                         "suspectedCount": suspectedCount,
                         "suspectedCountIncr": suspectedCountIncr,
                         "date": date})


def listCurrentGlobal(request):
    data = CurrentCovidGlobal.objects.all().filter(date=datetime.date.today()).first()
    data = model_to_dict(data)
    confirmedCount = data['confirmed']['count']
    confirmedIncr = data['confirmed']['incr']
    curedCount = data['cured']['count']
    curedIncr = data['cured']['incr']
    currentConfirmedCount = data['current_confirmed']['count']
    currentConfirmedIncr = data['current_confirmed']['incr']
    deadCount = data['confirmed']['count']
    deadIncr = data['confirmed']['incr']
    date = datetime.date.today()

    return JsonResponse({"confirmedCount": confirmedCount,
                         "confirmedIncr": confirmedIncr,
                         "curedCount": curedCount,
                         "curedIncr": curedIncr,
                         "currentConfirmedCount": currentConfirmedCount,
                         "currentConfirmedIncr": currentConfirmedIncr,
                         "deadCount": deadCount,
                         "deadIncr": deadIncr,
                         "date": date})


def listCurrentProvinces(request):
    data = CurrentCovidProvinces.objects.values().filter(date=datetime.date.today())
    data = list(data)


    return JsonResponse({"ret": 0, "data": data, "total": len(data), "msg": ""})


def listCurrentNations(request):
    data = CurrentCovidNational.objects.values().filter(date=datetime.date.today())
    data = list(data)

    return JsonResponse({"ret": 0, "data": data, "total": len(data), "msg":""})


ActionHandler = {
    'list_current_internal': listCurrentInternal,
    'list_current_global': listCurrentGlobal,
    'list_current_provinces': listCurrentProvinces,
    'list_current_nations': listCurrentNations
}



def dispatcher(request):
    return dispatcherBase(request, ActionHandler)

