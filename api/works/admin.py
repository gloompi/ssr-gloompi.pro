from django.contrib import admin
from .models import WorkCategoryModel, TechModel, WorkModel, WorkPicModel
# Register your models here.
admin.site.register(WorkCategoryModel)
admin.site.register(TechModel)
admin.site.register(WorkModel)
admin.site.register(WorkPicModel)