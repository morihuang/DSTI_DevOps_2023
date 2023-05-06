FROM node:12

WORKDIR /usr/src/app

COPY ./userapi/package.json .
COPY ./userapi/ /usr/src/app/

RUN npm install

EXPOSE 3000
CMD [ "npm", "start", "index.js" ]