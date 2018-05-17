from django.contrib.auth.models import User
from rest_framework import serializers

from news.models import NewsModel

# Additional serializers

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