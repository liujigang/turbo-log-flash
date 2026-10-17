# Turbo Console Log Flash ⚡

> **极速、轻量、纯粹、基于 AST 语法树的跨语言调试日志插件 (JavaScript / TypeScript / Python / PHP)**

[English](./README.md) | [简体中文](./README.zh-CN.md)

[![GitHub license](https://img.shields.io/badge/license-Custom-blue.svg)](LICENSE.txt)
[![Tests](https://img.shields.io/badge/tests-1865%20passed-brightgreen.svg)]()
[![Package Size](https://img.shields.io/badge/vsix%20size-~205%20KB-orange.svg)]()
[![Package Manager](https://img.shields.io/badge/pnpm-v12-purple.svg)](https://pnpm.io)

---

## 📌 项目背景与来源

本项目 Fork 自开源项目 [Chakroun-Anas/turbo-console-log](https://github.com/Chakroun-Anas/turbo-console-log)。

原项目功能强大，但在后续迭代中引入了商业化 Turbo Pro 付费引导、后台 Git 提交拦截监听、工作区全盘扫描、用户行为数据埋点（Telemetry）、营销弹窗与 Webview 展示，导致扩展体积膨胀、启动变慢并增加了不必要的内存占用。

**Turbo Console Log Flash ⚡** 的核心宗旨是：**回归纯粹与极致性能 (Back to Core & Lightning Fast)**。我们对原项目进行了深度瘦身与工程现代化重构，**彻底剔除所有商业化与遥测代码，仅保留 100% 核心 AST 日志能力**，使扩展极度轻量、纯净且快速。

---

## ⚡ 核心改造与特性对比

| 维度 | 原项目 (Upstream) | Turbo Console Log Flash ⚡ |
| :--- | :--- | :--- |
| **商业化与 Pro 逻辑** | 包含 Pro 许可校验、付费弹窗、全工作区扫描等 | **彻底移除**，零商业负担，完全纯净开源 |
| **遥测与数据收集** | 内置 Telemetry 模块，上报用户行为与面板交互 | **彻底移除**，零网络请求，保护代码与操作隐私 |
| **启动与运行时开销** | `onStartupFinished` 全局常驻、监听文件系统与 Git | **按需惰性激活 (`onLanguage: *`)**，未打开对应代码时不占用任何资源 |
| **打包体积** | 散列多文件、包含大型图片与资源 | **单文件混淆 (540 KB)**，离线 `.vsix` 安装包仅 **~205 KB** |
| **包管理与工程栈** | npm / 混合脚本 | 全面拥抱 **pnpm v12**，依赖清晰隔离 |
| **现代依赖链** | 存在较多陈旧依赖与已废弃库 | 升级至 **ESLint 9、Jest 30、esbuild 0.25、Acorn 8.19** 等最新兼容版 |
| **测试完备度** | - | **149 个测试套件、1,865 个单元测试 100% 全部通过** |

---

## ✨ 功能特性

### 1. 智能精准的 AST 语法树推导
不同于简单的正则匹配或文本拼接，本项目使用语言原生的 AST 解析器（JavaScript/TypeScript 基于 `acorn`，Python 基于 `@lezer/python`，PHP 基于 `php-parser`）：
- **精准落点**：自动识别变量声明、三元表达式、对象字面量、解构赋值、函数参数、Promise 链式调用及循环体，确保日志总是插入在合法且符合逻辑的最佳行号。
- **上下文感知**：自动提取外层 Class 名、函数/方法名、文件名称与行号。

### 2. 多语言与多种日志级别支持
- **JavaScript & TypeScript**：
  - `console.log`、`console.error`、`console.warn`、`console.info`、`console.debug`、`console.table` 以及自定义日志函数。
- **Python**：
  - `print()`、`logging.debug()`、`logging.info()`、`logging.warning()`、`logging.error()` 及自定义日志函数。
- **PHP**：
  - `var_dump()`、`print_r()`、`error_log()` 及自定义日志函数。

### 3. 当前文件的高效日志治理
- **一键注释**：快速将当前文件中的所有调试日志批量注释。
- **一键取消注释**：恢复当前文件中被注释的调试日志。
- **一键删除**：一键彻底清理当前文件中的所有调试日志。
- **矫正更新**：重构或移动代码后，一键自动纠正日志中的文件名与行号。

---

## ⌨️ 快捷键速查

> Windows / Linux 用户请将 `⌘` 替换为 `Ctrl`。

### 1. 插入日志

| 命令 / 动作 | 语言 | 默认快捷键 (macOS) | 默认快捷键 (Win/Linux) |
| :--- | :--- | :--- | :--- |
| **Insert Log / print() / var_dump()** | 全语言 | `⌘K ⌘L` | `Ctrl+K Ctrl+L` |
| **Insert Error / logging.error()** | 全语言 | `⌘K ⌘E` | `Ctrl+K Ctrl+E` |
| **Insert Warn / logging.warning()** | JS/TS / Python | `⌘K ⌘R` | `Ctrl+K Ctrl+R` |
| **Insert Info / logging.info() / print_r()**| 全语言 | `⌘K ⌘N` | `Ctrl+K Ctrl+N` |
| **Insert Debug / logging.debug()** | JS/TS / Python | `⌘K ⌘B` | `Ctrl+K Ctrl+B` |
| **Insert Table** | JS/TS | `⌘K ⌘T` | `Ctrl+K Ctrl+T` |
| **Insert Custom Log** | 全语言 | `⌘K ⌘C` | `Ctrl+K Ctrl+C` |

### 2. 日志治理 (当前文件)

| 命令 / 动作 | 默认快捷键 (macOS) | 默认快捷键 (Win/Linux) |
| :--- | :--- | :--- |
| **Delete All Log Messages**（删除全部日志） | `⌥ Shift D` | `Alt+Shift+D` |
| **Comment All Log Messages**（注释全部日志） | `⌥ Shift C` | `Alt+Shift+C` |
| **Uncomment All Log Messages**（取消注释全部日志） | `⌥ Shift U` | `Alt+Shift+U` |
| **Correct All Log Messages**（矫正日志行号与文件名） | `⌥ Shift X` | `Alt+Shift+X` |

---

## ⚙️ 配置说明

打开 VS Code `设置 (Settings)`，搜索 `turboConsoleLog` 即可配置：

| 配置项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `turboConsoleLog.logMessagePrefix` | string | `🚀` | 日志前缀图标或文本 |
| `turboConsoleLog.logMessageSuffix` | string | `:` | 变量名前缀与值之间的后缀 |
| `turboConsoleLog.delimiterInsideMessage` | string | `~` | 打印各要素之间的分隔符 |
| `turboConsoleLog.quote` | string | `"` | 引号风格（可选 `"`、`'`、`` ` ``） |
| `turboConsoleLog.includeFilename` | boolean | `true` | 是否在日志中包含文件名 |
| `turboConsoleLog.includeLineNum` | boolean | `true` | 是否在日志中包含所在行号 |
| `turboConsoleLog.insertEnclosingClass` | boolean | `true` | 是否提取并打印外层 Class 名称 |
| `turboConsoleLog.insertEnclosingFunction` | boolean | `true` | 是否提取并打印外层函数/方法名 |
| `turboConsoleLog.wrapLogMessage` | boolean | `false` | 是否用大括号 `{ variable }` 包裹变量 |
| `turboConsoleLog.addSemicolonInTheEnd` | boolean | `false` | 是否在语句末尾追加分号 |
| `turboConsoleLog.insertEmptyLineBeforeLogMessage` | boolean | `false` | 是否在日志上方插入空行 |
| `turboConsoleLog.insertEmptyLineAfterLogMessage` | boolean | `false` | 是否在日志下方插入空行 |
| `turboConsoleLog.logFunction` | string | `log` | 执行 "Insert Custom Log" 时的自定义打印函数名 |

---

## 🛠️ 本地开发与构建

本项目采用 **pnpm** 管理依赖。

```bash
# 1. 克隆代码
git clone https://github.com/liujigang/turbo-console-log-flash.git
cd turbo-console-log-flash

# 2. 安装依赖
pnpm install

# 3. 编译打包 (开发态带 SourceMap)
pnpm run esbuild

# 4. 监听变动实时编译
pnpm run watch

# 5. 代码检查与类型检查
pnpm run lint

# 6. 运行单元测试 (1,865 个测试用例)
pnpm run test:jest

# 7. 打包离线 VSIX 安装包
pnpm run package
```

打包完成后，根目录下会生成 `turbo-console-log-flash-<version>.vsix`，可通过 VS Code 命令直接安装：
```bash
code --install-extension turbo-console-log-flash-3.29.0.vsix
```

---

## 📄 开源许可与致谢

- 本项目 Fork 自 [Chakroun-Anas/turbo-console-log](https://github.com/Chakroun-Anas/turbo-console-log)，非常感谢原作者 **Chakroun Anas** 及所有原始贡献者对 AST 调试日志核心算法的卓越贡献。
- 本项目遵循开源规范，已剔除原项目中所有独占的 Turbo Pro 商业逻辑、品牌元素与专有素材，仅对开源核心部分进行维护与优化。
- 详情请参阅 [LICENSE.txt](./LICENSE.txt)。
