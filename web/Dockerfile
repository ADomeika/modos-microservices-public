FROM node:12.16-alpine

EXPOSE 3000

RUN apk add --no-cache tini

COPY client/package*.json /src/client/

WORKDIR /src/client

RUN npm install @vue/cli -g

RUN npm install && npm cache clean --force

COPY . /src/

RUN npm run build

WORKDIR /src

RUN npm install --production && npm cache clean --force

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "./src/app.js"]
