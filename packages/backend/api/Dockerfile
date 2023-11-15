FROM node:20-alpine AS builder

WORKDIR /usr/app

ARG packagejson

ARG env

COPY $packagejson .

RUN npm install --only=development

COPY . .

RUN npm run nx reset

RUN npm run nx run config:build

RUN npm run nx run locale:build

RUN npm run nx run entities:build

RUN npm run nx run api:build:production

FROM node:20-alpine

ARG packagejson

ARG env

WORKDIR /usr/app

COPY $packagejson .

RUN npm install --only=production

COPY $env .env

COPY ./migrations .

COPY --from=builder /usr/app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/packages/backend/api/main.js"]