from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('rejestracja/klient/verify', views.index, name='activate-account'),
    path('api/rejestracja/klient', views.SignUpView.as_view()),
    path('api/rejestracja/klient/verify', views.VerifyView.as_view()),
    path('api/logowanie', views.MyTokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout', views.LogoutView.as_view()),
    path('api/user/<pk>', views.UserView.as_view()),
    path('api/skp', views.SKPListView.as_view()),
]