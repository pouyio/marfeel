# Use an official Node.js runtime as a parent image
FROM node:18 AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY build-dataset.js ./

# Create the /server folder, needed for the post-install script
RUN mkdir /app/server

# Install app dependencies
RUN npm install

# Set the environment variable for the build process
ENV REACT_APP_API_URL=https://marfeel.fly.dev/api

# Copy the frontend source code into the container
COPY .npmrc .npmrc
COPY src src
COPY public public
COPY tsconfig.json tsconfig.json
COPY craco.config.js craco.config.js
COPY tsconfig.paths.json ./

# Build the frontend TypeScript code
RUN npm run build

# Copy the backend source code into the container
COPY server server

# Build the backend TypeScript code
WORKDIR /app/server
RUN npm run build:server

# Switch to a new image for the production environment
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the built frontend and backend code from the builder stage
RUN ls -al /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/server/dist /app/server/dist

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY build-dataset.js ./

# Install only production dependencies
RUN npm install --production

# Set environment variables
ENV NODE_ENV production

# Start the Node.js server
CMD ["node", "server/dist/index.js"]
