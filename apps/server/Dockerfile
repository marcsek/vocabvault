FROM node:20-alpine3.17 AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache npm
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .

RUN turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
#COPY /apps/server/.env .env

# Generate Prisma Schema
RUN npx turbo db:generate
RUN npx turbo run build --filter=server...

FROM base AS runner
WORKDIR /app

RUN npm install -g @dotenvx/dotenvx

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer /app .

CMD dotenvx run --env-file=/app/apps/server/.env -- node apps/server/dist/index.js
