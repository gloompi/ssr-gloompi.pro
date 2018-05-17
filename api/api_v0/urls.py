from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from .views import *

router = DefaultRouter()
# router.register(r'news', NewsItemViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
  url(r'^', include(router.urls)),
  url(r'^auth/', views.obtain_auth_token, name='get_auth_token'),
]