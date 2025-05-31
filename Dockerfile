# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install production dependencies and tsx for runtime
RUN npm ci --only=production && npm install tsx

# Initialize database
RUN npx drizzle-kit generate && npx drizzle-kit migrate && npx tsx app/db/seed.ts

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]