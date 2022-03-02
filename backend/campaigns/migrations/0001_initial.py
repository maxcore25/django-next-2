# Generated by Django 4.0.3 on 2022-03-02 03:32

import cloudinary.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('slug', models.SlugField(max_length=255)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('logo', cloudinary.models.CloudinaryField(max_length=255, verbose_name='Image')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('email', models.EmailField(max_length=255)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('logo', cloudinary.models.CloudinaryField(max_length=255, verbose_name='Image')),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='campaigns.campaign')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]