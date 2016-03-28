FROM node:0.12.7

USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app/
RUN npm install --unsafe-perm
