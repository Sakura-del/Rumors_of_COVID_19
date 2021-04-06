from django.shortcuts import render
from collections import defaultdict
from django.http import HttpResponse, JsonResponse
import json
from lib.handler import dispatcherBase
from common.models import TravelPolicy
from common.models import RiskLevel
from common.models import TestAgent
from django.db.models import Q
# Create your views here.


