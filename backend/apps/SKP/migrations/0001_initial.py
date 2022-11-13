# Generated by Django 4.1.3 on 2022-11-13 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Vehicles',
            },
        ),
        migrations.CreateModel(
            name='SKP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255)),
                ('community', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('phone', models.CharField(max_length=15)),
                ('nip', models.CharField(max_length=10, unique=True)),
                ('image', models.ImageField(upload_to='skp')),
                ('name', models.CharField(max_length=255)),
                ('city', models.CharField(db_collation='und-x-icu', max_length=255)),
                ('desc', models.CharField(max_length=255)),
                ('is_verified', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('vehicles', models.ManyToManyField(blank=True, to='SKP.vehicles')),
            ],
            options={
                'verbose_name_plural': 'SKP',
            },
        ),
    ]
