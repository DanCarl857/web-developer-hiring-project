FROM node:13.14.0-alpine3.10

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

CMD ["npm", "seed-database"]