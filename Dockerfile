FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]