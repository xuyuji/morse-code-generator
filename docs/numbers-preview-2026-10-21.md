# Numbers 二期预览验收

范围：Numbers中英文页面和四类工具的关键操作统计；用户已通过dev预览，2026-10-21已合并main并自动部署生产。SOS/Chart未启动。

## 用户功能

- 数字字符串转换保留前导零，支持 `. , / : + -` 和空白分组；不推断日期，不做计算。
- 输入采用文本类型与decimal键盘提示，提供标点辅助键；数字结果逐位展示、逐位试听，另有静态0–9查表。
- 共用标准Morse映射、音频时序、播放/停止、速度/音调、复制和错误逻辑。
- 整段非法输入不可复制或播放；速查表仍可独立试听并停止。
- 未支持数字解码，内容明确引导到首页；Numbers无需复制Generator的WAV下载功能。
- 新页自指canonical、en/zh-Hans/x-default、WebApplication、相关内链和12页sitemap；dev禁止索引。

## 关键操作统计

复用既有GA4 ID和同意组件，没有Clarity，不新增增强型衡量或广告设置。事件名称分别为：

| 事件 | 实际含义 |
|---|---|
| tool_copy_success | 剪贴板API成功 |
| tool_copy_fallback | 自动复制失败，提供可选中的纯文本；不能当作复制成功 |
| tool_audio_start | 整段播放已开始调度 |
| tool_audio_stop | 用户主动停止 |
| tool_audio_error | 播放失败，不包含错误原文 |
| tool_reference_play | 单字符参考试听 |
| tool_wav_created | WAV已生成并触发浏览器保存，不保证用户最终保存 |
| tool_wav_error | WAV生成流程失败 |

只发送tool/action/language的固定白名单值。无输入、结果、数字、日期、字符、文件内容、设置值或错误原文。事件按名称可在GA4事件报告查看；按tool参数做常规自定义报表时需注册对应自定义维度。不同意前的操作不缓存、不追补；每次事件发送前重读同意状态，撤回、存储不可用、dev均不发送。

实现依据：[Google GA4事件API](https://developers.google.com/analytics/devguides/collection/ga4/events)。数字映射复用[ITU-R M.1677-1](https://www.itu.int/rec/R-REC-M.1677-1-200910-I/en)。

## 验证记录

- PASS：类型检查、15项核心/隐私测试；生产及dev构建的12页元信息/链接/隐私检查。
- PASS：构建后实际统计bundle的同意门控、白名单参数、拒绝/撤回、存储失败、dev零事件测试；不是网络抓包或GA4后台收数证据。
- PASS：Edge本地预览验证007保留三位、复制成功、03/04保留斜杠编码、非法字母/emoji禁用整段播放和复制、非法输入时仍可独立试听0并停止、播放中编辑立即停止。
- PASS：375px英文、375/430px中文尺寸模拟，无横向溢出；375英文输入顶部约304px，430中文约285px。控制台无错误。尺寸模拟不等于真机键盘或iOS验收。
- PASS：分支推送后dev页面返回200，英文HTML与本地dev产物逐字节一致；远程浏览器确认007结果、noindex且没有统计组件。用户视觉验收已通过。
- PASS：首页SOS解码、Generator WAV生成提示、Alphabet搜索筛选回归。
- PASS：main快进到8c7a015并推送，Cloudflare生产自动构建部署完成；正式中英文Numbers均200，线上脚本/CSS与本地生产构建逐字节一致。
- PASS：正式页canonical/hreflang、可索引状态、12 URL sitemap XML、robots、HTTP及www到主域名HTTPS的301跳转；首页/Alphabet/Generator资源回归；dev保持noindex。
- PASS：正式站007复制内容为 `----- ----- --...`；整段播放、逐位试听正常；非法字母/emoji禁用复制和播放；中文03/04保留顺序和斜杠。375px模拟文档宽度和滚动宽度均360px，无横向溢出。
- PASS：GA4实时后台测试前0活跃，测试后1活跃；观察到tool_copy_success、tool_audio_start、tool_reference_play各1条以及page_view。仅证明这些事件实际收到，不代表错误分支/WAV/停止事件全部线上验证。本次是验收测试流量，不计作自然增长。
- PASS：测试后通过页面撤回统计同意；撤回自动刷新和再次刷新后Google脚本均为0。
- PENDING：新Numbers页面GSC收录，由用户提交并后续观察；未将已有六页收录等同于新页收录。
- PENDING：iOS Safari/Android Chrome真机键盘、声音和复制体验。
