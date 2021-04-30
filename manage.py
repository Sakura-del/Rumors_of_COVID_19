#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import threading
import time

import import_data


def main():
    """Run administrative tasks."""
    
    import_data_thread = threading.Thread(target=import_data_func,args=(1,))
    import_data_thread.start()

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Rumor_of_COVID_19.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


def import_data_func(a):
    print('1')
    while True:
        print(f'{time.time()}-开始入库')
        import_data.import_data_logic_func()
        print(f'{time.time()}-入库完成')
        time.sleep(3600)


if __name__ == '__main__':
    main()
