# -*-coding:utf-8-*-
from django.urls import path

from . import current
from . import daily
from . import news

app_name = 'covid'
urlpatterns = [
    path('current', current.dispatcher),
    path('daily', daily.dispatcher),
    path('newes', news.dispatcher),
]