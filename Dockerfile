FROM node:18-alpine AS builder
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ ./
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5000
CMD ["node", "index.js"]