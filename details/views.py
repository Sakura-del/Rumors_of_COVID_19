from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json


# Create your views here.
def details(request, rumors_id):
        return JsonResponse({'ret': 1, 'msg': '该谣言不存在！'})


