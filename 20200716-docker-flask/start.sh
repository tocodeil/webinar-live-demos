#!/bin/bash
python manage.py db upgrade
python manage.py runserver -h 0.0.0.0
