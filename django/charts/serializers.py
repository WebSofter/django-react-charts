from rest_framework import serializers
from .models import SignalsBottom, SignalsTop, SignalsSettings

class SignalsBottomSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignalsBottom
        fields = '__all__'

class SignalsTopSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignalsTop
        fields = '__all__'

class SignalsSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignalsSettings
        fields = ('par_name', 'par_permission', 'par_value')

