# Use Node.js 18.16.0 on Alpine Linux
FROM node:18.16.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire backend source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Use entrypoint script to start the container
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy  && npx ts-node prisma/seed.ts && npm run start:dev"]