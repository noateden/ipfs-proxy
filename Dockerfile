FROM node:18

WORKDIR /ipfs

COPY . .

RUN yarn
