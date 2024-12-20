from django.urls import path
from .views import RegisterView, LoginView,MyTokenObtainPairView,TokenRefreshView,protected_route,LogoutView,AdminLoginView


urlpatterns = [
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', protected_route, name='protected'),
    path('logout/',LogoutView.as_view(),name='logout'),

    path('admin-login/',AdminLoginView.as_view(),name='admin_login')
]