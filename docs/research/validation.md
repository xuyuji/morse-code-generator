# 本轮交付与验证记录

日期：2026-10-13。环境：用户Mac上的Edge扩展浏览器，Node本机服务。结论限定于设计原型，不是生产验收。

## 已执行

| 检查 | 结果/证据 |
|---|---|
| 25个主词Google首页查询 | 完成代表来源记录，见serp-sample.md；实际google.com.hk，英文+美国偏好参数，位置未知 |
| 竞品一手页面阅读 | 见competitors.md，明确区分功能观察、站点自述与推断；dCode Caesar抓取超时已标注 |
| 25项用户画像与场景 | 每项含至少2场景、输入输出、边界、依赖；画像均标为假设 |
| 三方案手机宽度 | A/B/C在360、375、430px下document scrollWidth=clientWidth；390px另截图检查。桌面Edge滚动条占15px，因此实际内容宽比设定视口窄15px |
| 桌面扩展 | A双栏，B主区+参数侧栏，C主区+速查旁栏；已截图观察，1719px视口无横向溢出 |
| 实时编码 | `SOS` → `... --- ...`；默认HELLO WORLD点划输出正确 |
| 方向切换/解码 | SOS编码切回得到SOS；`... --- ... / .... ..`得到SOS HI |
| 非法输入 | `... x`显示未知片段，复制/播放禁用；不是伪造成功结果 |
| 空输入 | 清空后播放禁用 |
| 播放/停止 | 点击Play显示Playing和Stop；点击Stop停止状态。未用独立声学设备测量频率或间隔 |
| WAV导出 | 浏览器真实生成`morse-20wpm.wav`；Python wave可读：单声道、22050Hz、16-bit PCM、149499帧、6.78秒；文件位于本机Downloads |
| 复制权限降级 | 本次自动化环境clipboard未完成写入；已观察超时后出现手动选择复制提示。**成功写入剪贴板未验证** |
| 长输入 | 300个W得到1199字符结果，桌面未横向溢出；最长输入的全部设备性能未测 |
| 脚本/文档 | `npm run check`：本地Markdown链接、引用文件存在性和脚本语法检查；不是完整测试套件 |

截图：[三案对比](../design-previews/comparison.jpg)、[A手机](../design-previews/A-mobile.jpg)、[B手机](../design-previews/B-mobile.jpg)、[C手机](../design-previews/C-mobile.jpg)。

## 仍需正式实现/实机验证

- iOS Safari与Android Chrome软键盘、安全区、原生分享/下载、音频中断、屏幕阅读器；尺寸模拟不能替代。
- 全部标准映射与扩展标点、可逆性、prosign、Unicode归一化、播放与导出时序的完整核心测试。
- 清空撤销、精确数字参数输入、复杂设置sheet焦点管理、生产PWA/离线缓存。
- 真实域名、canonical、sitemap、robots、结构化数据、Rich Results适用项、GSC验证/提交、抓取与收录。
- 生产性能、真实用户CWV、慢网/内存压力。未执行Lighthouse，也没有现场数据。

## 本轮边界

原型位于prototypes，带noindex；没有公开部署，没有注册域名，没有修改GSC、购买外链或复用竞品版权图稿。没有生成25个占位页面。推荐视觉A但尚未收到用户选择。
