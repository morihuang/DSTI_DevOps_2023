## Docker Image

This task entails building a docker image of our application user docker and then orchestrate with docker compose

First is the installation of [docker engine](https://docs.docker.com/engine/install/ubuntu/) from the official docker 

Run this dockerfile to build our application image


```
FROM node:12

WORKDIR /usr/src/app

COPY ./userapi/package.json .
COPY ./userapi/ /usr/src/app/

RUN npm install

EXPOSE 3000
CMD [ "npm", "start", "index.js" ]

```
```
sudo docker build -t <imagename> 
```

Run this dockerfile to build the redis server Image

```

FROM redis
COPY ./userapi/conf/redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]

```


 A successful build should have this [output](images/docker.png)
