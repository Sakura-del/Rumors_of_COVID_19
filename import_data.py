# 独立使用django的model
import sys
import os

pwd = os.path.dirname(os.path.realpath(__file__))
sys.path.append(pwd + "../")
# 找到根目录（与工程名一样的文件夹）下的settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Rumor_of_COVID_19.settings')

import django
import json

django.setup()
import datetime
from common.models import CurrentCovidNational
from common.models import CurrentCovidInternal
from common.models import CurrentCovidGlobal
from common.models import CurrentCovidProvinces
from common.models import RumorInfo
from common.models import GlobalDailyData
from common.models import BrazilDailyData
from common.models import UKDailyData
from common.models import RussiaDailyData
from common.models import USDailyData
from common.models import ItalyDailyData
from common.models import InternalDailyData
from common.models import SpainDailyData
from common.models import GermanyDailyData
from common.models import FranceDailyData

filename = 'data_source/covid_data.json'

with open(filename, "r", encoding='utf-8') as f:
    data_list = json.load(f)

current_covid_internal = data_list["current_covid_internal"]
CurrentCovidInternal.objects.create(
    current_confirmed=current_covid_internal[0],
    suspected=current_covid_internal[1],
    current_asym=current_covid_internal[2],
    confirmed=current_covid_internal[3],
    death=current_covid_internal[4],
    cured=current_covid_internal[5],
    date=datetime.date.today() - datetime.timedelta(days=1)
)
current_covid_global = data_list['current_covid_global']
CurrentCovidGlobal.objects.create(
    current_confirmed=current_covid_global[0],
    confirmed=current_covid_global[1],
    death=current_covid_global[2],
    cured=current_covid_global[3],
    date=datetime.date.today() - datetime.timedelta(days=1)
)
current_covid_provinces = data_list['current_covid_provinces']
for item in current_covid_provinces:
    CurrentCovidProvinces.objects.create(
        province=item['overall_data']['area'],
        overall_data=item['overall_data'],
        city_data=item['city_data'],
        extra_info=item['extra_info'],
        date=datetime.date.today() - datetime.timedelta(days=1)
    )
current_covid_national = data_list['current_covid_national']
for item in current_covid_national:
    CurrentCovidNational.objects.create(
        island=item['island_data']['area'],
        island_data=item['island_data'],
        island_nation_data=item['island_nation_data'],
        date=datetime.date.today() - datetime.timedelta(days=1)
    )

filename1 = 'data_source/rumor_data.json'
with open(filename1, "r", encoding='utf-8') as f1:
    rumors_data = json.load(f1)

for rumor in rumors_data:
    RumorInfo.objects.create(
        title=rumor['title'],
        author=rumor['author'],
        authordesc=rumor['authordesc'],
        date=rumor['date'],
        markstyle=rumor['markstyle'],
        result=rumor['result'],
        explain=rumor['explain'],
        abstract=rumor['abstract'],
        tag=rumor['tag'],
        type=rumor['type'],
        videourl=rumor['videourl'],
        cover=rumor['cover'],
        coverrect=rumor['coverrect'],
        coversqual=rumor['coversqual'],
        section=rumor['section'],
        iscolled=rumor['iscolled'],
        arttype=rumor['arttype']
    )

filename2 = 'data_source/丁香医生每日数据/俄罗斯每日数据.json'

with open(filename2, "r", encoding='utf-8') as f2:
    russia_data_list = json.load(f2)

for data in russia_data_list:
    RussiaDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )

filename3 = 'data_source/丁香医生每日数据/全球每日数据.json'
with open(filename3, "r", encoding='utf-8') as f3:
    global_data_list = json.load(f3)


for data in global_data_list:
    GlobalDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )

filename4 = 'data_source/丁香医生每日数据/国内每日数据.json'
with open(filename4, "r", encoding='utf-8') as f4:
    internal_data_list = json.load(f4)

for data in internal_data_list:
    InternalDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename5 = 'data_source/丁香医生每日数据/巴西每日数据.json'
with open(filename5, "r", encoding='utf-8') as f5:
    brazil_data_list = json.load(f5)

for data in brazil_data_list:
    BrazilDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename6 = 'data_source/丁香医生每日数据/德国每日数据.json'
with open(filename6, "r", encoding='utf-8') as f6:
    germany_data_list = json.load(f6)

for data in germany_data_list:
    GermanyDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename7 = 'data_source/丁香医生每日数据/意大利每日数据.json'
with open(filename7, "r", encoding='utf-8') as f7:
    italy_data_list = json.load(f7)

for data in italy_data_list:
    ItalyDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename8 = 'data_source/丁香医生每日数据/法国每日数据.json'
with open(filename8, "r", encoding='utf-8') as f8:
    france_data_list = json.load(f8)

for data in france_data_list:
    FranceDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename9 = 'data_source/丁香医生每日数据/美国每日数据.json'
with open(filename9, "r", encoding='utf-8') as f9:
    us_data_list = json.load(f9)

for data in us_data_list:
    USDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename10 = 'data_source/丁香医生每日数据/英国每日数据.json'
with open(filename10, "r", encoding='utf-8') as f10:
    uk_data_list = json.load(f10)

for data in uk_data_list:
    UKDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )


filename11 = 'data_source/丁香医生每日数据/西班牙每日数据.json'
with open(filename11, "r", encoding='utf-8') as f11:
    spain_data_list = json.load(f11)

for data in spain_data_list:
    SpainDailyData.objects.create(
        dateId=data['dateId'],
        confirmedCount=data['confirmedCount'],
        confirmedIncr=data['confirmedIncr'],
        curedCount=data['curedCount'],
        curedIncr=data['curedIncr'],
        currentConfirmedCount=data['currentConfirmedCount'],
        currentConfirmedIncr=data['currentConfirmedIncr'],
        deadCount=data['deadCount'],
        deadIncr=data['deadIncr'],
        highDangerCount=data['highDangerCount'],
        midDangerCount=data['midDangerCount'],
        suspectedCount=data['suspectedCount'],
        suspectedCountIncr=data['suspectedCountIncr']
    )
