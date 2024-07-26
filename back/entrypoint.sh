#!/bin/sh

if [ "$DB_ENGINE" = "django.db.backends.mysql" ]
then
    # если база еще не запущена
    echo "Рано..."

    # Проверяем доступность хоста и порта
    until nc -z -v -w30 $DB_HOST $DB_PORT;do
      sleep 10;
    done

    echo "Пора!"
fi

# Выполняем миграции
python manage.py migrate

exec "$@"