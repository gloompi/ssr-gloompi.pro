from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField

def upload_path(instance, filename):
    """
    Path to files
    :param instance:
    :param filename:
    :return:
    """
    return "articles/{0}".format(filename)

# Create your models here.
class ArticleCategoryModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')

  def __str__(self):
    return self.title

class ArticleModel(models.Model):
  PUBLISHED = True
  DRAFT = False

  TYPES = (
      (PUBLISHED, 'Опубликовано'),
      (DRAFT, 'Черновик'),
  )

  title = models.CharField(max_length=50, verbose_name='Title')
  cover_picture = models.ImageField(blank=True, upload_to=upload_path, verbose_name='Cover Picture')
  category = models.ManyToManyField(ArticleCategoryModel)
  content = RichTextField(verbose_name='Content')
  announce = RichTextField(verbose_name='Announce')
  author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, verbose_name='Author')
  meta_title = models.CharField(max_length=250, null=True, verbose_name='SEO Title')
  meta_description = models.TextField(null=True, verbose_name='SEO Description')
  date_added = models.DateTimeField(auto_now_add=True, verbose_name='Date added')
  is_published = models.BooleanField(choices=TYPES, default=DRAFT, verbose_name='Published?')

  class Meta:
    ordering = ['-date_added']

  def __str__(self):
    return str(self.title)

  def is_news_published(self):
    return self.is_published

  is_news_published.admin_order_field = 'Published'
  is_news_published.boolean = True
  is_news_published.short_description = 'Published?'