FROM node

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/

COPY package.json /usr/src/
COPY .babelrc /usr/src/
RUN npm install


CMD [ "npm", "run", "dev" ]