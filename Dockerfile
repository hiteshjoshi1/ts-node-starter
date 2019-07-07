# if you're doing anything beyond your local machine, 
# please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:8.9.4

WORKDIR /server

COPY . /server
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]