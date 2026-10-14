# Live 验收与 GA4 接入

2026-10-14。范围为批0+批1，中英文三类工具及支持页；未启动二期。

## 已完成的线上验收

- 生产和dev各10个语言页面均200，唯一H1、生产canonical正确；dev有noindex。
- 两环境未知路径、旧公开build-info.json、Git配置、Wrangler配置均404。
- HTTP→HTTPS、www→主域名均301，www保留路径及查询参数。
- 首页编码SOS 2026?、反向还原、Unicode点划归一化、非法组报位置并禁止播放/复制、辅助点划按钮通过。
- Generator的HELLO WORLD在20/10 WPM下显示11.6秒；越界音调禁止播放/下载；下载动作完成且页面显示WAV已创建。本轮下载事件监听未取得文件路径，文件头/PCM校验沿用前次真实下载证据和本轮核心测试，不冒称新文件已重读。
- 中文Alphabet搜索s只显示S。
- 6个工具页分别在375和430px Edge尺寸模拟中无横向溢出；内容宽度因滚动条为360/415px。375px时输入顶部在230–325px内，可以首屏开始操作。无浏览器控制台错误。
- 首页移动PageSpeed：性能100、无障碍100、最佳实践100、SEO100；LCP1.5秒、TBT0ms、CLS0。报告采用低速4G、模拟Moto G Power、Lighthouse13.5.0。 [报告](https://pagespeed.web.dev/analysis/https-dotsdashes-com/u3i7x7dv7n?form_factor=mobile)
- 本地类型/文档检查通过，12项核心及隐私边界测试通过；完整构建的身份隐私、路由/元信息/链接/sitemap隔离检查通过。

## 本轮发现与处理

Cloudflare在边缘注入性能统计beacon。现有隐私文案只描述应用代码，已补充真实线上性能统计情况，并明确区分需同意的GA4和Cloudflare无分析Cookie的性能统计。未发现阻断工具使用的功能缺陷。

## GA4配置与边界

- 媒体资源：DotsDashes；属性558917187；Web数据流DotsDashes Web，16124674521；网址https://dotsdashes.com；衡量ID `G-CKK50DSR0C`。
- 用户确认报表时区Asia/Shanghai、货币USD。创建表单选择中国时间、美元。
- 增强型衡量在创建向导中未正确持久化；进入已创建数据流再次关闭，刷新页面已确认关闭。
- 仅生产主机已知页面允许加载，dev、404、未知路径及noindex禁用。
- 明确同意前不加载Google脚本；广告同意始终denied；Google Signals与广告个性化由代码禁用。只发送固定页面访问，不采集输入、输出或音频，无Clarity。
- 统计page_location不带query/hash，referrer仅origin，标题为静态页面标题；每页单次手动page_view。
- 可拒绝、从页脚重开偏好、撤回并清理本站控制的GA Cookie；跨标签页拒绝停止采集；存储失败不授予同意。
- 构建后的实际脚本在最小DOM适配器中验证：未选择/拒绝零脚本、重复允许单次page_view、URL脱敏、撤回、跨页拒绝、存储失败、环境门控。此检查不等于真实网络抓包。
- 正式发布、浏览器同意流程及GA后台收数：待本轮发布后追加。

## 仍未验证与运营交接

- 未取得真实iOS Safari/Android Chrome软键盘、音频中断与文件保存验收；桌面尺寸模拟不能替代真机。
- 新站无CrUX真实用户数据；Lighthouse分数不等于CWV现场合格或排名保证。PageSpeed报告为接入GA4前基线。
- GSC提交、实际收录、外链推广由用户执行。Sitemap为https://dotsdashes.com/sitemap.xml。
- 等用户确认当前页面被GSC收录后，才进入二期；期间处理缺陷及统计验收，不新增工具页。
- GitHub保持公开，是用户明确的开源与推广实验；网站不展示个人仓库/账号，只公开contact@dotsdashes.com。

参考：[Google consent](https://developers.google.com/tag-platform/security/guides/consent)、[GA4配置](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)、[Cloudflare数据来源](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/)。
