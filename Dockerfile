FROM node:20.10.0

# Create app directory
WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server 
CMD [ "npm", "run", "start:dev" ]


