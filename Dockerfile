# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Build the static web app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the static server
CMD ["serve", "web-build", "-l", "3000"]