from django.db import models

# Create your models here.

class SignalsBottom(models.Model):
    timestamps = models.DateTimeField('Time', auto_now_add=True, null=False, primary_key=True)
    data_1ch = models.FloatField('data_1ch', blank=True, null=False, default=0)
    data_2ch = models.FloatField('data_2ch', blank=True, null=False, default=0)
    data_3ch = models.FloatField('data_3ch', blank=True, null=False, default=0)
    data_4ch = models.FloatField('data_4ch', blank=True, null=False, default=0)
    data_5ch = models.FloatField('data_5ch', blank=True, null=False, default=0)
    data_6ch = models.FloatField('data_6ch', blank=True, null=False, default=0)
    data_7ch = models.FloatField('data_6ch', blank=True, null=False, default=0)
    data_8ch = models.FloatField('data_6ch', blank=True, null=False, default=0)
    class Meta:
        db_table="SignalsBottom"
    def __str__(self):
        return self.timestamps

class SignalsTop(models.Model):
    timestamps = models.DateTimeField('Time', auto_now_add=True, null=False, primary_key=True)
    data_1ch = models.FloatField('data_1ch', blank=True, null=False, default=0)
    data_2ch = models.FloatField('data_2ch', blank=True, null=False, default=0)
    data_3ch = models.FloatField('data_3ch', blank=True, null=False, default=0)
    data_4ch = models.FloatField('data_4ch', blank=True, null=False, default=0)
    data_5ch = models.FloatField('data_5ch', blank=True, null=False, default=0)
    data_6ch = models.FloatField('data_6ch', blank=True, null=False, default=0)
    data_7ch = models.FloatField('data_6ch', blank=True, null=False, default=0)
    data_8ch = models.FloatField('data_6ch', blank=True, null=False, default=0)
    class Meta:
        db_table="SignalsTop"
    def __str__(self):
        return self.timestamps
    
class SignalsSettings(models.Model):
    par_name = models.CharField("Name", max_length=20, primary_key=True)
    par_permission = models.CharField("Permission", max_length=20, default='RO')
    par_value = models.FloatField('Value', blank=True, null=False, default=0)
    class Meta:
        db_table="SignalsSettings"
    def __str__(self):
        return self.par_name