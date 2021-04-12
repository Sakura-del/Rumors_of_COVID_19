# -*-coding:utf-8-*-
# 新闻页
from django.core.paginator import Paginator, EmptyPage
from django.http import HttpResponse, JsonResponse
import json
from common.models import CurrentCovidInternal
from lib.handler import dispatcherBase
from common.models import News
from common.models import HeadlinesNews
from django.db.models import Q, Count


# 列出疫苗新闻
# def list_vaccine_news(request):
#     try:
#         news_list = HeadlinesNews.objects.values(
#             'title', 'date', 'link', 'summary'
#         ).filter(title__contains='疫苗').order_by('-date')[:10]
#         data_list = list(news_list)
#         return JsonResponse({"ret": 0, "retlist": data_list, "total": len(news_list), "msg": ""})
#
#     except News.DoesNotExist:
#         return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 列出疫情新闻
# def list_covid_news(request):
#     try:
#         news_list = News.objects.values('title', 'category_cn', 'comment_num', 'publish_time', 'media_name',
#                                         'thumb_nail',
#                                         'url').exclude(title__contains='疫苗').order_by('-publish_time')[:5]
#         data_list = list(news_list)
#         return JsonResponse({"ret": 0, "news_list": data_list, "total": len(news_list), "msg": ""})
#
#     except News.DoesNotExist:
#         return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 列出相关标签的新闻
def list_field_news(request):
    try:
        # 接受用户想要查看的标签
        field = request.params['field']
        if field == '疫苗':
            news_list = HeadlinesNews.objects.values(
                'title', 'date', 'link', 'summary'
            ).filter(title__contains='疫苗').order_by('-date')[:10]
        else:
            news_list = HeadlinesNews.objects.values(
                'title', 'date', 'link', 'summary'
            ).exclude(title__contains='疫苗').filter(field__contains=field).order_by('-date')[:10]

        data_list = list(news_list)

        return JsonResponse({"ret": 0, "retlist": data_list, "total": len(news_list), "msg": ""})

    except News.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 列出疫情新闻
def list_covid_news(request):
    try:
        news_list = HeadlinesNews.objects.values(
            'title', 'date', 'link', 'summary'
        ).order_by('-date')[:10]
        data_list = list(news_list)
        return JsonResponse({"ret": 0, "retlist": data_list, "total": len(news_list), "msg": ""})

    except News.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


def list_fields(request):
    try:
        fields = HeadlinesNews.objects.values('field').annotate(count=Count('field'))

        fields = list(fields)
        retlist = []
        for data in fields:
            retlist.append(data['field'])

        return JsonResponse({"retlist": retlist})
    except HeadlinesNews.DoesNotExist:
        return JsonResponse({"ret": 0})


# 加载更多新闻
def load_more_news(request):
    try:
        # 接受用户想要查看的标签
        field = request.params['field']
        if field == '疫苗':
            qs = HeadlinesNews.objects.values(
                'title', 'date', 'link', 'summary'
            ).filter(title__contains='疫苗').order_by('-date')
        else:
            qs = HeadlinesNews.objects.values(
                'title', 'date', 'link', 'summary'
            ).exclude(title__contains='疫苗').filter(field__contains=field).order_by('-date')

        # 页数
        pagenum = request.params['pagenum']
        # 每页新闻数量
        pagesize = request.params['pagesize']

        pgnt = Paginator(qs, pagesize)
        page = pgnt.page(pagenum)
        page = list(page)

        return JsonResponse({"ret": 0, "retlist": page, "total": len(page), "msg": ""})

    except EmptyPage:
        return JsonResponse({'ret': 0, 'retlist': [], 'total': 0, "msg": "没有更多数据了"})

    except HeadlinesNews.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# def getNewsDetails(request):
#     try:
#         title = request.params.get('title', None)
#         if title:
#             news = News.objects.values().filter(title=title)
#
#             news = list(news)
#
#     except News.DoesNotExist:
#         return JsonResponse({"ret": 2, "msg": "未知错误"})
#
#     try:
#         qs = News.objects.values('title', 'publish_time', 'category_cn', 'tags').order_by('-publish_time')
#         conditions = [
#             Q(title__contains=one) for one in title.split(' ') if one
#         ]
#         query = Q()
#         for condition in conditions:
#             query |= condition
#         qs = qs.filter(query).exclude(title=title)
#
#     except News.DoesNotExist:
#
#         return JsonResponse({"ret": 1, "msg": "信息获取失败"})
#
#     retlist = list(qs)
#     return JsonResponse({
#         "ret": 0,
#         "news": news,
#         "retlist": retlist,
#         "total": len(retlist)
#     })


ActionHandler = {
    # 'get_news_details': getNewsDetails,
    # 'list_vaccine_news': list_vaccine_news,
    'list_covid_news': list_covid_news,
    'load_more_news': load_more_news,
    'list_fields': list_fields,
    'list_field_news': list_field_news
    # 'get_headline_news': get_headline_news
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
