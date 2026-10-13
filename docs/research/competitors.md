# 竞品如何完成用户任务

2026-10-13。入口是 [25组Google首页样本](serp-sample.md)，下表进一步读了竞品自身页面；Morse Code World 做了文本输入实测，Cryptii / MCW / Ice Fractal 查看了浏览器截图和界面。其余为第一方页面内容/控件观察，未逐个做端到端实测。没有审计全部源代码和网络调用；“站点声明本地”不等于我们已证明全站无网络。

## 观察矩阵

| 竞品与覆盖任务 | 它如何满足需求（观察） | 数据/服务依赖证据与边界 | 我们如何取舍 |
|---|---|---|---|
|[MCW Translator](https://morsecode.world/international/translator.html)：translator/generator/text-to-morse/morse-to-English|上下输入输出；播放、停止、重复、速度/音调/音量；灯光/振动、保存声音、分享谜题。实测 `SOS HELLO 2026` 正确转为点划|映射与时序可本地实现是我们的架构判断；其分享区有服务器错误/内容过滤提示，不能认定分享也纯本地；实际有广告iframe|学习声音紧邻结果的流程，收起高级参数；移动端不照搬竖滑杆与双层导航|
|[Ice Fractal](https://icefractal.com/morse/)：即时翻译/敲击|两框可输入、beep敲击、自适应节奏、音频/闪光、字母卡下载|页面提供自制Morse字体MIT许可说明；没有发现核心任务必需远程数据的证据，未作网络审计|把敲击作为后续输入方式；不复制其背景纹理和表格先于工具的布局|
|[Online Text Tools](https://onlinetexttools.com/convert-text-to-morse)：文本生成|输入/结果、文件导入、下载、自定义短长符号、可点示例、管线和付费入口|自称浏览器工具；Pastebin是外部导出；免费/付费限制以当前站点为准|自定义符号有价值但应保留规范复制；不引入基础复制的付费阻断|
|[Cryptii Morse](https://cryptii.com/pipes/morse-code-translator/)：管线转换|输入→参数→输出横排；支持符号与时序表示；可加转换节点|页脚声明浏览器执行、无服务端交互，MIT开源；不意味着广告等无外部请求|借鉴可理解的转换过程；手机纵向呈现，不首发整个管线编辑器|
|[CodeBug Alphabet](https://www.codebug.org.uk/learn/step/540/morse-code-alphabet/)：查字母|图表配简短教学与活动链接|静态字母图/教学材料；内容有版权|使用标准数据自制可点击字符表；图片不是唯一可访问信息载体|
|[Coddy Numbers](https://coddy.tech/tools/morse-code-translator/morse-code-numbers)：数字|0–9、数字规律、年份/时间/混合字符的例子；正文说明翻译器预填数字|依赖确定映射；本轮正文抓取未执行其动态工具|加入年份/小数/电话任务；其“6–9尾部点数加五”文字与表格相冲突，不能直接抄竞品说明，算法以标准为准|
|[MCW SOS](https://morsecode.world/SOS.html)：SOS|大图解释三短三长三短、试听/灯光/振动，强调prosign连续发送|复用音频时序即可，无需第三方音频资产；未实测声音|专门处理无字母间隔的求救信号，不能把普通 `S O S` 输出当同一节奏|
|[The Morse Lab Chart](https://themorselab.com/morse-code-chart/)：打印|A4/Letter、黑白、PNG、口袋卡、儿童练习纸、复古版|静态下载材料、自述按ITU核对；未下载验证所有文件|chart页面以自制打印交付物区分alphabet；首期先做两种纸张与黑白|
|[LCWO](https://lcwo.net/)：practice|Koch课程、字组/词/呼号练习、统计、MP3练习下载；部分练习无需登录|账户用于设置/进度；词库/课程数据需要来源和维护，不能直接抓取其题库|首版免注册短练习、正确率和错字回练；不做社区和排行榜|
|[MCW Audio Decoder](https://morsecode.world/international/decoder/audio-decoder-adaptive.html)：audio/decoder|录音或文件，频谱/阈值/速度调节，自适应频率和速度；自标实验性|声明麦克风内容不发服务器；需要浏览器音频能力和信号处理，未开启麦克风|单独研发质量门槛，优先文件样本；不能承诺所有噪声录音准确|
|[Ink Studio](https://inkstudioai.com/tools/morse-code-tattoo-generator)：tattoo/bracelet邻近|短文本→图形点划预览，名字/日期/短语，完整参考表；向专业创作产品导流|此页无证据表明简单点划需要AI；相关图片/风格迁移属于另外产品|本地图形排版/反向核对/自制SVG；手链珠子数量与分隔是我们新增假设|
|[RapidTables Binary](https://www.rapidtables.com/convert/number/binary-to-ascii.html)：binary|编码选择、输入文件/二进制文件、转换/交换/复制/保存、逐字计算例子|编码标准与字节算法；未审计实际文件处理位置|默认UTF-8，明确字节分组、ASCII限制和错误位置，保留学生理解路径|
|[Base64Decode](https://www.base64decode.org/)：base64|字符集、逐行处理、Live模式、文件解码、复制|页面明确Live UTF-8模式浏览器处理；文件上传走服务器并有删除期限，不能称整体纯前端|本站文本/文件均本地，区分Base64URL与普通；不静默修复无效编码|
|[BinaryHexConverter](https://www.binaryhexconverter.com/hex-to-decimal-converter)：hex|数值转换，明示最大7fffffffffffffff，示例与按位计算|数学算法，无必需远程数据；页面明确范围上限|本地BigInt精确整数，支持更大值但设置合理长度限制；带符号/小数分开说明|
|[NATO官方](https://www.nato.int/en/about-us/nato-history/history-by-theme/symbols-of-nato/nato-phonetic-alphabet)：nato|标准字母与历史说明，权威参考|标准拼读表；复制插图需核对授权，本站自制排版|拼读用户姓名/订单号、可复制分词；TTS不是权威发音，按需再做|
|[Branah](https://www.branah.com/braille-translator)：braille|英文↔盲文，Grade1/2，Unicode/ASCII；明示Grade2仍可能错误|UEB规则与缩写不是单一字符映射；未确认其实际库|放后期，使用可审计翻译表/库并做专家核对；不宣称可直接用于正式标牌|
|[Meyerweb](https://meyerweb.com/eric/tools/dencoder/)：url|极简输入框和encode/decode，说明可保存离线使用|页面明确离线可用，源码采用CC BY-SA；本站不需复用其代码|保留一步操作，加非法百分号/UTF-8诊断及`+`模式，结果不是可自动打开的链接|
|[Cryptii Caesar](https://cryptii.com/pipes/caesar-cipher/)：caesar|转换管线与编码/解码|页面声明本地开源；dCode Caesar本轮抓取超时，未把其细节当已验证|位移已知直接换算；未知位移列候选是我们需求建议，语言评分为可选数据|
|[Guballa](https://www.guballa.de/vigenere-solver)：vigenere|未知密钥破解；选语言、变体和密钥长度|其功能明确需要语言假设；底层语料/部署未审计|先做已知key模式；自动破解需许可语料、置信提示与短文本失败处理|
|[Boxentriq Tap](https://www.boxentriq.com/encodings/tap-code)：tap|双向、Code Type、方阵、示例|页面声明本地；其I/J表与常见越战C/K表不同，是变体而非可混用标准|显式选择/说明方阵；默认选择与官方史料一致，不静默混表|
|[1337.me](https://1337.me/)：leet|输入即出、pro-mode多字符替换、反向转换，页面称支持语音输入|替换表可本地；语音浏览器能力不等于离线；其密码更安全的宣传不能直接沿用|先支持轻/重两级，反向提供歧义；不做密码安全承诺|
|[Mothereff Bacon](https://mothereff.in/bacon)：bacon|24/26字母选择、两框、permalink|页面链接bacon-cipher实现与GitHub；标准变体固定表|双态映射和分组诊断；共享链接不默认包含用户内容|
|[Cryptii A1Z26](https://cryptii.com/pipes/a1z26-cipher/)：a1z26|字母→序号，声明非字母会丢弃|确定映射，本地自述|比竞品多解释丢弃/歧义，保留词间隔；`111`不强猜一种答案|
|[dCode Semaphore](https://www.dcode.fr/semaphore-flag)：semaphore|点选姿势解码，文字编码，正/背视图，数字/字母模式|图形/姿势映射；源码不公开，结果有署名许可说明|自绘SVG并核对标准；手机图形键盘，明确观察者视角|

## 新发现与候选清单

| 候选功能 | 来源/证据 | 价值假设 | 代价/建议 |
|---|---|---|---|
|逐字试听和高亮|MCW字符参考入口、声音联动|理解输出，提高信任|低–中，P1|
|Farnsworth间隔|MCW高级参数|帮助听懂完整速度的字符|中，音频制作/练习阶段|
|敲击输入|Ice Fractal|不会输入点划也能试|中，需手机长按/手势冲突测试|
|音频文件解码|MCW decoder|处理真正听到的信号|高，独立样本库和信噪比评估|
|谜题链接|MCW分享|传播和回访|中，隐私、内容上云和索引边界需要先定|
|A4/Letter/黑白打印|The Morse Lab|教师/童子军带离屏幕|低–中，自制素材并视觉验收|
|手链珠子清单/间距校验|tattoo SERP与创作任务推断|减少制作错误|中，尚未验证需求，先访谈手作用户|
|Base64逐行/文件|Base64Decode|开发调试多条数据|中，Worker/内存限制，P3|
|Vigenère无key破解|Guballa|匹配谜题解码意图|高，语料许可/算法，后置|
|字符不支持与错误位置|MCW `#`；Cryptii丢弃规则|减少复制错误结果|低，P0必做|
|离线核心/PWA|Meyerweb离线与移动优先要求|重复使用、低网速|中，候选；实测缓存更新后再宣传|

## 外部依赖结论

本站大多数工具只需标准/变体数据随构建打包，没有理由逐次调用付费API。真实复杂依赖是：专业盲文规则库及许可；未知key破解的语言统计；练习材料的许可与教学顺序；音频识别的算法与测试样本；可打印/图形导出资产。字体、广告、分析属于页面服务依赖，不要与转换算法依赖混为一谈。详情和一手标准见 [工具目录](../../spec/tool-catalog.md)。

上述竞品需求值得学习，但错误说明、广告布局或营销安全承诺并非因为上首页就可靠。我们保留证据并独立校验，避免复制内容/图稿/不清楚许可的源码。
