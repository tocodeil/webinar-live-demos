#!/bin/bash
source .env
python manage.py db upgrade
python manage.py runserver -h 0.0.0.0
