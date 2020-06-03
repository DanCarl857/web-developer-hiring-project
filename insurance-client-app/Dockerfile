FROM node:12.16.1-alpine as builder

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:1.15.8-alpine

# COPY --from=builder /usr/src/app/dist/insurance-client-app/ /usr/share/nginx/html
# EXPOSE 4200
# CMD ["nginx", "-g", "daemon off"]
# RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

EXPOSE 4200

# start app
CMD ng serve --prod