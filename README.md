# DotsDashes

移动端优先的双语摩斯密码工具站，视觉采用A「清晰工具台」。英文默认，简体中文位于 `/zh/`。正式域名：**https://dotsdashes.com**；共享开发环境：**https://dev.dotsdashes.com**。

## MVP范围

- `/`、`/zh/`：双向文字转换、明确错误位置、复制/手动降级、播放/停止、声音设置、清空撤销。
- `/morse-code-alphabet/`及中文版本：字母/数字/标点筛选、搜索、点击试听。
- `/morse-code-generator/`及中文版本：速度、音调、Farnsworth间隔、时长、WAV导出。
- 双语About/Privacy、404、canonical、hreflang、站点地图、真实WebApplication标记。

输入仅在浏览器处理，不进入网址、日志或浏览器存储。国际摩斯码不直接支持汉字，不自动转拼音；录音识别不在本次范围。

## 本地开发

使用Node 22.12+及npm：

```bash
npm ci
npm run dev
```

开发地址以命令输出为准。`npm run check`检查类型和文档；`npm test`验证转换、时序与WAV；`node scripts/build.mjs production`生成生产静态文件；`npm run check:build`校验产物；`npm run build:dev`生成带noindex的开发版本。

历史三案原型使用 `npm run prototype`，位于 [本机对比页](http://127.0.0.1:4173/compare.html)。`prototypes/`和项目研究资料不会包含在生产构建中。

## 部署

采用Cloudflare Workers Static Assets。`wrangler.jsonc`顶层为 `dotsdashes`，`dev`环境为 `dotsdashes-dev`。

Cloudflare Workers Builds连接同一个GitHub仓库：生产仅main，开发接收其他分支。每个Worker使用各自的构建与部署命令；具体配置、复核与回滚见 [部署说明](docs/deployment.md)。dev为公开预览，带noindex与禁止抓取配置；这些配置不是访问控制。

## 项目文档

| 内容 | 文件 |
|---|---|
| Agent约定 | [AGENTS.md](AGENTS.md) |
| 页面批次及主打词 | [开发优先级](spec/development-plan.md) |
| 定位、路由与验收 | [产品方案](spec/product-plan.md) |
| 25项工具画像、场景和依赖 | [工具目录](spec/tool-catalog.md) |
| 视觉与移动交互 | [设计方案](spec/design-system.md) |
| 技术模块与隐私 | [工程方案](spec/architecture.md) |
| 原关键词表（未复核） | [SEO输入](docs/research/seo-input.md) |
| SEO依据与修订 | [SEO复核](docs/research/seo-review.md) |
| 25词Google样本 | [SERP样本](docs/research/serp-sample.md) |
| 竞品功能与新需求 | [竞品分析](docs/research/competitors.md) |
| 设计参考 | [视觉参考](docs/research/design-references.md) |
| 初始原型验证 | [历史验证记录](docs/research/validation.md) |
| MVP实现与验收 | [MVP交付记录](docs/mvp-validation.md) |

研究中的搜索量/KD/CPC未经复核，画像是待验证假设。SERP为Google香港域名下的英文样本，不等同美国本地排名。未声称排名、AI推荐或GSC收录已完成。
