

# 识谣知疫——疫情谣言检测及可视化分析系统

本项目是一个有关疫情的数据展示和基于疫情的谣言检测及可视化分析平台。



## 内容列表

* [项目背景](#项目背景)
* [安装](#安装)
* [使用](#使用)
* [文件结构](#文件结构)
* [参考网站](#参考网站)
* [开发人员](#开发人员)

## 项目背景

谣言自古就是引起社会动荡的因素之一，在疫情笼罩下的特殊时期，谣言的危害被进一步放大，借助于互联网，谣言的数量和传播速度都与日俱增，很多谣言平常人很难分辨真假。因此我们决定提供一个基于疫情的信息展示和谣言检测及可视化分析平台，让用户可以方便的查看疫情的各类信息，检索谣言等。

本项目的目标是：

1. 一个准确的谣言识别工具，使用户可以准确地识别自己想要鉴别的消息是否为谣言。
2. 一个方便的谣言检索工具，使用户可以迅速地检索想要查询的谣言。
3. 一个直观的谣言可视化展示平台，使用户可以直观的看到谣言的分析结果。
4. 一个全面且及时的疫情信息获取平台，使用户可以及时地获取全面的疫情信息，包括疫情状态、新闻、疫苗状态等。



## 安装

本项目基于Python的Django框架，如果您没有在本地安装他们，请先安装Python环境并使用pip安装Django。

```python
pip install Django
```



## 使用

在根目录下打开命令行界面，输入`python manage.py runserver`即可运行服务器，打开浏览器输入127.0.0.1:8000/home.html即可进入网站首页。



## 文件结构

Rumors_of_COVID_19
├── common/
|  ├── admin.py
|  ├── apps.py
|  ├── migrations/
|  ├── models.py
|  ├── test.py
|  ├── tests.py
|  ├── views.py
|  ├── __init__.py
|  └── __pycache__/
├── covid/
|  ├── admin.py
|  ├── apps.py
|  ├── current.py
|  ├── daily.py
|  ├── migrations/
|  ├── models.py
|  ├── news.py
|  ├── tests.py
|  ├── urls.py
|  ├── views.py
|  ├── __init__.py
|  └── __pycache__/
├── data_source/
|  ├── chromedriver.exe
|  ├── data_from_creeper/
|  ├── __init__.py
|  ├── __pycache__/
|  ├── 一键爬虫.py
|  ├── 丁香医生本日数据.py
|  ├── 丁香医生每日数据.py
|  ├── 丁香医生谣言.py
|  ├── 中国互联网联合辟谣.py
|  ├── 头条疫情新闻.py
|  ├── 腾讯新闻各地出行政策.py
|  ├── 腾讯新闻各地区风险.py
|  ├── 腾讯新闻核酸检测机构.py
|  ├── 腾讯新闻疫情定点医院.py
|  ├── 腾讯新闻疫情新闻.py
|  ├── 腾讯新闻疫苗接种点.py
|  ├── 腾讯新闻疫苗数据.py
|  ├── 腾讯新闻疫苗研发情况.py
|  ├── 较真网谣言.py
|  └── 较真网问答.py
├── db.sqlite3
├── fasttext_model.pkl
├── import_data.py
├── judge_one_text.py
├── lda_stopwords.txt
├── lib/
|  ├── handler.py
|  └── __pycache__/
├── manage.py
├── out.md
├── package-lock.json
├── package.json
├── README.md
├── rumor/
|  ├── admin.py
|  ├── apps.py
|  ├── migrations/
|  ├── models.py
|  ├── questions.py
|  ├── shows.py
|  ├── tests.py
|  ├── urls.py
|  ├── views.py
|  ├── __init__.py
|  └── __pycache__/
├── rumorshow/
|  ├── epidemic.html
|  ├── epidemic_general_data.html
|  ├── epidemic_news.html
|  ├── epidemic_specific_data.html
|  ├── home.html
|  ├── rumor_general.html
|  ├── rumor_identify.html
|  ├── rumor_lda.html
|  ├── rumor_question.html
|  ├── rumor_search_result.html
|  ├── rumor_show.html
|  ├── vaccine_development.html
|  ├── vaccine_vaccination.html
|  └── vaccine_visualization.html
├── Rumor_of_COVID_19/
|  ├── asgi.py
|  ├── settings.py
|  ├── urls.py
|  ├── wsgi.py
|  ├── __init__.py
|  └── __pycache__/
├── search_stopwords.txt
├── static/
|  ├── assets/
|  ├── build/
|  ├── css/
|  ├── fonts/
|  ├── images/
|  ├── js/
|  └── vendors/
├── vaccine/
|  ├── admin.py
|  ├── apps.py
|  ├── migrations/
|  ├── models.py
|  ├── tests.py
|  ├── total.py
|  ├── trend.py
|  ├── urls.py
|  ├── views.py
|  ├── __init__.py
|  └── __pycache__/
├── venv/
|  ├── Lib/
|  ├── pyvenv.cfg
|  └── Scripts/
├── words_cut.py
└── 路由及接口设计.md



## 参考网站

[全球新冠肺炎疫情地图 - 丁香园·丁香医生 ](https://ncov.dxy.cn/ncovh5/view/pneumonia)

[较真查证平台_腾讯新闻 ](https://vp.fact.qq.com/home)

[中国互联网联合辟谣平台 ](https://www.piyao.org.cn/)

[新闻中心-腾讯网 ](https://news.qq.com/)

[疫情 – 今日头条新闻 ](http://www.cp79115.cn/tag/疫情)



## 开发人员

[吴冠中](https://github.com/Sakura-del)

负责后端框架的搭建，前后端交互接口设计，数据库设计和维护。

[漆健晗](https://github.com/lanhesanqi)

负责前端框架搭建，前端界面开发，自然语言处理。

[毛郁龙](https://github.com/MIkumikumi0116)

负责爬取数据，前端界面开发，前端界面美化。

