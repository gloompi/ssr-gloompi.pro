from django.db import models
from ckeditor.fields import RichTextField

def upload_path(instance, filename):
    """
    Path to files
    :param instance:
    :param filename:
    :return:
    """
    return "works/{0}".format(filename)

# Create your models here.
class WorkCategoryModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')

  def __str__(self):
    return str(self.title)

class TechModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')
  icon = models.CharField(max_length=50, verbose_name='Icon')

  def __str__(self):
    return str(self.title)

class WorkModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')
  cover_picture = models.ImageField(upload_to=upload_path, verbose_name='Cover Picture')
  content = RichTextField(verbose_name='Content')
  link = models.CharField(max_length=150, verbose_name='Link')
  bgcolor = models.CharField(max_length=25, verbose_name='Background Color')
  date_added = models.DateTimeField(auto_now_add=True, verbose_name='Date added')
  tech = models.ManyToManyField(TechModel)
  category = models.ManyToManyField(WorkCategoryModel)
  
  class Meta:
    ordering = ['-date_added']

  def __str__(self):
    return str(self.title)

class WorkPicModel(models.Model):
  pic = models.ImageField(upload_to=upload_path, verbose_name='Cover Picture')
  work = models.ForeignKey(
    WorkModel,
    on_delete=models.PROTECT,
    null=True,
    verbose_name='Work'
  )

  def __str__(self):
    return str(self.work)