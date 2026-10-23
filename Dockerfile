# SEG Phase 3 production image
# Builds the Vite client and bundled Express server, then starts Express.
FROM node:22-bookworm-slim

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm check && pnpm build

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]
