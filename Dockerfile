FROM node:11.15.0

RUN apt-get update
RUN apt-get install -y netcat

RUN npm install -g npm

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY package.json package-lock.json /usr/src/app/
RUN cd /usr/src/app && npm install

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN if [ "${NODE_ENV}" = "production" ]; then cd /usr/src/app && npm prune; fi

COPY . /usr/src/app/

EXPOSE 8080

CMD [ "npm", "run", "start" ]
