# -*-coding:utf-8-*-
from django.http import JsonResponse
import json


def dispatcherBase(request, ActionHandler):
    if request.method == 'GET':
        request.params = request.GET

    elif request.method in ['POST', 'PUT', 'DELETE']:
        # 根据接口，POST/PUT/DELETE 请求的消息体都是 json格式
        print(request.body.decode())
        request.params = json.loads(request.body.decode())

    action = request.params['action']
    if action in ActionHandler:
        handlerFunc = ActionHandler[action]
        return handlerFunc(request)
    else:
        return JsonResponse({'ret': 1, 'msg': 'action参数错误'})

