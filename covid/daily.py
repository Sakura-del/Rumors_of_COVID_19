# -*-coding:utf-8-*-
from lib.handler import dispatcherBase
from django.http import HttpResponse, JsonResponse
import json
import datetime
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase


def getDailyInternal(request):
    return 0


ActionHandler = {
    'get_daily_internal': getDailyInternal,
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)