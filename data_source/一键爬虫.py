import os
from threading import Thread



if not os.path.isdir('data_source/data_from_creeper'):
    os.makedirs('data_source/data_from_creeper')

all_func_list = []

from 丁香医生本日数据 import func_list
all_func_list += func_list

from 丁香医生每日数据 import func_list
all_func_list += func_list

from 丁香医生谣言 import func_list
all_func_list += func_list

from 较真网 import func_list
all_func_list += func_list

from 腾讯新闻疫苗数据 import func_list
all_func_list += func_list

from 腾讯新闻疫情新闻 import func_list
all_func_list += func_list


thread_list = []
thread_count = 1
for func in all_func_list:
    thread = Thread(target = func)
    thread.start()
    thread_list.append(thread)

    print(f'{thread_count}/{len(all_func_list)}个线程已启动')
    thread_count += 1

thread_count = 1
for thread in thread_list:
    thread.join()

    print(f'{thread_count}/{len(all_func_list)}个线程已完成')
    thread_count += 1

print('所有线程已完成')