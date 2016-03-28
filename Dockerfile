FROM node:0.12.7

USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm install --unsafe-perm
