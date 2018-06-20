from django.db import models
from ckeditor.fields import RichTextField

def upload_path(instance, filename):
    """
    Path to files
    :param instance:
    :param filename:
    :return:
    """
    return "about/{0}".format(filename)

# Create your models here.
class AboutModel(models.Model):
  title = models.CharField(max_length=50, verbose_name='Title')
  cover_picture = models.ImageField(blank=True, upload_to=upload_path, verbose_name='Cover Picture')
  content = RichTextField(verbose_name='Content')

  def __str__(self):
    return str(self.title)