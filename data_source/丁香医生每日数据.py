import os
import json
import requests



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')

if not os.path.isdir('data_source/data_from_creeper/丁香医生每日数据'):
    os.makedirs('data_source/data_from_creeper/丁香医生每日数据')


def 国内每日数据_func():
    url = 'https://file1.dxycdn.com/2021/0329/072/4781419391339442743-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/国内每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 全球每日数据_func():
    url = 'https://file1.dxycdn.com/2021/0329/270/7977712388202242743-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/全球每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 美国每日数据_func():
    url = ' https://file1.dxycdn.com/2020/0315/553/3402160512808052518-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/美国每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 巴西每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/559/3402160538577857305-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/巴西每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 法国每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/929/3402160538577857318-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/法国每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 俄罗斯每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/629/3402160517102843039-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/俄罗斯每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 英国每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/364/3402160538577680395-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/英国每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 意大利每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/993/3402160517102843054-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/意大利每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 西班牙每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/812/3402160512807875660-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/西班牙每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))


def 德国每日数据_func():
    url = 'https://file1.dxycdn.com/2020/0315/631/3402160538577680475-135.json'
    response = requests.get(url = url).json()
    result = response['data']
    with open('data_source/data_from_creeper/丁香医生每日数据/德国每日数据.json','w',encoding='utf-8') as file:
        file.write(json.dumps(result))



func_list = [国内每日数据_func,全球每日数据_func,美国每日数据_func,巴西每日数据_func,法国每日数据_func,俄罗斯每日数据_func,英国每日数据_func,意大利每日数据_func,西班牙每日数据_func,德国每日数据_func]