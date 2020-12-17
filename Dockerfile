FROM node:latest

WORKDIR /app

# Copy NPM package description and version locks
COPY package*.json ./

# Install NPM packages
RUN npm install --only=production

# Copy application code
COPY . .

# Start application in production mode
CMD [ "npm", "start" ]
EXPOSE 80