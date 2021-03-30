from django.urls import path

from . import views

app_name = 'details'
urlpatterns = [
    path('<int: rumors_id>', views.details, name='details'),
]