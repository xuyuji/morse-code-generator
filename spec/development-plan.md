# 内页开发优先级

更新：2026-10-13。用户已选定A「清晰工具台」，移动端优先。本次MVP执行批0+批1，三类工具均包含英文和简体中文页面。后续批次不在本次交付范围。本计划只定义分批顺序，不作工时或日历承诺。工具细节见 [工具目录](tool-catalog.md)，页面边界见 [产品方案](product-plan.md)。

## 执行基线：批次、页面路径与主打词

后续按下表批次和批内顺序推进开发。域名已确定为 `https://dotsdashes.com`，下表使用相对于该域名的站内路径；这些是规划路径，不代表已经上线。调整批次或拆合页面时先更新本文件，再同步产品方案。主打词定义页面主要搜索意图，不要求Title机械逐字相等。

| 批次 | 页面路径 | 主打词 |
|---|---|---|
| 批0：首页 | `/` | morse code translator |
| 批1：核心配套 | `/morse-code-alphabet` | morse code alphabet |
| 批1 | `/morse-code-generator` | morse code generator |
| 批2：参考需求 | `/morse-code-numbers` | morse code numbers |
| 批2 | `/sos-morse-code` | sos morse code |
| 批2 | `/morse-code-chart` | morse code chart |
| 批3：练习与创作 | `/morse-code-practice` | morse code practice |
| 批3 | `/morse-code-tattoo` | morse code tattoo |
| 批4：横向扩展 | `/binary-translator` | binary translator |
| 批4 | `/base64-decode` | base64 decode |
| 批4 | `/hex-to-decimal` | hex to decimal |
| 批4 | `/nato-phonetic-alphabet` | nato phonetic alphabet |
| 批5：选择性扩展 | `/caesar-cipher-decoder` | caesar cipher decoder |
| 批5 | `/a1z26-cipher` | a1z26 cipher |
| 批5 | `/tap-code` | tap code |
| 批5 | `/bacon-cipher` | bacon cipher |
| 批5 | `/leetspeak-translator` | leetspeak translator |
| 批5 | `/url-decoder` | url decoder |

批1先满足查表/试听和音频制作；批2补齐数字、SOS与打印；批3增加重复使用和作品导出；批4验证跨工具能力；批5根据查询与反馈选择性推进。原搜索量/KD未复核，本顺序是产品优先级，不是精确收益排名。

独立价值要求：Generator提供参数、时长和WAV制作；Chart提供打印材料；Practice提供练习反馈；Tattoo包含可校验的图形及手链模式。具体范围以工具目录和产品方案为准。URL Decoder开发前重新评估搜索机会。

## 待验证候选：尚未编入固定批次

| 规划页面路径 | 主打词 | 排入批次的前提 |
|---|---|---|
| `/morse-code-decoder` | morse code decoder | 音频输入、识别准确性及失败诊断通过验证；文字解码已在首页 |
| `/vigenere-cipher-decoder` | vigenere cipher decoder | 明确有key与无key任务边界，验证目标功能；有key解密不能冒充自动破解 |
| `/semaphore-flags` | semaphore flags | 原创图形、收发视角与可访问表达通过验证 |
| `/braille-translator` | braille translator | 明确语言、Grade及数字/大写规则，并完成专业校验 |

这些候选不是自动排在批5之后；验证通过后结合需求明确插入批次。

## 合并承接：暂不单独建页

| 暂缓独立路径 | 覆盖词 | 当前承接页面 |
|---|---|---|
| `/text-to-morse-code` | text to morse code | `/`，Text → Morse模式 |
| `/morse-to-english` | morse to english | `/`，Morse → Text模式 |
| `/morse-code-audio` | morse code audio | `/morse-code-generator` |
| Bracelet独立路径暂不设定 | morse code bracelet | `/morse-code-tattoo`的手链模式 |

尚未存在的URL不创建空壳或无意义重定向。以后拆页要有独立任务或交付物。

## 如何进入下一批

逐页完成、逐页发布，同批不要求同一天上线。每页应满足：工具任务完整；A视觉和手机操作通过验收；算法/标准/错误边界校验；独立内容与元信息；真实canonical、内链和sitemap配置；发布后的功能与抓取检查。

前一批无阻断功能缺陷、无系统性抓取或重复意图问题，即可推进下一批；无需等待全部页面收录，也不靠固定发页频率“养站”。结合实际查询和用户行为调整后续队列。音频Decoder若技术验证和需求证据充分，可以提前，不必机械排在所有横向工具后。

当前状态：正在实现批0+批1正式MVP与GitHub/Cloudflare自动部署；线上验证以交付记录为准。
