# 落地页多阶段镜像：安装依赖、构建静态资源，并由 Nginx 统一提供服务。
ARG IMAGE_MIRROR
ARG IMAGE_PREFIX
ARG VITE_SITE_URL

# 依赖阶段仅复制锁文件，便于复用 npm ci 的构建缓存。
FROM ${IMAGE_MIRROR:-${IMAGE_PREFIX}}node:alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 构建阶段注入站点地址；站点所需图片由自身源码管理。
FROM dependencies AS build
ARG VITE_SITE_URL
ENV VITE_SITE_URL=${VITE_SITE_URL}
COPY . ./
RUN npm run build

# 运行阶段只保留 Nginx 配置和编译后的 dist 目录。
FROM ${IMAGE_MIRROR:-${IMAGE_PREFIX}}nginx:latest AS production
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
