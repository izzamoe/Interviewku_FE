# Use the latest stable Node.js alpine image for efficiency and security
FROM node:lts-alpine AS build

# Set the working directory within the container for clarity
WORKDIR /app

# Copy the application code from the current directory to the container's /app
COPY . /app

# Install dependencies using npm (adjust if you use a different package manager)
RUN npm install

# Build the application (replace with your build command if different)
RUN npm run build

# Use a minimal Ubuntu image for the final container (consider alternatives like nginx:alpine)
FROM ubuntu:22.04  # Consider a specific, supported Ubuntu version

# Update package lists for security reasons (avoid `apt-get update` directly in production)
RUN apt-get update -y  # Add -y for non-interactive mode

# Install Nginx web server
RUN apt-get install nginx -y  # Add -y for non-interactive mode

# Copy the built application from the build stage to the web server's document root
COPY --from=build /app/dist /var/www/html/

# Expose port 80 for web traffic
EXPOSE 80

# Run Nginx in the foreground for development (adjust for production)
CMD ["nginx", "-g", "daemon off;"]  # Consider using a process manager like supervisord in production