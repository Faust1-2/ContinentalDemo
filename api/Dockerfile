FROM node:20.10.0 AS base

WORKDIR /usr/src/app

RUN npm install -g pnpm @antfu/ni

COPY ./ ./

RUN pnpm install --only=prod

RUN pnpm run build

FROM node:20.10.0-slim

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/dist ./
COPY --from=base /usr/src/app/node_modules ./node_modules/

EXPOSE 3000



CMD [ "node", "main.js" ]