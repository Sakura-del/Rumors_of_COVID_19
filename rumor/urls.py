from django.urls import path

from . import views
from . import shows

app_name = 'rumor'
urlpatterns = [
    path('views', views.dispatcher),
    path('shows', shows.dispatcher),
]