FROM node:22-slim as builder

ENV NODE_ENV build

USER root
WORKDIR /home/node

RUN apt-get update && apt-get install -y openssl libssl-dev

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package*.json ./

COPY --chown=node:node . .

RUN npm install

RUN npx prisma generate
RUN npm run build

######

FROM node:22-slim

ENV NODE_ENV production

USER root

RUN apt-get update && apt-get install -y openssl libssl-dev

USER node

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/prisma ./prisma
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules
COPY --from=builder --chown=node:node /home/node/dist/ ./dist

CMD ["sh", "-c", "npm run start:prod"]
