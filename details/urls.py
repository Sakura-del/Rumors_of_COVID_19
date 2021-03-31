from django.urls import path

from . import news
from . import rumors

app_name = 'details'
urlpatterns = [
    path('news', news.dispatcher),
    path('rumors', rumors.dispatcher),
]