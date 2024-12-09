FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
RUN npm install typescript

COPY . . 

EXPOSE 3001

CMD ["npm", "start"]