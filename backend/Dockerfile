# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/prod
COPY tsconfig.json package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
# install with --production (exclude devDependencies)
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src/ src/.
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/tsconfig.json .


# run the app
USER bun
ENTRYPOINT [ "bun", "run", "dev" ]
