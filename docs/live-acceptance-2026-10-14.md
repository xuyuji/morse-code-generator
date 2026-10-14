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
- PASS：生产功能提交3a0d335已通过Cloudflare自动构建并承接100%流量；线上统计bundle逐字节等于本地已验证产物。 [构建记录](https://dash.cloudflare.com/0e406706300366fa2eb2edb388905b46/workers/services/view/dotsdashes/production/builds/c58bc47d-e258-436e-aca9-a2acd300c43d)
- PASS：发布后生产10页均包含同意组件；dev10页及两环境404均不启用组件，dev仍有noindex。
- PASS：正式浏览器首次访问没有Google标签；拒绝后刷新仍无Google标签。测试前无本站GA同意选择，当前测试选择为拒绝。
- PASS：后台重新读取属性设置，GMT+08中国时间与USD正确；Google Signals未开启，广告个性化保存为0/307地区允许。
- PASS：同意面板在约400px手机仿真下按钮可读、可操作、无横向溢出。12项测试及构建后脚本测试通过；后者补充了拒绝后重新允许应解除ga-disable的回归。
- PENDING：点击“允许统计”被自动审批拒绝，理由为接入授权未明确涵盖代用户向Google发送这次浏览信息。已请求该次测试授权，未绕过拒绝；因此本轮未验证允许后的网络请求、Cookie实际行为和GA4后台收数，也没有宣称连接成功或真实流量增长。
- PENDING：网络载荷实际抓包、真浏览器跨标签页撤回/允许后停止；目前只有构建脚本适配器测试。Clarity、录像遮罩/回放为N/A，本次没有接入。
- PASS：接入后再跑首页移动PageSpeed：性能97、无障碍100、最佳实践100、SEO100；FCP/LCP1.6秒，TBT0ms、CLS0、SpeedIndex3.9秒。 [发布后报告](https://pagespeed.web.dev/analysis/https-dotsdashes-com/qbceq6e1m8?form_factor=mobile)

## 仍未验证与运营交接

- 未取得真实iOS Safari/Android Chrome软键盘、音频中断与文件保存验收；桌面尺寸模拟不能替代真机。
- 新站无CrUX真实用户数据；Lighthouse分数不等于CWV现场合格或排名保证。已分别记录接入前基线和接入后的未同意状态实验室结果；尚未测量同意加载GA4后的性能。
- GSC提交、实际收录、外链推广由用户执行。Sitemap为https://dotsdashes.com/sitemap.xml。
- 等用户确认当前页面被GSC收录后，才进入二期；期间处理缺陷及统计验收，不新增工具页。
- GitHub保持公开，是用户明确的开源与推广实验；网站不展示个人仓库/账号，只公开contact@dotsdashes.com。

参考：[Google consent](https://developers.google.com/tag-platform/security/guides/consent)、[GA4配置](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)、[Cloudflare数据来源](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/)。
