# Turbo Console Log Flash ⚡

> **Ultra-fast, lightweight, zero-bloat, AST-powered debug logging for JavaScript, TypeScript, Python, and PHP.**

[English](./README.md) | [简体中文](./README.zh-CN.md)

[![GitHub license](https://img.shields.io/badge/license-Custom-blue.svg)](LICENSE.txt)
[![Tests](https://img.shields.io/badge/tests-1865%20passed-brightgreen.svg)]()
[![Package Size](https://img.shields.io/badge/vsix%20size-~205%20KB-orange.svg)]()
[![Package Manager](https://img.shields.io/badge/pnpm-v12-purple.svg)](https://pnpm.io)

---

## 📌 Upstream & Fork Background

This project is a fork of [Chakroun-Anas/turbo-console-log](https://github.com/Chakroun-Anas/turbo-console-log).

While the original extension provides excellent AST-based logging, later releases introduced commercial Turbo Pro upselling, background Git hooks, full-workspace background scans, analytics tracking (telemetry), and promotion Webviews. These additions increased resource consumption and added background runtime overhead.

**Turbo Console Log Flash ⚡** was created with a clear mission: **Back to Core & Lightning Fast**. We surgically removed all commercial paywalls, telemetry trackers, and background listeners while preserving **100% of the core AST logging and management capabilities**, making the extension featherweight, clean, and blazing fast.

---

## ⚡ Key Differences & Enhancements

| Dimension | Upstream (Original) | Turbo Console Log Flash ⚡ |
| :--- | :--- | :--- |
| **Commercialization & Pro** | Bundled Pro license checks, paywalls, and workspace scanning | **Completely stripped**; pure open-source developer tool |
| **Telemetry & Tracking** | Built-in telemetry tracking user interactions and usage | **Completely removed**; zero network tracking, privacy-first |
| **Runtime & Memory** | `onStartupFinished` global background resident, scanning disk/git | **Lazy activation (`onLanguage: *`)**; zero memory or CPU footprint until relevant files are opened |
| **Package Size** | Dispersed files, large promotional media assets | **Single-file minified bundle (540 KB)**; `.vsix` offline package is only **~205 KB** |
| **Package Manager** | npm / mixed scripts | Fully modernized to **pnpm v12** with isolated virtual store |
| **Dependency Stack** | Legacy deprecated packages (`@types/acorn`, `vscode-test`, etc.) | Upgraded to latest compatible versions (**ESLint 9, Jest 30, esbuild 0.25, Acorn 8.19**) |
| **Test Verification** | - | **149 test suites, 1,865 unit tests 100% passing** |

---

## ✨ Features

### 1. AST-Powered Precision
Instead of fragile regex matching or simple string insertion, this extension parses your code with language-native AST parsers (`acorn` for JS/TS, `@lezer/python` for Python, `php-parser` for PHP):
- **Accurate Placement**: Automatically handles variable declarations, ternary operators, object literals, destructuring, function parameters, promise chains, and loops so the log statement always lands on the most logical and syntactically valid line.
- **Context-Aware**: Automatically extracts enclosing class names, function/method names, filenames, and line numbers.

### 2. Multi-Language & Multi-Method Support
- **JavaScript & TypeScript**:
  - `console.log`, `console.error`, `console.warn`, `console.info`, `console.debug`, `console.table`, and custom log functions.
- **Python**:
  - `print()`, `logging.debug()`, `logging.info()`, `logging.warning()`, `logging.error()`, and custom log functions.
- **PHP**:
  - `var_dump()`, `print_r()`, `error_log()`, and custom log functions.

### 3. Active File Log Management
- **Comment All Logs**: Instantly comment out all debug logs in the current file.
- **Uncomment All Logs**: Restore previously commented debug logs in the current file.
- **Delete All Logs**: Clean up all debug logs in the current file with one shortcut.
- **Correct Log Messages**: Automatically update filenames and line numbers after code refactoring or line moves.

---

## ⌨️ Keyboard Shortcuts

> Windows / Linux users: replace `⌘` with `Ctrl`.

### 1. Insert Log Messages

| Command / Action | Languages | macOS Default | Win/Linux Default |
| :--- | :--- | :--- | :--- |
| **Insert Log / print() / var_dump()** | All languages | `⌘K ⌘L` | `Ctrl+K Ctrl+L` |
| **Insert Error / logging.error()** | All languages | `⌘K ⌘E` | `Ctrl+K Ctrl+E` |
| **Insert Warn / logging.warning()** | JS/TS / Python | `⌘K ⌘R` | `Ctrl+K Ctrl+R` |
| **Insert Info / logging.info() / print_r()**| All languages | `⌘K ⌘N` | `Ctrl+K Ctrl+N` |
| **Insert Debug / logging.debug()** | JS/TS / Python | `⌘K ⌘B` | `Ctrl+K Ctrl+B` |
| **Insert Table** | JS/TS | `⌘K ⌘T` | `Ctrl+K Ctrl+T` |
| **Insert Custom Log** | All languages | `⌘K ⌘C` | `Ctrl+K Ctrl+C` |

### 2. Log Management (Active File)

| Command / Action | macOS Default | Win/Linux Default |
| :--- | :--- | :--- |
| **Delete All Log Messages** | `⌥ Shift D` | `Alt+Shift+D` |
| **Comment All Log Messages** | `⌥ Shift C` | `Alt+Shift+C` |
| **Uncomment All Log Messages** | `⌥ Shift U` | `Alt+Shift+U` |
| **Correct All Log Messages** | `⌥ Shift X` | `Alt+Shift+X` |

---

## ⚙️ Configuration

Open VS Code `Settings` and search for `turboConsoleLog` to customize:

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `turboConsoleLog.logMessagePrefix` | string | `🚀` | Log prefix icon or text |
| `turboConsoleLog.logMessageSuffix` | string | `:` | Suffix between variable name and its value |
| `turboConsoleLog.delimiterInsideMessage` | string | `~` | Delimiter between log message components |
| `turboConsoleLog.quote` | string | `"` | Quote style: `"`, `'`, or `` ` `` |
| `turboConsoleLog.includeFilename` | boolean | `true` | Include file name in log output |
| `turboConsoleLog.includeLineNum` | boolean | `true` | Include line number in log output |
| `turboConsoleLog.insertEnclosingClass` | boolean | `true` | Include enclosing class name |
| `turboConsoleLog.insertEnclosingFunction` | boolean | `true` | Include enclosing function/method name |
| `turboConsoleLog.wrapLogMessage` | boolean | `false` | Wrap logged variable in curly braces `{ variable }` |
| `turboConsoleLog.addSemicolonInTheEnd` | boolean | `false` | Append semicolon at the end of the log statement |
| `turboConsoleLog.insertEmptyLineBeforeLogMessage` | boolean | `false` | Insert an empty line before the log statement |
| `turboConsoleLog.insertEmptyLineAfterLogMessage` | boolean | `false` | Insert an empty line after the log statement |
| `turboConsoleLog.logFunction` | string | `log` | Custom log function name for "Insert Custom Log" |

---

## 🛠️ Development & Building

This project uses **pnpm** for package management.

```bash
# 1. Clone the repository
git clone https://github.com/liujigang/turbo-console-log-flash.git
cd turbo-console-log-flash

# 2. Install dependencies
pnpm install

# 3. Build bundle (development with sourcemap)
pnpm run esbuild

# 4. Watch mode
pnpm run watch

# 5. Typecheck & Lint
pnpm run lint

# 6. Run unit tests (1,865 tests)
pnpm run test:jest

# 7. Package offline VSIX extension
pnpm run package
```

After packaging, the `.vsix` file will be generated in the root directory:
```bash
code --install-extension turbo-console-log-flash-3.29.0.vsix
```

---

## 📄 Acknowledgements & License

- Forked from [Chakroun-Anas/turbo-console-log](https://github.com/Chakroun-Anas/turbo-console-log). Special thanks to **Chakroun Anas** and all original contributors for creating the AST logging algorithms.
- This fork complies with open-source licensing guidelines by stripping proprietary Turbo Pro code, branding, and assets, focusing solely on maintaining and enhancing the core open-source functionality.
- See [LICENSE.txt](./LICENSE.txt) for details.
