from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import RumorInfo
from django.db.models import *
from collections import *
import jieba


# Create your views here.
# 谣言可视化界面
def get_count_trend(request):
    try:
        data = RumorInfo.objects.values('date').annotate(rumor_count=Count('date')).order_by('date')
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "未查到相关信息"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 查询谣言
def get_tag_count(request):
    stopwords = [line.strip() for line in open('cn_stopwords.txt', encoding='UTF-8').readlines()]
    # 得到所有谣言
    rumor_text = ''
    rumor_list = RumorInfo.objects.values('abstract')

    # 将QuerySet转成列表
    rumor_list = list(rumor_list)
    # 去除空格
    for rumor in rumor_list:
        rumor_text += rumor['abstract'].replace(' ','')

    # jieba分词
    cut_rumors = jieba.cut(rumor_text.strip())
    tag_list = []
    for item in cut_rumors:
        if item not in stopwords:
            tag_list.append(item)

    # 用Counter字典计数
    c = Counter(tag_list)
    retlist = sorted(c.items(), key=lambda t: t[1], reverse=True)
    return JsonResponse({'ret': 0, 'retlist': retlist, 'total': len(retlist)})


# 操作处理字典
ActionHandler = {
    'get_count_trend': get_count_trend,
    'get_tag_count': get_tag_count,
}


# 统一事件处理函数
def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
