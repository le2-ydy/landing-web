# 落地页多阶段镜像：安装依赖、构建静态资源，并由 Nginx 统一提供服务。
ARG IMAGE_MIRROR
ARG IMAGE_PREFIX

# 依赖阶段仅复制锁文件，便于复用 npm ci 的构建缓存。
FROM ${IMAGE_MIRROR:-${IMAGE_PREFIX}}node:alpine AS dependencies
ARG NODE_REGISTRY
WORKDIR /app
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    set -eu; \
    if [ -n "${NODE_REGISTRY:-}" ]; then \
        npm config set registry "$NODE_REGISTRY"; \
    fi; \
    npm ci --no-audit --no-fund

# 构建阶段注入站点地址；站点所需图片由自身源码管理。
FROM dependencies AS build
ARG VITE_SITE_URL
ENV VITE_SITE_URL=${VITE_SITE_URL}
COPY . ./
RUN npm run build

# 运行阶段只保留 Nginx 配置和编译后的 dist 目录。
FROM ${IMAGE_MIRROR:-${IMAGE_PREFIX}}nginx:latest AS production
ARG APT_REPOSITORY
LABEL org.opencontainers.image.title="Zuyu Landing Web" \
    org.opencontainers.image.description="Static landing site served by Nginx"
RUN set -eu; \
    if [ -n "${APT_REPOSITORY:-}" ]; then \
        if [ "${APT_REPOSITORY#https://}" != "$APT_REPOSITORY" ] && [ ! -s /etc/ssl/certs/ca-certificates.crt ]; then \
            apt-get update; \
            DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ca-certificates; \
            rm -rf /var/lib/apt/lists/*; \
        fi; \
        for apt_sources in /etc/apt/sources.list /etc/apt/sources.list.d/debian.sources; do \
            [ ! -f "$apt_sources" ] || sed -i -E "s#https?://(deb|security)\.debian\.org#${APT_REPOSITORY}#g" "$apt_sources"; \
        done; \
    fi; \
    apt-get update; \
    apt-get install -y --no-install-recommends curl; \
    rm -rf /var/lib/apt/lists/*
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --link --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD ["curl", "--fail", "--silent", "--show-error", "http://127.0.0.1/healthz"]
