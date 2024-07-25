FROM node:12.2.0-alpine
WORKDIR /app
COPY . .
COPY /client/package*.json ./
RUN npm install
COPY /client .
ENV REACT_APP_TMDB_API_KEY=c40c784bfe3b0b6e4c4a1bfbfc999746
EXPOSE 1111
CMD ["npm","start"]
