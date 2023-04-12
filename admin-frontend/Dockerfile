FROM harbor.ats.io/docker.io/library/node:13 as dist
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

FROM harbor.ats.io/docker.io/library/nginx:latest
COPY --from=dist /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf.bak
EXPOSE 80
CMD sed s#ADMIN_BACKEND_URL#"${ADMIN_BACKEND_URL}"#g /etc/nginx/nginx.conf.bak > /etc/nginx/nginx.conf && nginx -g "daemon off;"
