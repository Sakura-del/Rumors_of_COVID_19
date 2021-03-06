# 独立使用django的model
import sys
import os
import django
import json
pwd = os.path.dirname(os.path.realpath(__file__))
sys.path.append(pwd + "../")
# 找到根目录（与工程名一样的文件夹）下的settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Rumor_of_COVID_19.settings')

django.setup()
import datetime
from common.models import *


def import_data_logic_func():
    filename = 'data_source/data_from_creeper/丁香医生本日数据.json'
    with open(filename, "r", encoding='utf-8') as f:
        data_list = json.load(f)

    # 当前国内疫情
    current_covid_internal = data_list["current_covid_internal"]
    CurrentCovidInternal.objects.all().delete()
    CurrentCovidInternal.objects.create(
        current_confirmed=current_covid_internal[0],
        abroad=current_covid_internal[1],
        current_asym=current_covid_internal[2],
        confirmed=current_covid_internal[3],
        death=current_covid_internal[4],
        cured=current_covid_internal[5],
        date=datetime.date.today())

    # 当前全球疫情
    current_covid_global = data_list['current_covid_global']
    CurrentCovidGlobal.objects.all().delete()
    CurrentCovidGlobal.objects.create(current_confirmed=current_covid_global[0],
                                    confirmed=current_covid_global[1],
                                    death=current_covid_global[2],
                                    cured=current_covid_global[3],
                                    date=datetime.date.today())

    # 当前各省疫情
    current_covid_provinces = data_list['current_covid_provinces']
    CurrentCovidProvinces.objects.all().delete()
    for item in current_covid_provinces:
        CurrentCovidProvinces.objects.create(province=item['overall_data']['area'],
                                            overall_data=item['overall_data'],
                                            city_data=item['city_data'],
                                            extra_info=item['extra_info'],
                                            date=datetime.date.today())

    # 当前各国疫情
    current_covid_national = data_list['current_covid_national']
    CurrentCovidNational.objects.all().delete()
    for item in current_covid_national:
        CurrentCovidNational.objects.create(
            island=item['island_data']['area'],
            island_data=item['island_data'],
            island_nation_data=item['island_nation_data'],
            date=datetime.date.today())

    # 谣言数据
    filename1 = 'data_source/data_from_creeper/较真网.json'
    with open(filename1, "r", encoding='utf-8') as f1:
        rumors_data = json.load(f1)
    RumorInfo.objects.all().delete()
    for rumor in rumors_data:
        RumorInfo.objects.create(
                                urlid = rumor['id'],
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
                                arttype=rumor['arttype'])

    # 俄罗斯每日疫情数据
    filename2 = 'data_source/data_from_creeper/丁香医生每日数据/俄罗斯每日数据.json'

    with open(filename2, "r", encoding='utf-8') as f2:
        russia_data_list = json.load(f2)
    RussiaDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 全球每日数据
    filename3 = 'data_source/data_from_creeper/丁香医生每日数据/全球每日数据.json'
    with open(filename3, "r", encoding='utf-8') as f3:
        global_data_list = json.load(f3)
    GlobalDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 国内每日数据
    filename4 = 'data_source/data_from_creeper/丁香医生每日数据/国内每日数据.json'
    with open(filename4, "r", encoding='utf-8') as f4:
        internal_data_list = json.load(f4)
    InternalDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 巴西每日数据
    filename5 = 'data_source/data_from_creeper/丁香医生每日数据/巴西每日数据.json'
    with open(filename5, "r", encoding='utf-8') as f5:
        brazil_data_list = json.load(f5)
    BrazilDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 德国每日数据
    filename6 = 'data_source/data_from_creeper/丁香医生每日数据/德国每日数据.json'
    with open(filename6, "r", encoding='utf-8') as f6:
        germany_data_list = json.load(f6)
    GermanyDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 意大利每日数据
    filename7 = 'data_source/data_from_creeper/丁香医生每日数据/意大利每日数据.json'
    with open(filename7, "r", encoding='utf-8') as f7:
        italy_data_list = json.load(f7)
    ItalyDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 法国每日数据
    filename8 = 'data_source/data_from_creeper/丁香医生每日数据/法国每日数据.json'
    with open(filename8, "r", encoding='utf-8') as f8:
        france_data_list = json.load(f8)
    FranceDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 美国每日数据
    filename9 = 'data_source/data_from_creeper/丁香医生每日数据/美国每日数据.json'
    with open(filename9, "r", encoding='utf-8') as f9:
        us_data_list = json.load(f9)
    USDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 英国每日数据
    filename10 = 'data_source/data_from_creeper/丁香医生每日数据/英国每日数据.json'
    with open(filename10, "r", encoding='utf-8') as f10:
        uk_data_list = json.load(f10)
    UKDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 西班牙每日数据
    filename11 = 'data_source/data_from_creeper/丁香医生每日数据/西班牙每日数据.json'
    with open(filename11, "r", encoding='utf-8') as f11:
        spain_data_list = json.load(f11)
    SpainDailyData.objects.all().delete()
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
            suspectedCountIncr=data['suspectedCountIncr'])

    # 腾讯疫情新闻
    filename12 = 'data_source/data_from_creeper/腾讯新闻疫情新闻.json'
    with open(filename12, "r", encoding='utf-8') as f12:
        news_data_list = json.load(f12)
    News.objects.all().delete()
    for data in news_data_list:
        News.objects.create(title=data['title'],
                            url=data['url'],
                            thumb_nail=data['thumb_nail'],
                            top_big_img=data['top_big_img'],
                            category_id=data['category_id'],
                            category_name=data['category_name'],
                            category_cn=data['category_cn'],
                            sub_category_name=data['sub_category_name'],
                            sub_category_cn=data['sub_category_cn'],
                            tags=data['tags'],
                            media_name=data['media_name'],
                            article_id=data['article_id'],
                            comment_num=data['comment_num'],
                            publish_time=data['publish_time'],
                            update_time=datetime.datetime.now(),
                            img=data['img'])

    # 中国及全球截至今日总疫苗接种量
    filename13 = 'data_source/data_from_creeper/腾讯新闻疫苗数据/中国及全球截至今日总疫苗接种量.json'
    with open(filename13, "r", encoding='utf-8') as f13:
        vaccinations_data = json.load(f13)

    CurrentVaccinations.objects.all().delete()
    CurrentVaccinations.objects.create(
        area='中国',
        total_vaccinations=vaccinations_data['china']['total_vaccinations'],
        new_vaccinations=vaccinations_data['china']['new_vaccinations'],
        total_vaccinations_per_hundred=vaccinations_data['china']
        ['total_vaccinations_per_hundred'],
        date=datetime.date.today())
    CurrentVaccinations.objects.create(
        area='全球',
        total_vaccinations=vaccinations_data['global']['total_vaccinations'],
        new_vaccinations=vaccinations_data['global']['new_vaccinations'],
        total_vaccinations_per_hundred=vaccinations_data['global']
        ['total_vaccinations_per_hundred'],
        date=datetime.date.today())

    # 中国疫苗每日趋势
    filename14 = 'data_source/data_from_creeper/腾讯新闻疫苗数据/中国疫苗每日趋势.json'
    with open(filename14, "r", encoding='utf-8') as f14:
        trend_vaccine_internal_list = json.load(f14)
    TrendVaccinesInternal.objects.all().delete()
    for data in trend_vaccine_internal_list:
        TrendVaccinesInternal.objects.create(
            year=data['y'],
            date=data['date'],
            total_vaccinations=data['total_vaccinations'],
            total_vaccinations_per_hundred=data['total_vaccinations_per_hundred'])

    # 各国截至今日疫苗接种情况
    filename15 = 'data_source/data_from_creeper/腾讯新闻疫苗数据/各国截至今日疫苗接种情况.json'
    with open(filename15, "r", encoding='utf-8') as f15:
        vaccines_national_list = json.load(f15)
    CurrentVaccinesNations.objects.all().delete()
    for data in vaccines_national_list:

        CurrentVaccinesNations.objects.create(
            country=data['country'],
            date=data['date'],
            vaccines=data['vaccinations'],
            total_vaccinations=data['total_vaccinations'],
            total_vaccinations_per_hundred=data['total_vaccinations_per_hundred'])

    # 重点国家地区疫苗每日趋势
    filename16 = 'data_source/data_from_creeper/腾讯新闻疫苗数据/重点国家地区疫苗每日趋势.json'
    with open(filename16, "r", encoding='utf-8') as f16:
        trend_vaccines_national_list = json.load(f16)

    # 总量趋势
    total_trend = trend_vaccines_national_list['totalTrend']
    TotalTrendVaccinesNations.objects.all().delete()
    # TotalTrendVaccinesNations.objects.create(country='Africa',
    #                                          data=total_trend['Africa'])
    TotalTrendVaccinesNations.objects.create(country='中国',
                                            data=total_trend['China'])
    TotalTrendVaccinesNations.objects.create(country='俄罗斯',
                                            data=total_trend['Russia'])
    TotalTrendVaccinesNations.objects.create(country='印度',
                                            data=total_trend['India'])
    TotalTrendVaccinesNations.objects.create(country='印度尼西亚',
                                            data=total_trend['Indonesia'])
    TotalTrendVaccinesNations.objects.create(country='土耳其',
                                            data=total_trend['Turkey'])
    TotalTrendVaccinesNations.objects.create(country='巴西',
                                            data=total_trend['Brazil'])
    TotalTrendVaccinesNations.objects.create(country='德国',
                                            data=total_trend['Germany'])
    TotalTrendVaccinesNations.objects.create(country='欧盟', data=total_trend['EU'])
    TotalTrendVaccinesNations.objects.create(country='法国',
                                            data=total_trend['France'])
    TotalTrendVaccinesNations.objects.create(country='美国', data=total_trend['US'])
    TotalTrendVaccinesNations.objects.create(country='英国', data=total_trend['UK'])

    # 每一百人接种人数趋势
    per_trend = trend_vaccines_national_list['perHundredTrend']
    PerTrendVaccinesNations.objects.all().delete()
    PerTrendVaccinesNations.objects.create(country='以色列', data=per_trend['Israel'])
    PerTrendVaccinesNations.objects.create(country='匈牙利',
                                        data=per_trend['Hungary'])
    # PerTrendVaccinesNations.objects.create(country='土耳其', data=per_trend['Turkey'])
    PerTrendVaccinesNations.objects.create(country='奥地利',
                                        data=per_trend['Austria'])
    # PerTrendVaccinesNations.objects.create(country='意大利', data=per_trend['Italy'])
    # PerTrendVaccinesNations.objects.create(country='摩洛哥',
    #                                        data=per_trend['Morocco'])
    # PerTrendVaccinesNations.objects.create(country='瑞士', data=per_trend['Switzerland'])
    # PerTrendVaccinesNations.objects.create(country='欧盟', data=per_trend['EU'])
    PerTrendVaccinesNations.objects.create(country='智利', data=per_trend['Chile'])
    PerTrendVaccinesNations.objects.create(country='美国', data=per_trend['US'])
    PerTrendVaccinesNations.objects.create(country='英国', data=per_trend['UK'])
    # PerTrendVaccinesNations.objects.create(country='葡萄牙', data=per_trend['Portugal'])
    PerTrendVaccinesNations.objects.create(country='西班牙', data=per_trend['Spain'])
    PerTrendVaccinesNations.objects.create(country='阿联酋', data=per_trend['Arab'])

    # 腾讯新闻各地出行政策
    filename17 = 'data_source/data_from_creeper/腾讯新闻各地出行政策.json'
    with open(filename17, "r", encoding='utf-8') as f17:
        travel_policy_list = json.load(f17)

    TravelPolicy.objects.all().delete()
    for data in travel_policy_list:
        TravelPolicy.objects.create(province=data['province'],
                                    city=data['city'],
                                    district=data['district'],
                                    leave_policy_list=data['leave_policy_list'],
                                    back_policy_list=data['back_policy_list'],
                                    stay_info_list=data['stay_info_list'])

    # 腾讯新闻各地区风险
    filename18 = 'data_source/data_from_creeper/腾讯新闻各地区风险.json'
    with open(filename18, "r", encoding='utf-8') as f18:
        risk_level_list = json.load(f18)

    RiskLevel.objects.all().delete()
    for data in risk_level_list:
        RiskLevel.objects.create(name=data['name'],
                                province=data['province'],
                                low_level_count=data['low_level_count'],
                                medium_level_count=data['medium_level_count'],
                                high_level_count=data['high_level_count'],
                                city_list=data['city_list'])

    # 腾讯新闻疫情定点医院
    filename19 = 'data_source/data_from_creeper/腾讯新闻疫情定点医院.json'
    with open(filename19, "r", encoding='utf-8') as f19:
        designated_hospital_list = json.load(f19)

    DesignatedHospital.objects.all().delete()
    for data in designated_hospital_list:
        DesignatedHospital.objects.create(provinceName=data['provinceName'],
                                        citys=data['citys'],
                                        cityCnt=data['cityCnt'])

    # 腾讯新闻疫苗接种点
    filename20 = 'data_source/data_from_creeper/腾讯新闻疫苗接种点.json'
    with open(filename20, "r", encoding='utf-8') as f20:
        vaccination_point_list = json.load(f20)

    VaccinationPoint.objects.all().delete()
    for data in vaccination_point_list:
        VaccinationPoint.objects.create(address=data['address'],
                                        province=data['province'],
                                        city=data['city'],
                                        district=data['district'],
                                        title=data['title'],
                                        tel=data['tel'])

    # 腾讯新闻核酸检测机构
    filename21 = 'data_source/data_from_creeper/腾讯新闻核酸检测机构.json'
    with open(filename21, "r", encoding='utf-8') as f21:
        test_agent_list = json.load(f21)

    TestAgent.objects.all().delete()
    for data in test_agent_list:
        TestAgent.objects.create(
            province=data['province'],
            count=data['count'],
            data=data['data'],
        )

    filename22 = 'data_source/data_from_creeper/头条疫情新闻.json'
    with open(filename22, "r", encoding='utf-8') as f22:
        headline_news_list = json.load(f22)

    HeadlinesNews.objects.all().delete()
    for data in headline_news_list:
        HeadlinesNews.objects.create(title=data['title'],
                                    link=data['link'],
                                    date=data['date'],
                                    field=data['field'],
                                    summary=data['summary'],
                                    tag_list=data['tag_list'])


    filename23 = 'data_source/data_from_creeper/腾讯新闻疫苗研发情况.json'
    with open(filename23, "r", encoding='utf-8') as f23:
        vaccine_status_list = json.load(f23)

    VaccineStatus.objects.all().delete()
    for data in vaccine_status_list:
        VaccineStatus.objects.create(organization_name=data['organization_name'],
                                    progress=data['progress'],
                                    vaccine_name=data['vaccine_name'],
                                    vaccine_type=data['vaccine_type'],
                                    update_time=datetime.datetime.now()
                                    )


    # 谣言数据
    filename24 = 'data_source/data_from_creeper/较真网.json'
    with open(filename24, "r", encoding='utf-8') as f24:
        rumors_data = json.load(f24)
    NLPrumors.objects.all().delete()
    for rumor in rumors_data:
        NLPrumors.objects.create(
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
                                arttype=rumor['arttype'])



    # 谣言数据
    filename23 = 'data_source/data_from_creeper/中国互联网联合辟谣.json'
    with open(filename23, "r", encoding='utf-8') as f23:
        rumors_lhpy_data = json.load(f23)

    for rumor in rumors_lhpy_data:
        rumor['date'] = rumor['date'][:10]
        if rumor['keyword'] == '事实':
            markstyle = 'true'
            result = '真'
            explain = '确实如此'
        elif rumor['keyword'] == '谣言':
            markstyle = 'fake'
            result = '假'
            explain = '谣言'
        else:
            markstyle = 'doubt'
            result = '疑'
            explain = '有失实'
        NLPrumors.objects.create(title=rumor['title'],
                                author=rumor['source'],
                                authordesc=rumor['source'],
                                date=rumor['date'],
                                abstract=rumor['pic_link'],
                                tag=[],
                                markstyle=markstyle,
                                result=result,
                                explain=explain)
