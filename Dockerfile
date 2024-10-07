FROM node:alpine3.20 as base
RUN apk add --no-cache curl
RUN curl -f https://get.pnpm.io/v6.js | node - add --global pnpm

FROM base as builder

WORKDIR /home/node/app
COPY payload/ ./ 
COPY payload/package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
RUN pnpm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app
COPY --from=builder /home/node/app/package*.json ./
COPY --from=builder /home/node/app/pnpm-lock.yaml ./

RUN pnpm install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3001

CMD ["node", "dist/server.js"]