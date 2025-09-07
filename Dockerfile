# ---------- Stage 1 : build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# instal dependency (pakai cache layer)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# salin source & build
COPY . .
RUN npm run build                      # hasil → /app/dist

# ---------- Stage 2 : runtime ----------
FROM node:20-alpine
WORKDIR /app

# server statik minimalis
RUN npm install -g serve@latest

# salin artefak build saja → ringan
COPY --from=builder /app/dist ./dist

EXPOSE 3000                             
CMD ["serve", "-s", "dist", "-l", "3000"]
