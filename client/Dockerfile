# Set the base image to the official Node.js v14 image
FROM node:14

# Create the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Set the environment variable for the base host
ENV REACT_APP_BASE_HOST=http://localhost:3000

# Build the application for production
RUN npm run build

# Expose the port for the application
EXPOSE 80

# Start the application
CMD ["npm", "start"]
