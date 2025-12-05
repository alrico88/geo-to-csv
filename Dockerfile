# syntax = docker/dockerfile:1.2.1

ARG BUN_VERSION=oven/bun:1.3.3-alpine

FROM $BUN_VERSION AS dependency-base

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY package.json .
COPY bun.lockb .
COPY .npmrc .
RUN bun install

FROM dependency-base AS production-base

# build will also take care of building
# if necessary
COPY . .
RUN bun run build

FROM $BUN_VERSION AS production

COPY --from=production-base /app/.output /app/.output

# Service hostname
ENV NUXT_HOST=0.0.0.0

# Run in production mode
ENV NODE_ENV=production

# start the app
CMD [ "bun", "/app/.output/server/index.mjs" ]