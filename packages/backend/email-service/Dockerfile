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

RUN npm run nx run email-service:build:production

FROM node:20-alpine

ARG packagejson

ARG env

WORKDIR /usr/app

COPY $packagejson .

RUN npm install --only=production

COPY $env .env

COPY --from=builder /usr/app/dist ./dist

CMD ["node", "./dist/packages/backend/email-service/main.js"]