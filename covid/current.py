# -*-coding:utf-8-*-
from django.forms.models import model_to_dict

from lib.handler import dispatcherBase
from django.http import HttpResponse, JsonResponse
import json
import datetime
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase


def listCurrentInternal(request):
    data = CurrentCovidInternal.objects.values().filter(date=datetime.date.today())
    data = model_to_dict(data)
    confirmedCount = data['confirmed']['count']
    confirmedIncr = data['confirmed']['incr']
    curedCount = data['cured']['count']
    curedIncr = data['cured']['incr']
    currentConfirmedCount = data['current_confirmed']['count']
    currentConfirmedIncr = data['current_confirmed']['incr']
    deadCount = data['confirmed']['count']
    deadIncr = data['confirmed']['incr']
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




ActionHandler = {
    'list_current_internal': listCurrentInternal,
}



def dispatcher(request):
    return dispatcherBase(request, ActionHandler)

