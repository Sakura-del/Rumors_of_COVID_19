# -*-coding:utf-8-*-
from django.http import JsonResponse
from django.utils import timezone
from django.db.models import Q, Count
from lib.handler import dispatcherBase
from common.models import Question, Answer
from django.db import transaction
from django.core.paginator import Paginator, EmptyPage
import jieba
import datetime


# 展示问题
def list_questions(request):
    try:
        # qs = Question.objects.values('question', 'question_text', 'id', 'pub_date').annotate(
        #     answer_count=Count(Answer)).distinct().order_by('-pub_date')
        qs = Question.objects.values('question','question_text','pub_date','id').annotate(
            answer_count=Count('answer')).order_by('-pub_date')
        # qs = qs.values_list('question','question_text','pub_date','answer_count','id')
        # 页数
        pagenum = request.params['pagenum']
        # 页大小
        pagesize = request.params['pagesize']

        pgnt = Paginator(qs, pagesize)
        # 问题总数
        total_questions = pgnt.count

        page = pgnt.page(pagenum)

        page = list(page)

        return JsonResponse(
            {"ret": 0, "retlist": page, 'total_questions': total_questions, "total": len(page), "msg": ""})
    except EmptyPage:
        # 数据查完
        return JsonResponse({'ret': 0, 'total_rumors': [], 'total': 0, "msg": "没有更多数据了"})
    except Question.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 查询问题
def get_questions(request):
    question = request.params['question']
    try:
        qs = Question.objects.values('id', 'question', 'question_text', 'pub_date').distinct().order_by('-pub_date')
        stopwords = [
            line.strip() for line in open(
                'search_stopwords.txt', "r", encoding='UTF-8').readlines()
        ]
        # 分词，获取用户输入的关键词
        keywords = jieba.cut(question)
        if keywords:
            conditions = [
                Q(question__contains=one) for one in keywords if one not in stopwords  # 去除停用词
            ]
        # 引用Q查询
        query = Q()
        for condition in conditions:
            query |= condition
        qs = qs.filter(query)
        # 获取页数
        pagenum = request.params['pagenum']
        # 每页问题数量
        pagesize = request.params['pagesize']
        pgnt = Paginator(qs, pagesize)
        page = pgnt.page(pagenum)
        # 转换为可序列化的列表
        retlist = list(page)

        return JsonResponse({"ret": 0, "retlist": retlist, "total": len(retlist), "msg": ""})

    except EmptyPage:
        # 数据查完
        return JsonResponse({'ret': 0, 'total_rumors': [], 'total': 0, "msg": "没有更多数据了"})

    except Question.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 问题详情
def question_details(request):
    question_id = request.params['question_id']
    try:
        question = Question.objects.values().filter(id=question_id)
        answers = Answer.objects.values().filter(questionid=question_id)
        question = list(question)
        answers = list(answers)

        return JsonResponse({"ret": 0, "question": question, "answers": answers, "total": len(answers), "msg": ""})
    except Question.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})
    except Answer.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


# 提问
def ask_question(request):
    question = request.params['question']
    question_text = request.params['question_text']
    try:
        qs = Question.objects.get(question=question)
        qs = list(qs)
        if qs:
            return JsonResponse({"ret": 1, 'msg': '该问题已存在', 'retlist': qs})
        else:
            with transaction.atomic():
                new_question = Question.objects.create(question=question, question_text=question_text,
                                                       pub_date=datetime.datetime.now())
    except Question.DoesNotExist:
        with transaction.atomic():
            new_question = Question.objects.create(question=question, question_text=question_text,
                                                   pub_date=datetime.datetime.now())

    return JsonResponse({"ret": 0, "question_id": new_question.id, "msg": ""})


# 回复
def answer_question(request):
    # 获取问题id
    question_id = request.params['question_id']
    try:
        answer = request.params['answer']
        with transaction.atomic():
            Answer.objects.create(answer=answer,
                                  answer_date=timezone.now(),
                                  questionid_id=question_id)
        return JsonResponse({"ret": 0, "question_id": question_id, "msg": ""})
    except Question.DoesNotExist:
        # 数据获取失败
        return JsonResponse({"ret": 1, "msg": "信息获取失败"})


ActionHandler = {
    'list_questions': list_questions,
    'question_details': question_details,
    'ask_question': ask_question,
    'answer_question': answer_question,
    'get_questions': get_questions
}


def dispatcher(request):
    return dispatcherBase(request, ActionHandler)
