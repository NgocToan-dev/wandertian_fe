# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install the application dependencies inside the Docker image
RUN npm install

# Copy the rest of the application to the Docker image
COPY . .

# Expose port 3000 for the application
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "run", "dev" ]