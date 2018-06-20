from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class SkillListModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')

  def __str__(self):
    return str(self.title)

class SkillModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')
  knowledge = models.IntegerField(default=0, verbose_name='Percents')
  category = models.ForeignKey(
    SkillListModel,
    on_delete=models.PROTECT,
    null=True,
    related_name='category_of_skill',
    verbose_name='Category'
  )

  def __str__(self):
    return str(self.title)