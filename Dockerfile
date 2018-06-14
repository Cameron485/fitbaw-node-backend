FROM node:8.11.2-alpine

ADD Apkfile /
RUN apk update && apk add --update $(cat /Apkfile)

RUN wget https://yarnpkg.com/downloads/1.7.0/yarn-v1.7.0.tar.gz https://yarnpkg.com/downloads/1.7.0/yarn-v1.7.0.tar.gz.asc && \
    gpg --batch --verify yarn-v1.7.0.tar.gz.asc yarn-v1.7.0.tar.gz && \
    tar zvxf yarn-v1.7.0.tar.gz -C /opt/ && \
    rm /usr/local/bin/yarn /usr/local/bin/yarnpkg && \
    ln -s /opt/yarn-v1.7.0/bin/yarn /usr/local/bin/yarn && \
    ln -s /opt/yarn-v1.7.0/bin/yarnpkg /usr/local/bin/yarnpkg && \
    rm yarn-v1.7.0.tar.gz.asc yarn-v1.7.0.tar.gz

WORKDIR /opt/fitbaw-node-service/
ADD package.json yarn.lock ./

RUN yarn install --production=false

ADD entrypoint.sh /
ADD . .

EXPOSE 8080

HEALTHCHECK --start-period=20s CMD curl --fail --max-time 10 http://localhost:8080/health

ENTRYPOINT ["/entrypoint.sh"]

CMD ["yarn", "run", "start"]
