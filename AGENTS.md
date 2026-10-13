# 项目约定

用中文与用户沟通；网站以英文为默认语言，同时提供自然的简体中文文案；英文根路径，中文 `/zh/`。

## 工作入口

- 开始排期、选下一页或准备发布前，读 `spec/development-plan.md`，按批次范围与逐页验收推进。

- 开始产品、路由或范围调整前，读 `spec/product-plan.md`。以用户任务决定页面边界，关键词表是研究输入。
- 实现工具前，读 `spec/tool-catalog.md` 对应条目及 `spec/architecture.md`；核对标准、非法输入和有损转换。
- 修改 UI 前，读 `spec/design-system.md`。**移动端优先，接近原生 app 的操作体验**是硬约束；先验收 375–430px，再扩展桌面。
- 修改 SEO、导航或发布配置前，读 `docs/research/seo-review.md`。只让完整可用页面进入导航和 sitemap。
- 复核竞品/需求时，读 `docs/research/competitors.md` 与 `docs/research/serp-sample.md`；区分现场观察、站点自述和待验证推断。

## 开发约束

- 网站唯一公开联系方式为 `contact@dotsdashes.com`。页面、元数据和静态产物仅使用品牌身份；不得公开个人姓名、私人邮箱、个人账号/仓库链接、账户ID或提交号。发布前检查完整 `dist/`，构建记录留在产物目录外。

- 转换逻辑以纯函数独立于 UI；输入文本、文件和录音默认仅在设备上处理，不进入日志、埋点或 URL。
- 有损转换和未知符号必须显式呈现，不能悄悄删除后报告成功。
- 映射表、音频时序和导出共用同一份规范化数据；引用标准并记录变体。
- 为算法边界和关键用户流程做必要验证；视觉原型采用手工交互与响应式检查。
- `prototypes/` 是设计评审材料，禁止直接部署为生产站。正式UI采用用户已确认的A「清晰工具台」，B/C保留为历史参考。
- 交付记录已验证项目和仍待线上验证项目；GSC、收录、现场 CWV、第三方权限未经实际检查不得标为通过。

## 当前阶段

当前MVP范围为批0+批1：首页、Alphabet、Generator，均提供中英文版本。视觉采用A；用户已购买 dotsdashes.com，并确认Cloudflare部署。生产主域名为 https://dotsdashes.com；部署采用Workers Static Assets。品牌文字暂按DotsDashes实施，Signal Desk仅为历史原型名。main自动部署生产；其他分支部署共享dev环境，dev禁止索引。执行命令以 `package.json` 为准。
