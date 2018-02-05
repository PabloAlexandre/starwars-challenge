FROM node:9.0.0

RUN mkdir /starwars
WORKDIR /starwars

COPY package.json /starwars
COPY ./ /starwars
RUN yarn install

EXPOSE 3000
CMD ["yarn", "dev"]
