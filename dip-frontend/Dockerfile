FROM harbor.ats.io/docker.io/library/node:10 as dist
WORKDIR /app
ADD package.json .
RUN npm config set disturl https://npm.taobao.org/dist --global
RUN npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
RUN npm config set phantomjs_cdnurl http://npm.taobao.org/mirrors/phantomjs
RUN npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
ADD . .
RUN npm run build:daocloud

FROM harbor.ats.io/docker.io/library/node:14.16
COPY --from=dist /app/node_modules /dip/node_modules
COPY --from=dist /app/.nuxt /dip/.nuxt
COPY ./static /dip/static
COPY ./nuxt.config.js /dip/nuxt.config.js
COPY ./package.json /dip/package.json
WORKDIR /dip
#道客测试
ENTRYPOINT ["npm","run","start:daocloud"]
#东方测试
#ENTRYPOINT ["npm","run","start:stage"]

EXPOSE 8018
