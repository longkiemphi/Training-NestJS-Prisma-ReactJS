# Use Node.js 18.16.0 on Alpine Linux
FROM node:18.16.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]