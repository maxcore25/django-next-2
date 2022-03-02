from django.db import models


class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=255)
    created_at = models.DateTimeField(auto_created=200)
    updated_at = models.DateTimeField(auto_now_add=200)
