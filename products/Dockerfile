# Base Stage
FROM node:12.16-alpine as base

EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /src

COPY package*.json /src/

RUN npm ci && npm cache clean --force

# Development Stage
FROM base as dev

ENV NODE_ENV=development

ENV PATH=/src/node_modules/.bin:$PATH

WORKDIR /src

RUN npm install --only=development

WORKDIR /src/app

CMD ["nodemon", "--inspect=0.0.0.0:9229", "./app.js"]

# Production Stage
FROM base as prod

WORKDIR /src/app

COPY . .

CMD ["node", "./app.js"]
