FROM node:16.15.0-slim
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY dist/. /app/
EXPOSE 8080
CMD ["node", "main.js"]