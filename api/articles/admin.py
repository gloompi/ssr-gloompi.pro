from django.contrib import admin
from .models import ArticleModel, ArticleCategoryModel
# Register your models here.
admin.site.register(ArticleModel)
admin.site.register(ArticleCategoryModel)