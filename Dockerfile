# Stage 1: Build Angular app
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve built Angular app using Express
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy built Angular app from builder stage
COPY --from=builder /app/dist /app/dist

# Copy static file server code
COPY server.js ./

EXPOSE 4200

CMD ["node", "server.js"]
