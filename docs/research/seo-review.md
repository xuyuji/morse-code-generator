# SEO 交接复核与项目发布标准

核查日期：2026-10-13。范围：Google 官方文档及 Google 所维护的 web.dev；下文的「事实」是来源支持的结论，「项目建议」是结合本站作出的决策，不代表 Google 排名规则。本次未访问本站 GSC，也未重新采集搜索量、CPC、KD 或外链数据。

## 结论

保留「工具先用、内容解决具体问题、按需求逐步发布」方向；删除标题逐字匹配、固定外链数、每页强制 FAQ/音频/双向转换等机械要求。发布单位是独立用户任务，不是关键词变体。首页、generator、text-to-morse、morse-to-English 最容易出现意图重叠，应先以一个强工具覆盖，再用 SERP 与真实需求证明拆页价值。

用户提供的词量、KD、CPC 和批次保留为研究输入，状态均为**未复核**。缺少来源数据库、国家/语言、采样日期及 KD 计算方式，不能据此承诺排名难度、商业回报或外链投入。社群经验可作实验假设，不作为技术验收依据。

## 逐项核查

| 交接说法 | 事实与官方依据 | 项目建议 |
|---|---|---|
| Title/H1 必须与主打词逐字一致，覆盖词不能出现在 Title | Google 要求标题准确、简洁、有区分度，避免堆词；允许简洁品牌和有用描述，也可能依据页面显著标题等重新生成搜索标题。没有「只能一个精确词」规则。[标题文档](https://developers.google.com/search/docs/appearance/title-link) | H1 用自然的任务名称，如 `Morse Code Translator`；Title 可用 `Morse Code Translator — Text, Audio & Decode`，但只承诺已实现功能。品牌确定后再决定是否附加。一个显著 H1 是本站语义与设计约定，不是排名魔法。 |
| 有 FAQ 必须加 FAQPage | **FAQ 富结果已自 2026-05-07 停止展示**，2026-06-15 官方移除相关文档。不能继续引用「政府和医疗站可用」作为当前规则。[官方更新记录](https://developers.google.com/search/updates) | 保留确实有助于用户的问答，默认不生成 FAQPage，不为了结构化数据硬凑 3–5 问。 |
| 工具站常用 HowTo | Google 的 HowTo 富结果已在 2023 年停止支持。[官方公告及后续更新](https://developers.google.com/search/blog/2023/08/howto-faq-changes) | 步骤说明按任务需要提供，不为 HowTo 富结果投入开发。 |
| 工具页一律 WebApplication，Rich Results Test 必须通过 | Google 支持 SoftwareApplication 的 WebApplication 子类型；软件应用富结果还要求名称、价格、真实评分或评论等属性；符合标记要求也不保证展示。[软件应用文档](https://developers.google.com/search/docs/appearance/structured-data/software-app) | 可用真实的 WebApplication 描述应用；没有真实、合规且可见的评价时，不伪造 aggregateRating，不把获得软件富结果设为上线门槛。区分 JSON-LD 语法/语义有效与 Google 富结果资格。 |
| Sitemap 必须手写 | 手写可行；Google 文档也推荐由网站软件生成。提交只是发现提示，不保证抓取或索引。[Sitemap 文档](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | 构建时从已发布路由生成，避免人工遗漏；只含可索引的规范 URL，lastmod 只在有实质更新时改变。 |
| 批量上页面必死 | Google 禁止以操纵排名为主、缺少新增价值的规模化内容，不是禁止共享模板或一次发布多页。[规模化内容政策](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content) | 复用布局、算法和组件；拒绝只换关键词/默认文本的薄页面。每个路由要说明独立任务、独有功能或材料、边界与测试。 |
| 每页需要 15–60 条外链 | 官方不存在这种达标配额；为操纵排名购买、自动制造或过度交换链接可能违反 link spam 政策。[链接垃圾政策](https://developers.google.com/search/docs/essentials/spam-policies#link-spam) | 删除外链数 KPI。争取教师资源引用、开源项目引用、独特可打印材料的自然推荐；推广看相关性和真实使用。 |
| 每页上线后必须 GSC 手动提交 | URL Inspection 适合少量 URL；批量发现可用 sitemap。重复申请不会加速，抓取可能需要几天至几周，也不保证收录。[重新抓取文档](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) | 首批关键页检查一次并酌情请求索引；后续靠正常内链和 sitemap。记录提交、抓取、索引为三个不同状态，未执行时不能勾选完成。 |
| CWV 好即可排名；外部音频一定影响 LCP | CWV 被排名系统使用，但良好成绩不保证前排；LCP、INP、CLS分别衡量加载、响应与稳定性，不能仅凭资源是否外链判断 LCP。[页面体验](https://developers.google.com/search/docs/appearance/page-experience)、[CWV](https://developers.google.com/search/docs/appearance/core-web-vitals) | Web Audio 本地合成是产品与性能选择。音频在用户操作后启动；不自动播放、不首屏加载大文件。通过实际性能测量定位瓶颈。 |
| 每页 canonical 自指 | canonical 是规范化信号；重复内容应统一规范 URL，内链、sitemap 等应保持一致。[规范化文档](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | 真正独立的公开页自指；重复或废弃 URL 合并/重定向。不能用自指 canonical 把近似重复页变成独立需求。 |
| 每页固定回首页 + 2–3 条相关链接 | Google 推荐可抓取链接和有意义的锚文本，没有固定条数。[链接最佳实践](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | 保留 Logo 回首页、任务相关的下一步链接，通常 3–5 个即可；禁止未来空壳页进入导航。 |

## 我们的页面拆分规则

以下是待 SERP 与产品验证的建议，不是已测得结论。

- `/`：即时双向文字转换、复制、播放，负责通用翻译需求。
- `/morse-code-generator`：只有具备明显独立的音频/信号制作流程、速度与音调设置、文件导出，才独立上线；否则先作为首页模式。
- `/text-to-morse-code` 与 `/morse-to-english`：先作为模式和查询覆盖词。只有存在独立需求证据和足够不同的首屏交互时再拆页；不要为了维持原表而提前发布。
- `/morse-code-decoder`：若首期仅解点划文本，与首页重叠；当有录音/音频文件解码、错误诊断等实质功能时，更容易形成独立任务。音频解码需明确质量与噪声限制。
- `/morse-code-alphabet` 与 `/morse-code-chart`：前者可做点击试听与逐字学习，后者可做打印/PDF/高对比速查。若两页只是同一张表，先合并。
- `/morse-code-audio`：与 generator 需明确定义边界。建议先共享一套音频能力和一个主路由，不并行制造两张近似工具页。
- `/morse-code-numbers`、`/sos-morse-code`、`/morse-code-practice`：分别围绕数字时序、SOS连续信号、练习反馈设计；不强制套用完整双向转换器。
- Tattoo/bracelet：围绕名字和短语排版、可校验字符、点划与珠子间隔、导出设计稿；不要只复刻翻译器加纹身介绍。
- Binary/Base64/URL/hex/ciphers：按各自编码语义设计，不统一假定「完整符号表」或「输入即出结果」总是合适。大型文件和易误判输入需要显式操作及错误状态。

## SEO 与体验验收清单

此清单为本站工程标准。未发布的设计稿不应声称已通过线上检查。

### 每个可索引路由发布前

- [ ] 有独立用户任务与首屏交互；已完成页面内实际承诺的功能，没有 Coming soon 外壳。
- [ ] Title、一个显著 H1、meta description 描述实际任务；不同页面能被用户区分，不堆变体词。
- [ ] 英文页面设置 `lang="en"`；表单有标签，键盘可用，错误信息说明具体字符/位置及修复方法。
- [ ] HTTP 200；生产环境无误加 noindex、robots 阻断或登录墙；不存在意外 soft 404。
- [ ] 主标题、说明、重要对照表与内链在初始 HTML 中可读。此项是本站稳健性与性能选择，不代表 Google 不能渲染 JS。
- [ ] canonical、内链、sitemap 指向一致的生产规范 URL；预览域名不进入 sitemap。
- [ ] 首页/同族页面可通过真实 `<a href>` 到达；没有孤页、死链、空壳路由。
- [ ] 在 375px 移动端视口，用户不滚动即可看见并开始主要任务；无大片介绍/广告挤占工具。
- [ ] 转换规则与标准来源明确；能处理空值、非法字符、空格、换行、大小写、超长输入，以及该工具特有边界。
- [ ] 适用的 JSON-LD 与页面内容一致；无伪造评论或评分。富结果适用类型运行 Rich Results Test；不适用或不具备资格时明确记录原因。
- [ ] 性能测试记录设备、网络和环境；不能把 Lighthouse 分数写成线上 CWV 合格证明。

### 性能目标与上线后核查

真实用户数据按移动/桌面分别看第 75 百分位，目标为 LCP ≤ 2.5 秒、INP ≤ 200 毫秒、CLS ≤ 0.1。[Google web.dev 的指标与评估方法](https://web.dev/articles/vitals)

新站可能暂无足够 CrUX 数据；此时记录「暂无现场数据」，用实验室测试排查加载和布局问题，并积累真实用户数据。转换输入不上传至分析平台，事件只记录模式/动作/成功或错误类别，不记录原文。

线上核查：域名验证、sitemap 提交和 URL Inspection 都需要真实生产域名及权限。本研究没有执行这些操作。发布后分别记录可访问性、Google 选择的 canonical、索引状态、搜索展示与工具成功使用；不把「已提交」等同「已收录」。

## 建议发布节奏

以下是产品实验安排，不是 Google 要求的等待期或索引比例门槛。

| 阶段 | 发布范围 | 进入下一阶段的判断 |
|---|---|---|
| 0：核心闭环 | 首页翻译器；About/Privacy/反馈入口等必要支持页 | 真实设备转换、复制、播放成功；索引技术配置正确；无关键使用阻断。 |
| 1：学习与参考 | alphabet；numbers/SOS 中已做出独立价值的 1–2 页；generator 仅在独立制作流程已就绪时加入 | 用户可以完成具体任务；路由边界不重叠；首批抓取/规范化情况清楚。 |
| 2：能力深化 | practice；chart 打印材料；音频生成/解码与创作工具按需求证据选择 | 有使用行为、反馈、SERP 或搜索查询支持投入；核心页面没有系统性质量问题。 |
| 3：横向编码工具 | binary、Base64、hex、NATO 等逐工具发布 | 已明确数据标准、错误语义和独立用户画像；共享基础设施稳定。 |
| 4：长尾工具族 | braille、URL、经典密码、tap/leetspeak 等 | 先满足各工具标准与用户限制，再谈更多关键词覆盖。 |

每周复盘抓取/索引问题与功能使用，每 2–4 周评估搜索查询和页面边界。此频率为内部工作节奏，不意味着 Google 会在同等时间内收录或排名。若出现大范围「已抓取未编入索引」、重复 canonical 或低使用率，先诊断内容差异、内部链接和功能价值；不立即靠加页数或外链数补救。

## 后续仍需验证

1. 原 SEO 表的国家、语言、设备、时间及来源；不同 KD 口径不能混作统一评分。
2. 实际 Google SERP 的意图重叠：尤其 translator/generator/text-to-morse/audio 与 alphabet/chart。
3. 生产域名、品牌名、GSC 和分析权限；未确定前不能生成真实 canonical 或声称提交完成。
4. 用户反馈与实际任务完成情况。关键词量只描述搜索需求的一部分，不能替代功能优先级验证。
