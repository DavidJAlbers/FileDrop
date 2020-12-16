FROM node:latest

WORKDIR /app

# Copy NPM package description and version locks
COPY package*.json ./

# Install NPM packages
RUN npm install --only=production

# Copy application code
COPY ../src ./src

# Start application in production mode
CMD [ "npm", "run", "prod" ]
EXPOSE 80