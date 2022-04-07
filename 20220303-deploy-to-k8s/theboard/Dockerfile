FROM node:17

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
