FROM node:20-alpine AS builder

WORKDIR /usr/app

ARG packagejson

ARG env

COPY $packagejson .

COPY . .

RUN npm install

RUN npx nx reset

RUN npx nx run config:build

RUN npx nx run locale:build

RUN npx nx run entities:build

RUN npx nx run email-service:build:production

FROM node:20-alpine

ARG packagejson

ARG env

WORKDIR /usr/app

COPY $packagejson .

RUN npm install --only=production

COPY $env .env

COPY --from=builder /usr/app/dist ./dist

CMD ["node", "./dist/packages/backend/email-service/main.js"]
