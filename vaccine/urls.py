# -*-coding:utf-8-*-
from django.urls import path

from . import total
from . import trend
from . import views

app_name = 'vaccine'
urlpatterns = [
    path('total', total.dispatcher),
    path('trend', trend.dispatcher),
    path('views', views.dispatcher)
]