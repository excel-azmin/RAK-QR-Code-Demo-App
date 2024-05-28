# Use an official Node.js runtime as the parent image
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install application dependencies using Yarn
RUN yarn install

# Copy the application code to the container
COPY . .

# Build the React application for production
RUN yarn build

# Create a new image for production
FROM nginx:alpine

# Copy the NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React application to the NGINX web server directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 (default for HTTP traffic)
EXPOSE 80

# Start the NGINX web server
CMD ["nginx", "-g", "daemon off;"]