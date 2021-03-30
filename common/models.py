import datetime
# Create your models here.
from django.db import models
from django.utils import timezone


# 国内总体数据
class CurrentCovidInternal(models.Model):
    current_confirmed = models.JSONField()  # 现存确诊
    suspected = models.JSONField()          # 境外输入
    current_asym = models.JSONField()       # 现存无症状
    confirmed = models.JSONField()          # 累计确诊
    death = models.JSONField()              # 累计死亡
    cured = models.JSONField()              # 累计治愈
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'current_covid_internal'


# 国外总体数据
class CurrentCovidGlobal(models.Model):
    current_confirmed = models.JSONField()
    confirmed = models.JSONField()
    death = models.JSONField()
    cured = models.JSONField()
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'current_covid_global'


# 国内省份数据
class CurrentCovidProvinces(models.Model):
    province = models.CharField(max_length=200)
    overall_data = models.JSONField()
    city_data = models.JSONField()
    extra_info = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'current_covid_provinces'


# 国外各国数据
class CurrentCovidNational(models.Model):
    island = models.CharField(max_length=200)
    island_data = models.JSONField()
    island_nation_data = models.JSONField()
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'current_covid_national'


# 谣言信息
class RumorInfo(models.Model):
    title = models.CharField(max_length=200, blank=False)
    author = models.CharField(max_length=200, blank=False)
    authordesc = models.CharField(max_length=200)
    date = models.CharField(max_length=200, blank=False)
    markstyle = models.CharField(max_length=200, blank=False)
    result = models.CharField(max_length=200, blank=False)
    explain = models.CharField(max_length=200)
    abstract = models.TextField()
    tag = models.JSONField(default=list)
    type = models.IntegerField()
    videourl = models.CharField(default='', max_length=200)
    cover = models.CharField(max_length=200)
    coverrect = models.CharField(max_length=200)
    coversqual = models.CharField(max_length=200)
    section = models.CharField(max_length=200, default='')
    iscolled = models.BooleanField(default=False)
    arttype = models.CharField(default='normal', max_length=200)

    class Meta:
        db_table = 'rumor_info'


# 俄罗斯每日数据
class RussiaDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'russia_daily_data'


# 全球每日数据
class GlobalDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'global_daily_data'


# 国内每日数据
class InternalDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'interval_daily_data'


# 巴西每日数据
class BrazilDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'brazil_daily_data'


# 德国每日数据
class GermanyDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'germany_daily_data'


# 意大利每日数据
class ItalyDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'italy_daily_data'


# 法国每日数据
class FranceDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'france_daily_data'


# 美国每日数据
class USDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'us_daily_data'


# 英国每日数据
class UKDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'uk_daily_data'


# 西班牙每日数据
class SpainDailyData(models.Model):
    dateId = models.IntegerField(blank=False)
    confirmedCount = models.IntegerField()
    confirmedIncr = models.IntegerField()
    curedCount = models.IntegerField()
    curedIncr = models.IntegerField()
    currentConfirmedCount = models.IntegerField()
    currentConfirmedIncr = models.IntegerField()
    deadCount = models.IntegerField()
    deadIncr = models.IntegerField()
    highDangerCount = models.IntegerField()
    midDangerCount = models.IntegerField()
    suspectedCount = models.IntegerField()
    suspectedCountIncr = models.IntegerField()

    class Meta:
        db_table = 'spain_daily_data'
