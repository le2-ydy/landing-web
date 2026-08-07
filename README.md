# 悦店云官网

Vue 3、Vite 与 Vite SSG 构建的官网静态站点。生产构建会为每个公开路由预渲染 HTML，镜像仍由
Nginx 提供服务；官网与演示地址在构建时从仓库内的 `.env.production` 写入静态产物。

## 本地开发

```bash
npm ci
npm run dev
```

本地 Vite 未配置 `VITE_SITE_URL` 时会从浏览器当前 origin 推导站点地址，未配置
`VITE_DEMO_URL` 时隐藏“在线体验”。需要联调演示入口时创建不会提交的
`.env.development.local`：

```dotenv
VITE_DEMO_URL=https://demo0.yue0.le2.ltd
```

可参考 `.env.example` 配置站点验证码等公开的 Vite 构建变量。不要在 `VITE_` 变量中保存密钥。

## 检查与构建

```bash
npm run lint
npm run test
npm run typecheck
npm run build
# 或一次运行全部门禁
npm run check
```

生产构建从 `.env.production` 读取 `VITE_SITE_URL` 与 `VITE_DEMO_URL`，并通过 Vite 写入前端
静态资源；修改地址后必须重新构建并发布镜像。路由级标题、描述、canonical、robots 和结构化数据
会写入各页面 HTML，并包含 `public` 中维护的 `sitemap.xml`、`robots.txt` 与预渲染的静态 `404.html`。
生产域名或公开路由变化时，需要同步更新 `public/sitemap.xml`。

## 容器运行

```bash
docker build --target production -t zuyu-landing-web .
docker run --rm -p 8080:80 zuyu-landing-web
```

镜像由 `.github/workflows/docker-buildx-registry.yml` 构建并推送多架构版本；工作流不接收任何
地址参数或 GitHub 地址变量。镜像的运行部署由仓库外部系统负责。
