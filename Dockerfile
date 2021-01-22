FROM node:14

# Create app directory
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY ./ ./

EXPOSE 80
CMD [ "npm", "start" ]