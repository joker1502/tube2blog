# Tube2Blog

Turn YouTube videos into SEO-optimized blog posts with AI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui (Nova preset) |
| Auth | Supabase Auth (email OTP + Google OAuth) |
| Database | Supabase PostgreSQL + Prisma ORM |
| AI | Vercel AI SDK + OpenCodeGo (DeepSeek models) |
| Payment | Creem |
| Cache | Upstash Redis (optional, YouTube transcript) |
| Deployment | Vercel |

## Project Structure

```
tube2blog/
├── prisma/
│   ├── schema.prisma          # 数据库 Schema
│   ├── migrations/            # Prisma 迁移文件
│   └── prisma.config.ts       # Prisma 配置
├── public/
│   ├── logo.svg               # Logo (橙色)
│   ├── favicon.svg            # Favicon (SVG)
│   ├── favicon.ico            # Favicon (ICO)
│   ├── favicon-96x96.png      # Favicon (PNG)
│   ├── apple-touch-icon.png   # iOS 图标
│   └── og-image.png           # OG 分享图
├── src/
│   ├── app/                   # App Router 页面
│   │   ├── page.tsx           # 首页 (工具页)
│   │   ├── features/          # 功能营销页
│   │   ├── pricing/           # 定价页
│   │   ├── blog/              # 博客 (列表 + 详情 + 标签)
│   │   ├── sign-in/           # 登录
│   │   ├── sign-up/           # 注册
│   │   ├── auth/              # 旧登录入口 (Magic Link)
│   │   ├── dashboard/         # 仪表盘 (新文章/文章列表/账单/设置)
│   │   ├── admin/             # 管理后台
│   │   ├── team/              # 团队管理
│   │   ├── settings/          # 用户设置
│   │   ├── checkout/          # Creem 支付跳转
│   │   ├── privacy/           # 隐私政策
│   │   ├── terms/             # 服务条款
│   │   └── api/               # API 路由
│   │       ├── generate/      # AI 文章生成 (流式)
│   │       ├── webhooks/creem/# Creem 支付 Webhook
│   │       └── admin/         # 管理后台 API
│   ├── actions/               # Server Actions
│   │   ├── auth.ts            # 登录/登出
│   │   ├── checkout.ts        # Creem 结算
│   │   ├── create-post.ts     # 创建文章
│   │   └── team.ts            # 团队管理
│   ├── components/
│   │   ├── ui/                # shadcn/ui 组件
│   │   ├── features/          # 业务组件
│   │   │   ├── auth-form.tsx
│   │   │   ├── blog-generator.tsx
│   │   │   ├── checkout-button.tsx
│   │   │   └── app-sidebar.tsx
│   │   ├── header.tsx         # 公共导航栏
│   │   ├── footer.tsx         # 公共页脚
│   │   ├── theme-provider.tsx # 主题切换
│   │   ├── markdown-content.tsx # Markdown 渲染
│   │   └── json-ld.tsx        # JSON-LD 结构化数据
│   ├── lib/
│   │   ├── ai/provider.ts     # AI Provider 配置
│   │   ├── creem/             # Creem 支付 (签名验证 + 结算)
│   │   ├── supabase/          # Supabase 客户端 (server/client/middleware)
│   │   ├── youtube/transcript.ts # YouTube 字幕提取
│   │   ├── prisma.ts          # Prisma 客户端单例
│   │   ├── blog.ts            # 博客数据读取
│   │   └── schema.ts          # JSON-LD Schema 生成
│   ├── content/blog/          # MDX 博客文章 (8篇)
│   ├── proxy.ts               # 路由保护 Proxy
│   └── __tests__/             # Vitest 测试
├── .env.local                 # 环境变量 (本地)
├── .env                       # DATABASE_URL
├── next.config.ts             # Next.js 配置
├── vercel.json                # Vercel 部署配置
├── vitest.config.ts           # 测试配置
├── components.json            # shadcn/ui 配置
└── package.json
```

## Environment Variables

```bash
# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=https://rsutzxyzneyzivkfmlfn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Creem Payment
CREEM_API_KEY=creem_...
CREEM_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CREEM_PRO_PRODUCT_ID=prod_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Provider (OpenCodeGo)
OPENCODEGO_BASE_URL=https://opencode.ai/zen/go/v1
OPENCODEGO_API_KEY=sk-...
OPENAI_API_KEY=

# Database (Prisma)
DATABASE_URL=postgresql://prisma_user:...@db.xxx.supabase.co:5432/postgres?pgbouncer=true

# Redis Cache (optional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Development

```bash
npm run dev        # 开发服务器 (localhost:3000)
npm run build      # 生产构建
npm start          # 生产模式
npm test           # 运行测试
npm run lint       # ESLint
```

## Key Architecture Decisions

### AI Provider
- 使用 `@ai-sdk/openai-compatible` + OpenCodeGo
- 模型: `deepseek-v4-flash` (默认), `deepseek-v4-pro` (高质量)
- 通过 `getAIModel(tier)` 调用，业务代码不直接引用 SDK

### Proxy (代替 Middleware)
- Next.js 16 弃用了 `middleware.ts`，改用 `proxy.ts`
- 仅匹配受保护路由 (`/dashboard`, `/settings`, `/team`, `/admin`)
- 公开页面不走 proxy，提升性能

### Prisma v7
- 使用 `@prisma/adapter-pg` 驱动适配器
- 生成客户端在 `src/generated/prisma/`（已 .gitignore）
- 构建时自动执行 `npx prisma generate`

### SEO
- 首页 title 直接含品牌名 `- Tube2Blog`
- 子页面通过 title template `%s - Tube2Blog` 自动追加
- 非公开页面 (dashboard/admin) 设置 `robots: { index: false }`
- 首页 FAQ Schema + 文章页 Article Schema (JSON-LD)
- Google Analytics: G-6CC8HV421L

## Deployment

```bash
# 提交并推送 (Vercel 自动部署)
git add -A && git commit -m "message" && git push origin main

# Vercel 环境变量 (已配置):
# NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# CREEM_API_KEY, CREEM_WEBHOOK_SECRET, NEXT_PUBLIC_CREEM_PRO_PRODUCT_ID,
# NEXT_PUBLIC_APP_URL, OPENCODEGO_BASE_URL, OPENCODEGO_API_KEY,
# OPENAI_API_KEY, DATABASE_URL
```

## Routes

| Path | Type | Auth | Description |
|------|------|------|-------------|
| `/` | Static | No | Tool page (YouTube → Blog) |
| `/features` | Static | No | Marketing page |
| `/pricing` | Static | No | Pricing (Free/Pro/Business) |
| `/blog` | Static | No | Blog list with tag filters |
| `/blog/[slug]` | SSG | No | Blog post detail |
| `/blog/tag/[tag]` | SSG | No | Blog posts by tag |
| `/sign-in` | Dynamic | No | Login (email + OAuth) |
| `/sign-up` | Dynamic | No | Register (email + OAuth) |
| `/dashboard/*` | Dynamic | Yes | Dashboard pages |
| `/settings` | Dynamic | Yes | User settings |
| `/team` | Dynamic | Yes | Team management |
| `/admin` | Dynamic | Yes | Admin panel |
| `/checkout` | Dynamic | No | Creem checkout redirect |
| `/api/generate` | Dynamic | No | AI blog generation |
| `/api/webhooks/creem` | Dynamic | No | Creem webhook |
| `/sitemap.xml` | Static | No | Sitemap |
| `/robots.txt` | Static | No | Robots |

## Tests

```bash
npm test
# 9 tests (extract-video-id: 6, verify-signature: 3)
```
