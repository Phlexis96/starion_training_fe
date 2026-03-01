# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies using npm ci for a clean, reliable installation
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the compiled files from the build stage to the Nginx HTML folder
# Modern Angular (using @angular/build:application) outputs to dist/<project-name>/browser
COPY --from=build /app/dist/starion-training-fe/browser /usr/share/nginx/html

# Overwrite the default Nginx configuration to handle Angular's client-side routing
# This ensures that deep links (like /satellites) don't return a 404 error
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80 inside the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
