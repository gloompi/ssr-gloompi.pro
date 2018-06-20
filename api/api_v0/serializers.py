from django.contrib.auth.models import User
from rest_framework import serializers

from about.models import AboutModel
from articles.models import ArticleModel, ArticleCategoryModel
from skills.models import SkillListModel, SkillModel
from works.models import WorkCategoryModel, WorkPicModel, TechModel, WorkModel

# Additional serializers
class WorkSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = WorkModel
    fields = (
      'title', 
      'cover_picture', 
      'category', 
      'content', 
      'link', 
      'bgcolor', 
      'date_added', 
      'tech'
    )

class TechSerializer(serializers.ModelSerializer):
    
  class Meta:
    model = TechModel
    fields = ('title', 'icon')

class WorkPicSerializer(serializers.ModelSerializer):
    
  class Meta:
    model = WorkPicModel
    fields = ('pic', 'work')

class WorkCategorySerializer(serializers.ModelSerializer):
    
  class Meta:
    model = WorkCategoryModel
    fields = ('title', 'id')

class SkillSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = SkillModel
    fields = ('title', 'knowledge', 'category')

class SkillListSerializer(serializers.ModelSerializer):
    
  class Meta:
    model = SkillListModel
    fields = ('title', 'id')

class ArticleCategorySerializer(serializers.ModelSerializer):
  
  class Meta:
    model = ArticleCategoryModel
    fields = ('title', 'id')

class ArticleSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = ArticleModel
    fields = (
      'title', 
      'cover_picture', 
      'content', 
      'category', 
      'announce', 
      'author', 
      'meta_title', 
      'meta_description', 
      'date_added'
    )

class AboutSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = AboutModel
    fields = ('title', 'cover_picture', 'content')

# class CreateUserSerializer(serializers.ModelSerializer):
  
#   class Meta:
#     model = CustomUser
#     fields = (
#       'username',
#       'password',
#       'first_name',
#       'last_name',
#       'email',
#       'partner',
#     )
    
#   def create(self, validated_data):
#     user = CustomUser(email=validated_data['email'], username=validated_data['username'])
#     user.set_password(validated_data['password'])
#     user.save()
#     return user