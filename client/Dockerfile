FROM node:lts-alpine AS base

WORKDIR /usr/src/app/client

RUN npm install -g pnpm @antfu/ni

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm build


FROM nginx:stable as deploy

COPY --from=base /usr/src/app/client/dist/client /usr/share/nginx/html
COPY --from=base /usr/src/app/client/nginx.conf etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
