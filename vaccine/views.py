from django.shortcuts import render
from collections import defaultdict
from django.http import HttpResponse, JsonResponse
import json
from lib.handler import dispatcherBase
from common.models import DesignatedHospital
from common.models import VaccinationPoint
from common.models import TestAgent
from common.models import VaccineStatus
from django.db.models import Q,Count
# Create your views here.


# 获取各市定点医院
def get_hospital_region(request):
    try:
        province = request.params['province']
        hospitals = DesignatedHospital.objects.values().filter(provinceName=province)
        hospitals = list(hospitals)

        return JsonResponse({"ret": 0, "hospitals": hospitals, "msg": ""})
    except DesignatedHospital.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 获取各省定点医院
def get_hospital_province(request):
    try:
        provinces = DesignatedHospital.objects.values('provinceName','cityCnt')
        provinces = list(provinces)

        outlist =[]
        for data in provinces:
            outlist.append(data['provinceName'])
        print(outlist)

        return JsonResponse({"ret": 0,"provinces": provinces,  "msg": ""})
    except DesignatedHospital.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 获取各省核酸检测机构
def get_test_agent_province(request):
    try:
        provinces = TestAgent.objects.values('province','count')
        provinces = list(provinces)

        return JsonResponse({"ret": 0, "provinces": provinces, "msg": ""})
    except TestAgent.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 获取各地核酸检测机构
def get_test_agent_region(request):
    try:
        province = request.params['province']
        data_list = TestAgent.objects.values('data').filter(province=province)

        data_list = data_list[0]['data']
        test_agents = defaultdict(list)

        for data in data_list:
            test_agents[data['city']].append(data)

        return JsonResponse({"ret": 0, "test_agents": test_agents, "msg": ""})

    except TestAgent.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 获取各省疫苗接种点
def get_vaccination_point_province(request):
    try:
        provinces = VaccinationPoint.objects.values('province').annotate(count = Count('province'))
        provinces = list(provinces)

        return JsonResponse({"ret": 0, "provinces": provinces, "msg": ""})
    except VaccinationPoint.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 各地区核酸接种点
def get_vaccination_point_region(request):
    try:
        province = request.params['province']

        data_list = VaccinationPoint.objects.values().filter(province__contains=province)
        data_list = list(data_list)

        citys = defaultdict(list)

        for data in data_list:
            citys[data['city']].append(data)
        return JsonResponse({"ret": 0, "citys": citys, "msg": ""})
    except VaccinationPoint.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


def get_vaccine_status(request):
    try:
        data = VaccineStatus.objects.values().order_by('progress')

        data = list(data)

        return JsonResponse({"ret": 0, "retlist": data, "total": len(data), "msg": ""})
    except VaccineStatus.DoesNotExist:
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


ActionHandler = {
    "get_hospital_region": get_hospital_region,
    "get_hospital_province": get_hospital_province,
    "get_test_agent_province": get_test_agent_province,
    "get_test_agent_region": get_test_agent_region,
    'get_vaccination_point_region': get_vaccination_point_region,
    'get_vaccination_point_province': get_vaccination_point_province,
    'get_vaccine_status': get_vaccine_status
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)