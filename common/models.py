import datetime
# Create your models here.
from django.db import models
from django.utils import timezone


# 国内总体数据
class CurrentCovidInternal(models.Model):
    current_confirmed = models.JSONField()  # 现存确诊
    abroad = models.JSONField()          # 境外输入
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


# 用户提问
class Question(models.Model):
    question = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question
    
    class Meta:
        db_table = 'question'


# 用户回答
class Answer(models.Model):
    questiont = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField()
    answer_date = models.DateTimeField(default=timezone.now())
    
    class Meta:
        db_table = 'answer'


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


class HeadlinesNews(models.Model):
    title = models.CharField(max_length=200, blank=False)
    link = models.URLField(default= '')
    date = models.CharField(max_length=200)
    field = models.CharField(max_length=200)
    summary = models.CharField(max_length=400)
    tag_list = models.JSONField(default=list)

    class Meta:
        db_table = 'headline_news'


class News(models.Model):
    title = models.CharField(max_length=200, blank=False)
    url = models.URLField()
    thumb_nail = models.URLField(default='')
    top_big_img = models.JSONField(default=list)
    category_id = models.CharField(max_length=200)
    category_name = models.CharField(max_length=200)
    category_cn = models.CharField(max_length=200, default='')
    sub_category_name = models.CharField(max_length=200)
    sub_category_cn = models.CharField(max_length=200)
    tags = models.JSONField(default=list)
    media_name = models.CharField(max_length=200)
    article_id = models.CharField(max_length=200)
    comment_num = models.CharField(max_length=200)
    publish_time = models.CharField(max_length=200)
    update_time = models.DateTimeField()
    img = models.URLField()

    class Meta:
        db_table = 'news'


class CurrentVaccinations(models.Model):
    area = models.CharField(max_length=200)
    total_vaccinations = models.IntegerField()
    new_vaccinations = models.IntegerField()
    total_vaccinations_per_hundred = models.FloatField()
    date = models.DateField(default=timezone.now)

    class Meta:
        db_table = 'current_vaccinations'


class TrendVaccinesInternal(models.Model):
    year = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    total_vaccinations = models.IntegerField()
    total_vaccinations_per_hundred = models.FloatField()

    class Meta:
        db_table = 'trend_vaccines_internal'


class CurrentVaccinesNations(models.Model):
    country = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    vaccines = models.CharField(max_length=200)
    total_vaccinations = models.CharField(max_length=200)
    total_vaccinations_per_hundred = models.FloatField()

    class Meta:
        db_table = 'current_vaccines_nations'


class PerTrendVaccinesNations(models.Model):
    country = models.CharField(max_length=200)
    data = models.JSONField(default=list)

    class Meta:
        db_table = 'per_trend_accines_nations'


class TotalTrendVaccinesNations(models.Model):
    country = models.CharField(max_length=200)
    data = models.JSONField(default=list)

    class Meta:
        db_table = 'total_trend_vaccines_nations'


# 出行政策
class TravelPolicy(models.Model):
    province = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    leave_policy_list = models.JSONField(default=list)
    back_policy_list = models.JSONField(default=list)
    stay_info_list = models.JSONField(default=list)

    class Meta:
        db_table = 'travel_policy'


# 风险等级
class RiskLevel(models.Model):
    name = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    low_level_count = models.IntegerField()
    medium_level_count = models.IntegerField()
    high_level_count = models.IntegerField()
    city_list = models.JSONField(default=list)

    class Meta:
        db_table = 'risk_level'


# 定点医院
class DesignatedHospital(models.Model):
    provinceName = models.CharField(max_length=200)
    citys = models.JSONField(default=list)
    cityCnt = models.IntegerField()

    class Meta:
        db_table = 'designated_hospital'


# 疫苗接种点
class VaccinationPoint(models.Model):
    address = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    tel = models.CharField(max_length=200)

    class Meta:
        db_table = 'vaccination_point'


# 核酸检测机构
class TestAgent(models.Model):
    province = models.CharField(max_length=200)
    count = models.IntegerField()
    data = models.JSONField()

    class Meta:
        db_table = 'test_agent'


class VaccineStatus(models.Model):
    organization_name = models.CharField(max_length=200)
    progress = models.CharField(max_length=200)
    vaccine_name = models.CharField(max_length=200)
    vaccine_type = models.CharField(max_length=200)
    update_time = models.DateTimeField(default=timezone.now())

    class Meta:
        db_table = 'vaccine_status'