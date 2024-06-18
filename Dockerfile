FROM node:20.14.0-slim

RUN apt update && apt install -y openssl procps

RUN npm install -g @nestjs/cli@10.3.2

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm install webpack

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
