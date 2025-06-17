FROM node:20-alpine3.17 AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache npm

# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .

RUN turbo prune --scope=client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

ARG VITE_BACKEND_URL

# Have to generate db for typedefs to be present at build time (server doesn't get build)
RUN npx turbo db:generate
RUN npx turbo run build --filter=client

FROM base AS runner
WORKDIR /app

RUN npm install -g serve

RUN addgroup --system --gid 1001 react
RUN adduser --system --uid 1001 react
USER react

COPY --from=installer /app .

CMD serve -s apps/client/dist
