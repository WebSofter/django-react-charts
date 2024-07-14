from django.shortcuts import render
import json
import uuid
import pika
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from django.db import transaction
from django.http import HttpResponse
import csv

# Create your views here.
def get_filtered_chart(serializer, filter):
    filter = float(filter)
    if filter >=1.0:
        return serializer.data
    else:
        rows = []
        for item in serializer.data:
            cols = {}
            for name, value in item.items():
                if(name in 'timestamps'):
                    cols[name] = value
                else:
                    cols[name] = round((value * filter),2)
            rows.append(cols)
        return rows

@api_view(['GET'])
def list_charts(request, page):
    if request.method == 'GET':
        filter = request.GET.get("filter")
        limit = int(request.GET.get("limit"))  
        if int(page) == 1:
            data = SignalsTop.objects.all()[:limit]
            serializer = SignalsTopSerializer(data, context={'request': request}, many=True)
            result = get_filtered_chart(serializer, filter)
            return Response(result)
        elif int(page) == 2:
            data = SignalsBottom.objects.all()[:limit]
            serializer = SignalsBottomSerializer(data, context={'request': request}, many=True)
            result = get_filtered_chart(serializer, filter)
            return Response(result)
        else:
            return Response('Not exist page', status=404)

@api_view(['GET'])
def download_chart(request, page):
    filter = request.GET.get("filter")
    limit = int(request.GET.get("limit"))    
    response = HttpResponse(content_type='text/csv') 
    response['Content-Disposition'] = 'attachment; filename="book_catalog.csv"'
  
    writer = csv.writer(response) 
    writer.writerow(['timestamps', 'data_1ch', 'data_1ch', 'data_2ch', 'data_3ch', 'data_4ch', 'data_5ch', 'data_6ch', 'data_7ch', 'data_8ch']) 
  
    data = SignalsTop.objects.all()[:limit]
    serializer = SignalsBottomSerializer(data, many=True)
    rows = get_filtered_chart(serializer, filter)
    for row in rows: 
        writer.writerow([row['timestamps'], row['data_1ch'], row['data_2ch'], row['data_3ch'], row['data_4ch'], row['data_5ch'], row['data_6ch'], row['data_7ch'], row['data_8ch']]) 
  
    return response 

@api_view(['GET', 'POST'])
def settings(request):
    if request.method == 'GET':
        data = SignalsSettings.objects.all()
        serializer = SignalsSettingsSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data['params'])
        # data = SignalsSettings.objects.all()
        # serializer = SignalsSettingsSerializer(data, context={'request': request}, many=True)
        with transaction.atomic():
            for value in data['params']:
                n = value['par_name']
                v = value['par_value']
                SignalsSettings.objects.filter(par_name = n).update(par_value = v, par_permission='RW')
        return Response([])
