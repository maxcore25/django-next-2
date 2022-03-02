from django.shortcuts import render
from rest_framework import generics
from .models import Campaign


class CampaignListAPIView(generics.ListAPIView):
    def get_queryset(self):
        return Campaign.objects.all()
