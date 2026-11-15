# Dockerfile for SAANIDHYA Backend (Google Cloud Run ready)
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first for efficient caching
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Cloud Run defaults to PORT 8080
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server.js"]
