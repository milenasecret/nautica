
# Stage 1 - Build Angular application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy Angular source code
COPY . .

# Build Angular application
RUN npm run build

# Stage 2 - Run application using Nginx
FROM nginx:alpine

# Copy Angular build files to Nginx
COPY --from=build /app/dist/nautica-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
