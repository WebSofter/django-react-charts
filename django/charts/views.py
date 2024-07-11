from django.shortcuts import render
import uuid
import pika
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *


# Create your views here.

@api_view(['GET'])
def list_charts(request, page):
    if request.method == 'GET':
        #self.kwargs.get("slug")
        if int(page) == 1:
            data = SignalsTop.objects.all()
            serializer = SignalsTopSerializer(data, context={'request': request}, many=True)
            return Response(serializer.data)
        elif int(page) == 2:
            data = SignalsBottom.objects.all()
            serializer = SignalsBottomSerializer(data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response('Not exist page', status=404)
        
@api_view(['GET', 'POST'])
def list_settings(request):
    if request.method == 'GET':
        data = SignalsSettings.objects.all()
        serializer = SignalsSettingsSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)