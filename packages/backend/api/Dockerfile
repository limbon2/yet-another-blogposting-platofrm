FROM node:20-alpine AS builder

ARG env

ARG packagejson

WORKDIR /usr/app

COPY $packagejson .

RUN npm install

COPY . .

RUN npx nx reset

RUN npx nx run config:build

RUN npx nx run locale:build

RUN npx nx run entities:build

RUN npx nx run api:build:production

FROM node:20-alpine

ARG packagejson

ARG env

ARG migrations

ARG mikroorm_config

WORKDIR /usr/app

COPY $packagejson .

RUN npm install --only=production

COPY $env .env

COPY $mikrorm_config .

COPY $migrations ./migrations

COPY --from=builder /usr/app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/packages/backend/api/main.js"]
