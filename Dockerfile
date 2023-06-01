# syntax=docker/dockerfile:1
FROM node:14.18-alpine AS BUILDER
WORKDIR /opt/frontend
COPY . /opt/frontend/
RUN --mount=type=secret,id=login \
    --mount=type=secret,id=password \
    set -xe && \
    apk update && \
    login=$(cat /run/secrets/login) && \
    password=$(cat /run/secrets/password) && \
    npm install -g npm-cli-login && \
    npm-cli-login -u ${login} -p ${password} -e leo@lanars.com -r https://nexus.lanars.com/repository/npm-all && \
    npm config set @leo:registry https://nexus.lanars.com/repository/npm-all/ && \
    npm i -g npm@7 && \
    if [ -z "${BUILD_TYPE}" ]; then \
        echo 'build type not set' && \
        npm ci && \
        npm run build; \
    fi &&\
    if [ "${BUILD_TYPE}" = "stage" ]; then \
        echo 'build type set to stage' &&\
        npm ci && \
        npm run build:stage; \
    fi &&\
    if [ "${BUILD_TYPE}" = "prod" ]; then \
        echo 'build type set to prod' &&\
        npm ci --only=prod && \
        npm run build:prod; \
    fi
FROM nginx:mainline-alpine
COPY --from=BUILDER /opt/frontend/build /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
RUN set -xe && \
    apk add --no-cache --update mc htop sudo bash tini
RUN set -xe && \
    addgroup user && \
    adduser -h /home/user -s /bin/bash -G user -S -D user && \
    chown -R user:user /home/user/ /var/run/ /opt /var/cache/nginx && \
    chmod -R 777 /tmp/ /var/log/ && \
    echo 'user ALL=(ALL) NOPASSWD: /usr/bin/tee, /bin/ln, /bin/sed, /bin/bash' >> /etc/sudoers.d/user USER user
USER user
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]

