# Стартовый образ, возмем 3.11 python, он поменше.
FROM python:3.11-buster

# рабочая директория
WORKDIR /usr/src/app
# Каталоги для статики
RUN mkdir -p $WORKDIR/static
RUN mkdir -p $WORKDIR/media

# переменные окружения для python
#не создавать файлы кэша .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# не помещать в буфер потоки stdout и stderr
ENV PYTHONUNBUFFERED 1

# RUN apk update \
#     && apk add postgresql-dev gcc python3-dev musl-dev

# General Packages
RUN apt-get update \
    && apt-get install -y libmariadb-dev \
    && apt-get install -y python3-pip \
    && apt-get install -y build-essential \
    && apt-get install -y libcurl4-openssl-dev \
    && apt-get install -y libssl-dev \
    && pip install --upgrade pip

# обновим pip
RUN pip install --upgrade pip

# скопируем и установим зависимости. эта операция закешируется 
# и будет перезапускаться только при изменении requirements.txt
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# копируем всё что осталось.
COPY . .

# Сделаем первую миграцию.
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
