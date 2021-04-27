import os
import json
import requests



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')

if not os.path.isdir('data_source/data_from_creeper/丁香医生每日数据'):
    os.makedirs('data_source/data_from_creeper/丁香医生每日数据')


def Domestic_daily_data_func():
    url = 'https://file1.dxycdn.com/2021/0427/959/0527322751390287743-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/国内每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))

Domestic_daily_data_func()
def Global_daily_data_func():
    url = 'https://file1.dxycdn.com/2021/0427/577/9505428288472087743-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/全球每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))

Global_daily_data_func()
def US_daily_data_func():
    url = ' https://file1.dxycdn.com/2020/0315/553/3402160512808052518-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/美国每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def Brazil_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/559/3402160538577857305-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/巴西每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def France_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/929/3402160538577857318-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/法国每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def Russia_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/629/3402160517102843039-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/俄罗斯每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def UK_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/364/3402160538577680395-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/英国每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def Italy_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/993/3402160517102843054-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/意大利每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def Spain_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/812/3402160512807875660-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/西班牙每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))


def Germany_daily_data_func():
    url = 'https://file1.dxycdn.com/2020/0315/631/3402160538577680475-135.json'
    response = requests.get(url = url).json()
    result = response['data']

    with open('data_source/data_from_creeper/丁香医生每日数据/德国每日数据.json','w',encoding = 'utf-8') as file:
        file.write(json.dumps(result,ensure_ascii = False))



func_list = [Domestic_daily_data_func,Global_daily_data_func,US_daily_data_func,Brazil_daily_data_func,France_daily_data_func,Russia_daily_data_func,UK_daily_data_func,Italy_daily_data_func,Spain_daily_data_func,Germany_daily_data_func]