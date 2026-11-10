# Mayday Blue Web

Mayday Blue 网页版，基于 TanStack Start（React 19 + Vite 8 + Tailwind v4）。

当前是 demo 阶段：只打通了微信扫码登录，以及查看「我的预设」。数据和账号都和小程序共用同一个 CloudBase 环境。

## 本地开发

```sh
bun install
bun run dev:mock   # 不连 CloudBase，用内存 mock；登录页有「模拟确认」按钮
bun run dev        # 连真实 CloudBase，需要先按 .env.example 配置 .env
```

## 登录是怎么工作的

1. 网页服务端调用 `auth` 云函数的 `createLogin`，拿到小程序码和 ticket。poll secret 存进 HttpOnly cookie，不会交给前端 JS。
2. 用户用微信扫码，打开小程序的 `pages/login/web` 页面并确认。云函数从小程序调用里拿到可信的 openid，写入这次登录。
3. 网页每 2 秒轮询一次 `pollLogin`。确认后拿到 session token，存进 HttpOnly cookie `mb_session`，有效期 30 天。
4. 之后服务端调用 `preset` 云函数时带上 `webSession`，云函数自己查 `web_session` 表来确认用户身份。

云函数和数据表在 [mayday.blue-mp](https://github.com/may-today/mayday.blue-mp) 仓库：`cloudfunctions/auth`、`cloudfunctions/preset` 和 `cloudbase/migrations/20261110060000_web_login.sql`。

## 目录

- `src/routes`：页面。`/` 首页、`/login` 扫码登录、`/presets` 我的预设、`/presets/$id` 预设详情。
- `src/lib/*.functions.ts`：server functions，浏览器通过 RPC 调用。
- `src/server/*.server.ts`：只在服务端运行，包括 CloudBase 调用、cookie 读写和 mock。
