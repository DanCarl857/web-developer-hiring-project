FROM node:13.14.0-alpine3.10

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 7001

CMD ["npm", "start"]