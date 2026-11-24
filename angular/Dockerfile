FROM node:22-alpine

# Install global npm packages
RUN npm i -g @angular/cli@21.2.31


USER node

# Set working directory
WORKDIR /home/node

# directory for the built angular files
RUN mkdir /home/node/dist

# Copy and install local npm packages
COPY --chown=node:node app/package.json* app/package-lock.json* ./mole_app/
WORKDIR /home/node/mole_app

# angular-cesium 20 and flex-layout declare older Angular peers
RUN npm ci --legacy-peer-deps

# Copy the remaining source code
COPY --chown=node:node ./app .