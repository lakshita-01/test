# Generated by Django 4.2.7 on 2025-07-25 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SMSProvider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('api_url', models.URLField()),
                ('api_key', models.CharField(max_length=200)),
                ('sender_id', models.CharField(blank=True, max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('priority', models.IntegerField(default=1, help_text='Lower number = higher priority')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'sms_providers',
                'ordering': ['priority', 'name'],
            },
        ),
        migrations.CreateModel(
            name='SMSTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('template', models.TextField(help_text='SMS template with placeholders like {app_link}, {phone_number}')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'sms_templates',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='AppLinkRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(help_text='Mobile number to send app link', max_length=15)),
                ('message', models.TextField(help_text='SMS message content')),
                ('app_link', models.URLField(help_text='App download link')),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('sent', 'Sent'), ('failed', 'Failed'), ('delivered', 'Delivered')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('sent_at', models.DateTimeField(blank=True, null=True)),
                ('error_message', models.TextField(blank=True, help_text='Error message if sending failed')),
                ('provider', models.CharField(blank=True, help_text='SMS provider used', max_length=50)),
                ('provider_message_id', models.CharField(blank=True, help_text="Provider's message ID", max_length=100)),
            ],
            options={
                'db_table': 'app_link_requests',
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['phone_number'], name='app_link_re_phone_n_5ed0be_idx'), models.Index(fields=['status'], name='app_link_re_status_05378d_idx'), models.Index(fields=['created_at'], name='app_link_re_created_6bd254_idx')],
            },
        ),
    ]
