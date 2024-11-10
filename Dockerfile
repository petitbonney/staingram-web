FROM node:20.18.0-slim

EXPOSE 5173

COPY . /app/
WORKDIR /app
RUN npm install

CMD ["npm", "run", "dev"]