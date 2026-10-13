# 工程方案与初始化边界

当前仓库包含Astro正式站、产品规格、研究资料和独立视觉原型；部署验证见docs/mvp-validation.md。用户已确认A视觉、dotsdashes.com域名和Cloudflare部署，已实现批0+批1正式页面，原型保留为评审材料。

## 推荐技术路线

采用静态 HTML 优先，正式实现使用 Astro + TypeScript，交互使用小型客户端模块；只有练习/复杂解码状态确实需要时引入 UI 框架。选择理由是静态正文、表格和内链易于维护，转换无需服务端。依赖版本固定于package.json及package-lock.json。正式站使用静态Astro页面与TypeScript客户端模块，原型单独保留。

部署采用Cloudflare Workers Static Assets，服务Astro静态构建产物；初期不需要Worker请求处理脚本或SSR适配器。生产主域名使用 `https://dotsdashes.com`，发布时配置www重定向至主域名，并校验HTTPS和canonical。实际部署状态见交付记录。参考 [Cloudflare官方文档](https://developers.cloudflare.com/workers/static-assets/)。初期不需要数据库、账号系统、服务器函数或远程转换服务。生产构建目录必须与 prototypes 分离，原型有 noindex，开发服务器仅监听本机。

## 正式实现的模块边界

| 模块 | 职责 | 不承担的内容 |
|---|---|---|
| core/morse | 标准映射、字符归一化、encode/decode、诊断和token | DOM、音频、埋点 |
| core/timing | token → tone/silence，1/3/7时序与Farnsworth | 显示动画和浏览器计时器 |
| audio | Web Audio实时播放，复用时序生成PCM/WAV | 外链音频或服务器转码 |
| exports | 当前复制纯文本与WAV；SVG/打印材料留待后续批次 | 未经授权的竞品图片 |
| ui | 输入/结果、模式、状态、参数面板和辅助输入 | 另写第二套映射 |
| content | 路由元数据、标准来源、说明、相关工具 | 未完成页面的预发布占位 |
| analytics（未接入） | 未来仅动作和匿名错误类别 | 输入、输出和文件内容 |

当前转换接口返回 `{ output, morse, diagnostics, letters }`；有诊断时不提供可播放的morse串，阻止误用不完整结果。diagnostics 包括输入位置与可操作的修复原因；核心纯函数只保证声明支持的字符。国际Morse先支持A–Z/0–9及逐项核对的标点；扩展字母、prosign、American Morse是不同规则，不暗中混入。

## 性能和隐私

- 快速文本转换本地同步；大文件与音频解码按需加载并放 Worker，提供取消和大小上限。
- 音频根据 AudioContext 时间调度，不能靠 setTimeout 的精度定义声音；视觉高亮跟随同一时间轴。
- WAV 是容器编码步骤，Web Audio 本身不直接提供“下载 WAV”；复用标准时序输出PCM和正确文件头。
- 首屏不加载录音/解码库、远程字体或完整语料；使用系统字体/自托管许可字体。
- 输入输出用文本节点呈现；下载SVG/HTML不执行用户提供的标记；文件类型不能只信扩展名。
- 页面初始加载需要网络不等于输入上云；若未来接入分析/广告，继续保证输入不被采集，且避免承诺整个页面“零请求”。

## 验证范围

核心单测：全部标准映射回环、空白/换行、非法点划、Unicode不可支持字符、含标点、SOS prosign与普通字母不同间隔、PARIS时序、停止和重复播放、WAV头/时长。回环只适用于可逆规范化输入。

浏览器验收：手机软键盘、复制拒绝、下载格式/文件名、麦克风授权拒绝（将来解码器）、音频中断、读屏标签、焦点可见、200%缩放和reduced-motion。首页工具初始HTML可发现；线上canonical/sitemap/robots/GSC按SEO文档另验。

## 开发命令

命令以package.json为准：dev用于正式Astro站，prototype用于历史原型；check执行类型/文档检查，test执行核心测试；构建与部署流程见docs/deployment.md。
