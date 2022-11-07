from django.urls import path
from . import views

urlpatterns = [
    path('api/skp', views.SKPListView.as_view()),
]