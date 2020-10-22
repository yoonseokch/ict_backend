FROM nikolaik/python-nodejs:python3.8-nodejs12-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN pip install sklearn numpy pymysql
RUN npm i

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
