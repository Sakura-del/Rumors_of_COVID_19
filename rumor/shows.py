from django.http import HttpResponse, JsonResponse
from pyhanlp import HanLP

from lib.handler import dispatcherBase
from common.models import RumorInfo
from django.db.models import *
from collections import *
import jieba

# Create your views here.
# 谣言可视化界面

# 加载停用词表
stopwords = [
    line.strip()
    for line in open('cn_stopwords.txt', encoding='UTF-8').readlines()
]

# 中国各省份名
province_list = ['天津', '北京', '河北', '山西', '吉林', '辽宁', '内蒙古', '黑龙江', '上海', '江苏', '浙江', '福建', '安徽', '河南', '江西', '山东', '湖北',
                 '湖南', '广东', '海南', '广西', '重庆', '贵州', '云南', '四川', '西藏', '陕西', '青海', '甘肃', '宁夏', '新疆','澳门','香港','台湾']


# 数量变化趋势
def get_count_trend(request):
    try:
        data = RumorInfo.objects.values('date').annotate(rumor_count=Count('date')).order_by('date')
    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    data = list(data)

    return JsonResponse({"ret": 0, "retlist": data, "total": len(data)})


# 提取地名
def cut_words_hanlp(rumor_text):
    # 去除空格
    rumor_text = rumor_text.strip()

    # 调用hanlp进行词性分析
    segment = HanLP.newSegment().enablePlaceRecognize(True)
    cut_rumors = segment.seg(rumor_text)

    out_list = []
    for item in cut_rumors:
        if item.word not in stopwords:
            item = str(item).split('/')
            if item[1] == 'ns':
                if item[0] != '\t' and item[0] != '钟南山':
                    out_list.append(item[0])

    location_list = []
    for location in out_list:
        if '省' in location:
            location_list.append(location.replace('省',''))
        elif location in province_list:
            location_list.append(location)
        elif '市' in location:
            if '北京' in location:
                location_list.append('北京')
            elif '上海' in location:
                location_list.append('上海')
            elif '重庆' in location:
                location_list.append('重庆')
            elif '天津' in location:
                location_list.append('天津')
            else:
                location_list.append(location)
        else:
            location_list.append(location+'市')

    return (location_list)


# 获取谣言地点及时间变化
def get_location_date_trend(request):
    try:
        # 获取日期及摘要信息,按时间排序
        qs = RumorInfo.objects.values('date', 'abstract').order_by('date')

    except RumorInfo.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    #
    # try:
    #     date = RumorInfo.objects.values('date').distinct().order_by('date')
    #
    # except RumorInfo.DoesNotExist:
    #     return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    #
    # date_list = list(date)
    retlist = defaultdict(list)

    # 将QuerySet转成列表
    data_list = list(qs)
    for data in data_list:
        cut_words = cut_words_hanlp(data['abstract'])
        if len(cut_words) == 0:
            pass
        else:
            retlist[str(data['date'])].extend(cut_words)

    return JsonResponse({"ret": 0, "retlist": retlist, "msg": ""})


# 查询谣言
def get_tag_count(request):
    # 得到所有谣言
    rumor_text = ''
    rumor_list = RumorInfo.objects.values('abstract')

    # 将QuerySet转成列表
    rumor_list = list(rumor_list)
    # 去除空格
    for rumor in rumor_list:
        rumor_text += rumor['abstract'].replace(' ', '')

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
    'get_location_date_trend': get_location_date_trend
}


# 统一事件处理函数
def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
