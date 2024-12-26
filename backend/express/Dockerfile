# Install dependencies only when needed
FROM node:20.11.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/main#nodealpine for alpine-specific notes
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build the app with cache dependencies
FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:20.11.0-alpine AS runner

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
    # Clean npm cache
    npm cache clean --force

# Optimization: Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

# Set default environment variables
ENV NODE_ENV=production \
    PORT=3000

# Add non-root user for security
USER node

CMD [ "node", "dist/main" ]