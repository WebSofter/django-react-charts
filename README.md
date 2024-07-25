# 1. запуск бекенд

```sh
$ python3 -m venv .venv
$ pip install -r requirements.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver 0.0.0.0:8000
```

# 2. запуск фронтенда
```sh
$ npm i
$ npm run start
```

# 3. запуск через docker
```sh
sudo chmod 644 docker/mariadb/my.cnf
docker compose --profile prod up -d
```