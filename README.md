# 1. запус без docker
## 1.1. запуск бекенд

```sh
$ python3 -m venv .venv
$ pip install -r requirements.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver 0.0.0.0:8000
```

## 1.2. запуск фронтенда
```sh
$ npm i
$ npm run start
```

# 2. запуск через docker
```sh
sudo chmod +x ./back/entrypoint.sh
sudo chmod 444 ./docker/mariadb/my.cnf
docker compose up -d
```

# 2.1. прочие команды docker
# 2.1.1 команды контейнера
```sh
docker ps -a
docker stop service_name
docker start service_name
docker rm [--force] service_name
docker rm -vf $(docker ps -aq)
```
# 2.1.2 команды для образов
```sh
docker images
docker compose up image_name -d
docker rmi [--force] image_name
docker rmi -f $(docker images -aq)
```