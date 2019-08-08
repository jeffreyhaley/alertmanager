FROM node:12.2.0-alpine

WORKDIR /app

# Bundle app source
ADD ./src /app

# Need curl for K8s ready check
RUN apk --no-cache add curl

# Install App Dependencies
RUN npm config set strict-ssl false
RUN npm config set registry https://artifactory.mattersight.local/artifactory/api/npm/mattersight-npm-gallery/
RUN npm ci



EXPOSE 80

CMD ["npm", "start"]