# Use node image for base image for all stages.
FROM node:20.11.0-alpine

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Install app dependencies
RUN npm install

# Copy prisma files
COPY prisma ./prisma

# Copy the rest of the source files into the image.
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Run the build script.
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start:prod
