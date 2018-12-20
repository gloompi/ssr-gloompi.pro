from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from .views import (
  WorksView, 
  WorksCategoryView, 
  WorkPicsView, 
  TechView,
  SkillsView,
  SkillListView,
  ArticleView,
  ArticlesView,
  ArticleCategoryView,
  AboutView
)

router = DefaultRouter()
# router.register(r'news', NewsItemViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
  url(r'^', include(router.urls)),
  url(r'^about/$', AboutView.as_view(), name='about'),
  url(r'^article-categories/$', ArticleCategoryView.as_view(), name='article-categories'),
  url(r'^articles/$', ArticlesView.as_view(), name='articles'),
  url(r'^articles/{pk}/$', ArticleView.as_view(), name='article'),
  url(r'^skill-categories/$', SkillListView.as_view(), name='skill-categories'),
  url(r'^skills/$', SkillsView.as_view(), name='skills'),
  url(r'^works/$', WorksView.as_view(), name='works'),
  url(r'^work-techs/$', TechView.as_view(), name='techs'),
  url(r'^work-categories/$', WorksCategoryView.as_view(), name='work-cateogories'),
  url(r'^work-pics/$', WorkPicsView.as_view(), name='pics'),
]