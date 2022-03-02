from django.db import models
from cloudinary.models import CloudinaryField
from django.template.defaultfilters import slugify


class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    logo = CloudinaryField('Image', overwrite=True, format='jpg')

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        to_assign = slugify(self.title)

        if Campaign.objects.filter(slug=to_assign).exists():
            to_assign += str(Campaign.objects.all().count())

        self.slug = to_assign
        super().save(*args, **kwargs)


class Subscriber(models.Model):
    campaign = models.ForeignKey(to=Campaign, on_delete=models.DO_NOTHING)
    email = models.EmailField(max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    logo = CloudinaryField('Image', overwrite=True, format='jpg')

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.email
