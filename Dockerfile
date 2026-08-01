# Use Node 20 for build and runtime
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for dependency install caching
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the source
COPY . .

RUN npm run build

# Runtime image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy built output and package files; runtime dependencies are needed for preview command
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.js ./vite.config.js
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/index.html ./index.html

EXPOSE 8080

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]
