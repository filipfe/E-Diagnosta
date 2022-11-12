from django.urls import path
from . import views

urlpatterns = [
    path('api/skp', views.SKPListView.as_view()),
    path('api/skp/search', views.SearchSKP.as_view()),
    path('api/skp/cities/search', views.SearchCities.as_view()),
]