# CLI 个人网站 — 全栈实现方案

> 打造一个居中悬浮终端风格、苹果气质且轻量的个人求职主页，前后端解耦，便于让不同编码模型接手，并保留整体架构的可扩展性（未来可引入更多互动模块，但当前不实现）。文档面向自动化编码代理（“vibe coding”）。

## 1. 项目目标
- 页面中央为浮动终端面板，背景保持极简且富有层次。
- 终端启动时展示欢迎界面（ASCII 徽章、简介、提示 `help`）。
- 命令遵循 Linux 风格（小写、可带 flags、内建 `clear`、`ls`、`cat`）。
- 命令输出支持超链接与外部跳转（例如 `resume`）。
- 融入彩蛋：隐藏命令、动态光标、伪启动日志等。
- 采用模板化的前端代码库，方便不同模型或使用者直接 Fork 并按配置定制。
- 采用纯前端（静态）架构，保持轻量但预留模块化扩展能力，未来若添加互动模块可平滑接入（当前不实现）。
- 借助第三方隐私友好的统计服务（如 Cloudflare Web Analytics、Umami Cloud）记录访客数据，而无需自建后端。
- 主域名 `ruoxiangxu.com` 直接映射到 GitHub Pages (`ruoxiangxu.github.io`)，维持免费、轻量的部署；若自定义域临时失效，仍可手动访问 GitHub Pages 链接。
- 所有文档链接使用 `https://ruoxiangxu.com/resume` 等可读路径，并指向真实文件 `https://ruoxiangxu.com/resume.pdf`（失效时回退但保持 `ruoxiangxu` 前缀），未来其他文件也沿用该模式。
- 保持技术栈轻量：不引入与个人网站无关的复杂依赖或臃肿特性。
- 确保可定制性：所有个人信息、命令和链接都放在配置或环境变量里，仓库默认只包含占位数据。

## 2. 顶层架构
-```
site/        (Next.js 14 App Router, TypeScript, Tailwind, Framer Motion)
infra/
  workflows/ (GitHub Actions 工作流，用于构建/发布到 GitHub Pages)
```
- 可以是单包结构（`site/`）配合 `infra/workflows` 保存自动化脚本，如果未来扩展其它模块也能轻松挂载。
- 前端 100% 支持静态导出（`next export`），导出的静态资源仅部署到 GitHub Pages。
- 访客统计通过嵌入第三方脚本完成，无需自建可观测性链路。

## 3. 前置条件
- Node.js ≥ 20，pnpm ≥ 9。
- 需要 GitHub Pages 仓库权限，以及（可选）Cloudflare Web Analytics、Umami Cloud 等第三方统计服务账号。
- 如需统计访客，准备 Cloudflare Web Analytics、Umami Cloud 或其他第三方服务的 key。
- CLI 工具：`turbo`（可选）用于多包编排。

## 4. 前端方案（Next.js）

### 4.1 功能清单
1. **终端外壳**：居中 3D 玻璃拟态面板，背景渐变 + 星点纹理。
2. **启动界面**：自动打印 ASCII CMU 徽章、姓名、标语及 `Type 'help' to begin`。
3. **命令路由**：输入解析、模糊匹配、别名、历史导航、Tab 自动补全。
4. **输出类型**：
   - 纯文本行。
   - Markdown（`react-markdown` 渲染）。
   - 超链接块（带图标）。
   - 动作型输出（如 `resume` 自动打开 PDF、新标签访问 GitHub）。
5. **彩蛋命令（可选）**：`coffee`、`neofetch`、`matrix` 等动画反馈，可通过配置开关以保持最小化构建。
6. **分析钩子**：每次命令执行后可调用 `telemetry.ts` 中封装的方法向第三方统计服务发送匿名事件（可选，默认关闭），不依赖任何自建 `/api` 接口。
7. **苹果风格**：SF Pro 字体、圆角、柔和阴影、跳动光标。
8. **配置驱动**：`src/config/*.ts` 统一管理文案与命令，仓库默认使用占位内容，避免在代码里写死个人信息。
9. **文档路由**：实现 `/resume` Next.js 页面，统一 302 到托管在 GitHub Pages 仓库中的 `resume.pdf`（优先自定义域，回退 GitHub Pages 原始域）；CLI `resume` 亦指向该路由。

### 4.2 目录蓝图
```
site/
  app/
    layout.tsx
    page.tsx
    resume/
      page.tsx
  components/
    Terminal/
      TerminalFrame.tsx
      Prompt.tsx
      CommandHistory.tsx
      BootScreen.tsx
    OutputBlocks/
      TextBlock.tsx
      LinkBlock.tsx
      ActionBlock.tsx
  config/
    profile.ts
    commands.ts
    theme.ts
  lib/
    commandRegistry.ts
    parser.ts
    telemetry.ts
    easterEggs.ts
    resumeRedirect.ts
  styles/
    globals.css
    terminal.css
```

### 4.3 核心模块
- **`commandRegistry.ts`**：定义 `{ name, description, usage, handler, aliases }`，handler 返回 `CommandResponse`（text/link/action/markdown）。
- **`parser.ts`**：解析输入（支持引号、flags），输出 `ParsedCommand`。
- **`telemetry.ts`**：封装可选的 `navigator.sendBeacon` / `fetch`，向第三方统计服务发送匿名命令事件，默认关闭。
- **`config/theme.ts`**：苹果风配色、模糊、噪点开关。
- **`BootScreen`**：使用 `react-simple-typewriter` 或自研 hook 实现打字动画。
- **`resumeRedirect.ts`**：读取 `NEXT_PUBLIC_RESUME_HOST` + fallback 列表，决定 `/resume` 以及 `resume` 命令的跳转目标。

### 4.4 UI 状态
1. 空闲：展示启动画面。
2. 命令模式：输入聚焦、输出堆叠、发光光标。
3. 执行中：展示 `processing...` 或微动画。
4. 错误：红色提示＋使用建议。

### 4.5 初始命令表
| 命令 | 说明 | 行为 |
|------|------|------|
| `help` | 查看所有命令 | Markdown 列表 + 可点击标签 |
| `about` | 个人简介 | 多行文本 + 链接 |
| `resume` | 打开简历 | 输出含链接并自动访问 `/resume` |
| `projects` | 项目表格 | 点击跳转仓库 |
| `contact` | 联系方式 | 邮箱 mailto + LinkedIn |
| `history` | 查看历史命令 | 纯文本 |
| `clear` | 清屏 | 客户端动作 |
| `theme --light` | 切换主题 | 更新上下文 |
| `coffee` | 彩蛋 | ASCII 咖啡图案 |

### 4.6 样式要点
- Tailwind + 自定义配置（blur、drop shadow、neon accent）。
- 终端背景 `rgba(20,20,25,0.75)`，渐变描边 + 阴影。
- 移动端保持 90% 宽度的居中终端。

### 4.7 前端数据采集
- 在 `layout.tsx` 注入 Cloudflare Web Analytics 或 Umami Cloud 脚本，自动收集访客、地理、设备、来源等信息，无需自建接口。
- 若需要记录命令级事件，可在 `telemetry.ts` 中封装 `navigator.sendBeacon`，向 Umami/GA4 自定义事件端点发送匿名数据。默认关闭，可在 `config/analytics.ts` 中启用。

### 4.8 构建/运行
```sh
cd site
pnpm install
pnpm dev                     # 开发模式
pnpm build && pnpm next export  # 静态导出
```

### 4.9 测试策略
- `@testing-library/react` 覆盖解析和终端行为。
- Playwright 冒烟：打开页面、执行 `help`、验证简历链接。

### 4.10 区域感知
- 通过 `NEXT_PUBLIC_PRIMARY_DOMAIN`、`NEXT_PUBLIC_FALLBACK_DOMAIN` 设置 canonical/OG 链接。
- 根据 `navigator.language` 动态选择可在大陆访问的字体/CDN。

## 5. 访客洞察与外部集成
- **统计服务**：优先推荐 Cloudflare Web Analytics（无 Cookie，全球可用）或 Umami Cloud。通过 `config/analytics.ts` 控制是否注入脚本，默认关闭。
- **命令事件**：若需要追踪命令执行，可在 `telemetry.ts` 使用 `navigator.sendBeacon` 上报匿名事件到 Umami/GA4，且由配置决定是否启用。
- **第三方内容**：命令可跳转到 Notion、Medium、B 站、PDF 等，所有链接集中在 `config/profile.ts` / `config/links.ts`，方便模板用户替换。
- **简历托管**：`resume.pdf` 存放在 GitHub Pages 仓库内，映射后的访问路径为 `https://ruoxiangxu.com/resume.pdf`，同时保留 `https://ruoxiangxu.github.io/resume.pdf` 作为自然镜像；`/resume` 路由参考 `config/docs.ts` 统一输出。

## 6. 配置与密钥
- `.env`/`.env.local` 仅包含前端变量：`NEXT_PUBLIC_PRIMARY_DOMAIN`、`NEXT_PUBLIC_FALLBACK_DOMAIN`、`NEXT_PUBLIC_RESUME_HOST`、以及统计服务 ID（如 `NEXT_PUBLIC_UMAMI_WS_ID`）。
- `config/docs.ts` 维护 `/resume` 及未来文档的主/备链接。
- 提供 `profile.example.ts`、`commands.example.ts`、`analytics.example.ts`，用户复制后填写，不需要修改组件代码。

## 7. 域名与路由策略
- **GitHub Pages + 自定义域**：在 GitHub Pages（`https://ruoxiangxu.github.io`）后台绑定 `ruoxiangxu.com`，DNS 只需设置 `www` CNAME 指向 GitHub Pages，Apex 使用 ALIAS/ANAME（或官方 IP）即可，无需额外 CDN/OSS。
- **备用访问**：若 `ruoxiangxu.com` 暂时失效，可直接访问 `https://ruoxiangxu.github.io` 作为自然回退。
- **Resume 路由**：`app/resume/page.tsx` 为一个简单的静态页面，渲染后通过 `useEffect` 或 `<meta http-equiv="refresh">` 将浏览器跳转到在 `config/docs.ts` 中配置的主链接（通常是 `https://ruoxiangxu.com/resume.pdf`）。若未来需要切换到 GitHub Pages 原始域名，只需修改配置文件并重新部署，不在运行时做自动回退。CLI `resume` 命令统一跳到 `/resume`，未来其他文档沿用同样配置。
- **监控**：保持人工巡检或轻量化脚本定期访问主域与 Pages 域名，避免复杂的自动切换链路。

## 8. 部署策略
- **前端**：执行 `pnpm build && pnpm next export`，将 `out/` 目录发布到 GitHub Pages（`ruoxiangxu.github.io`）。使用 GitHub Actions（如 `deploy-frontend.yml`）自动完成构建与推送。
- **自定义域名绑定**：在 `ruoxiangxu.github.io` 的 GitHub Pages 设置中配置自定义域 `ruoxiangxu.com`，DNS 只需一次性添加 CNAME/ALIAS，SSL 由 GitHub 统一管理。
- **多环境配置**：通过 `config/env.{dev,prod}.ts` 或 `.env.*` 切换本地与生产的域名、Analytics ID。
- **双仓结构**：`CLI-personal-website` 作为模板/源码仓库，方便 Fork 和二次开发；导出的静态文件单独推送到部署仓库 `ruoxiangxu.github.io`，后者专用于 GitHub Pages。CI 可自动同步，也可用子模块统一管理。

## 9. Git 工作流与 CI/CD
- **提交规范**：仍采用 `<type>: <summary>` 小写格式，长度控制在 ~60 字符内。
- **分支策略**：所有特性在短期分支开发，通过 PR + CI 后合并 `main`。
- **CI 流程（`.github/workflows/ci.yml`）**：
  1. 触发：PR 与 `main` push。
  2. 步骤：checkout → 设置 pnpm 缓存 → 安装依赖 → `pnpm lint` → `pnpm test` → `pnpm --filter site build` → `pnpm --filter site next export`（或定义 `pnpm site:build`/`site:export`）。
  3. 产物：上传 `out/` 静态目录供后续部署任务使用。
- **CD 流程（`deploy.yml`）**：
  - `deploy-pages`：将 `out/` 推送到 `ruoxiangxu.github.io`（可用 deploy key 或 subtree push），触发 GitHub Pages 刷新。
  - 所需密钥：`GITHUB_TOKEN`、`PAGES_DEPLOY_KEY`（或具有 repo scope 的 PAT）以及统计服务相关 ID。
- **可视化**：在 README 添加 CI/CD badge，未通过检查禁止合并。

## 10. 模板自定义指南
- `src/config/profile.ts`（由 `profile.example.ts` 复制生成）存放所有文案，默认填充占位数据。
- 命令 schema 单独文档化，鼓励所有链接/标签保存在配置层而非组件中。
- 提供 `scripts/generate-command.ts` 脚本快速生成命令模版。
- 随仓库提供 `.env.example`，列出域名、简历地址、API Base 等变量，降低修改代码的需求。
- README 说明如何替换简历链接、社交账号、遥测开关以及禁用可选功能。
- 增设 `config/docs.ts`（或同类文件）维护 `/resume` 以及未来文档路由的主/备链接，确保重定向逻辑统一。
- README 需要写清：如何 Fork `CLI-personal-website`、修改 `src/config`、运行 `pnpm build && pnpm next export`，以及如何把导出的静态资源同步/推送到 `ruoxiangxu.github.io`（可用 GitHub Actions 自动化），方便社区复用。

## 11. 后续增强
1. **对话模式**：预留钩子，未来如需新增聊天体验，可通过命令进入独立场景（当前不实现）。
2. **主题市场**：支持 JSON 主题（复古绿、Matrix、Solarized）。
3. **勋章系统**：统计已运行的独特命令，通过 `badges` 命令展示。
4. **离线导出**：`print` 命令将页面渲染为 PDF，方便递交 HR。

## 12. 编码代理执行顺序
1. 初始化 pnpm workspace（可选），搭建 `site/`（Next.js + Tailwind + TS）。
2. 实现终端 UI 组件、命令解析/注册表，并从 `config/profile.example.ts` 引用占位数据。
3. 搭建 `/resume` 路由与 `config/docs.ts`，统一管理文档重定向。
4. 集成 `config/analytics.ts` 开关，在 Next.js `<Script>` 中按需注入统计脚本。
5. 完成彩蛋命令、链接输出与主题切换等交互细节。
6. 编写组件/解析单元测试与 Playwright 冒烟测试。
7. 配置 CI 运行 lint/test/build/export，并在 `deploy.yml` 中自动同步到 `ruoxiangxu.github.io`（GitHub Pages）。
8. 更新 README，写清 Fork、配置、构建、部署流程。

## 13. 验收标准
- 首屏显示居中终端 + 启动动画，`help` 正常输出。
- 命令支持超链接与外部跳转，`resume` 经 `/resume` 路由打开 `resume.pdf`。
- 统计脚本（开启时）能上报访问/命令等匿名事件，而无需任何自建后端。
- 仓库结构模板化（配置 + 文档），Fork 后无需改组件即可定制。
- README 说明清楚配置、构建、部署以及双仓发布流程。
- `ruoxiangxu.com` 与 `ruoxiangxu.github.io` 双域保持同步，全球/大陆访问顺畅。
