from django.urls import path
from . import views

urlpatterns = [
    path('api/skp', views.SKPListView.as_view()),
    path('skp/search', views.SearchSKP.as_view()),
    path('skp/cities/search', views.SearchCities.as_view()),
]