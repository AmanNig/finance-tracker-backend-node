# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the full app source
COPY . .


# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install


# Generate Prisma Client for production (including Windows binary, if needed)
RUN npx prisma generate

# Set environment variable to production
ENV NODE_ENV=production

# Railway automatically sets the PORT env variable, so listen on process.env.PORT

# Start the app
CMD ["npm", "start"]
