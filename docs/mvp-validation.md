# MVP实现与验收

日期：2026-10-13。范围：批0+批1，A视觉，中英文首页/Alphabet/Generator，支持页和Cloudflare双环境部署。

## 本地已验证

- Astro类型检查：0 errors / 0 warnings；文档本地链接检查通过。
- 9项核心测试通过，覆盖全部声明字符回环、大小写/空白、Unicode拒绝、错误位置、字母/单词间隔、PARIS/Farnsworth时序、WAV头与静音、越界参数。
- 生产静态构建成功，10个语言页面的唯一H1、canonical、hreflang、本地链接/资源、sitemap与输出目录隔离通过。
- Edge中实际编码`SOS HELLO 2026`、切方向还原、非法`... xx`禁用复制/播放。
- 六个工具语言页面在375/430px视口无横向溢出，每页一个H1；390px观察了首页、中文Generator和Alphabet。Edge滚动条占15px，内容宽度小于设定视口。
- 中文Generator：20 WPM字符速度、10 WPM整体速度，HELLO WORLD时长显示11.6秒；Play/Stop状态正确。
- 浏览器实际下载WAV并由Python wave读取：单声道、22050Hz、16位PCM、11.555秒。
- Alphabet搜索小写`s`只显示S，点击进入播放状态。

## 上线检查

- dotsdashes.com与dev.dotsdashes.com已绑定独立Workers，HTTPS证书有效。
- HTTP主域名返回301到HTTPS；www的301保留路径和查询参数，归一到dotsdashes.com。
- dev线上响应包含X-Robots-Tag: noindex, nofollow, noarchive。
- codex/mvp推送22f2336触发Cloudflare自动构建并发布成功；dev的build-info.json返回完整对应commit。
- 生产首页浏览器实际转换HELLO WORLD、复制成功提示、清空后Undo恢复均通过。
- main生产自动发布：待最终推送验证后补充。

## 验证边界

桌面Edge的尺寸模拟不能替代iOS Safari/Android真机软键盘、设备音频中断和系统下载行为验收。未做真实用户CWV、独立声学测量、GSC提交或排名验证。结构化数据不伪造评价，不保证软件富结果。GEO采用可抓取的明确回答、标准来源和功能边界，没有“保证被AI推荐”的承诺。
