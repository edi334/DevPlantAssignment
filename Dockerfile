FROM node:14-alpine as build

RUN mkdir /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY . /app

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/DevPlantAssignment /usr/share/nginx/html

LABEL org.opencontainers.image.source=https://github.com/edi334/DevPlantAssignment
