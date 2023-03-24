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

# Set the environment variables
ENV DB_USER=postgres
ENV DB_PASSWORD=password
ENV DB_NAME=zapping
ENV DB_HOST=localhost
ENV PORT=3000
ENV JWT_SECRET=de4d2cefe34621fc896847fb3518bc90695f476e6ee58e98a3ca571861c76b790180ddeb3130798d7d1c1573157363dd8c48e9c9e15ef2daeed48298ecfbfa1a

# Expose the port for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
