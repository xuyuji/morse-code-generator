# GitHub与Cloudflare部署

仓库：https://github.com/xuyuji/morse-code-generator 。Cloudflare账户为用户已登录的个人账户，ID已在wrangler.jsonc明确指定。

## 分支与环境

| Worker | 分支 | 构建命令 | 部署命令 | 域名 |
|---|---|---|---|---|
| dotsdashes | main | `npm run check && npm test && node scripts/build.mjs production && npm run check:build` | `npm run deploy:ci -- production` | dotsdashes.com；www跳转主域名 |
| dotsdashes-dev | 非main分支 | `npm run check && npm test && node scripts/build.mjs dev && npm run check:build` | `npm run deploy:ci -- dev` | dev.dotsdashes.com |

Workers Builds提供`WORKERS_CI_BRANCH`和`WORKERS_CI_COMMIT_SHA`。脚本拒绝非main部署生产，main触发dev时跳过部署。两个Worker必须独立连接仓库，不能在生产Worker的构建中越过CI名称检查部署dev Worker。dev的生产分支设为`dev`，预览分支启用其他非main分支，预览命令也使用`npm run deploy:ci -- dev`，使其真正更新共享dev域名。最近完成的成功部署覆盖共享dev，不是每分支独立域名。

GitHub Actions另行执行验证；Cloudflare自身构建也执行同样检查，部署不依赖两套系统之间的执行先后。依赖版本与package-lock固定，公共npm registry在项目.npmrc中声明。

## 域名与索引

- 主域名使用HTTPS；Cloudflare区域设置开启Always Use HTTPS，www通过Cloudflare Redirect Rule归一到主域名，保留路径。
- 静态HTML路径统一尾斜杠；不存在页面返回404，不使用SPA回退。
- dev生成meta noindex、X-Robots-Tag noindex/nofollow/noarchive及robots Disallow，canonical指向生产。dev公开可访问，不作为私有内容存储。
- 生产robots允许抓取，sitemap只有已实现的10个语言页面，不包含404或占位内页。
- 关闭默认workers.dev和版本预览URL；开发预览使用已绑定dev域名。

## 手动恢复与发布

先确认当前commit、目标环境、构建结果。生产：`node scripts/build.mjs production`后`npx wrangler deploy --env ''`；开发：`node scripts/build.mjs dev`后`npx wrangler deploy --env dev`。不要将开发产物部署到生产。自动部署通过CI脚本验证环境标记。

Cloudflare Dashboard可查看各Worker的部署版本并恢复已验证版本；回滚后需修复分支代码，避免下一次推送重新带入问题。本项目没有数据库迁移或用户数据。

首次连接记录与实际线上检查见 [MVP验收](mvp-validation.md)。配置说明不等于配置已验证，只有该记录中的实际结果才代表完成状态。
