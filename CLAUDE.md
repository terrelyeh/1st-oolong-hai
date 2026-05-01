# CLAUDE.md — Project Context

> Last updated: 2026-05-01

## Project Overview

「**台灣第一家烏龍嗨**」(The Oolong Hai) — 一家「日常但不一般的燒酎下午酒場」品牌書網站。
靜態多頁網站，包含品牌介紹、酒單設計系統、燒酎宇宙地圖、空間筆記、16:10 簡報版。

完整功能清單與頁面說明詳見 [README.md](README.md)。

## Tech Stack

- **純 HTML + CSS + 原生 JS**，無框架、無 build tool
- **Google Fonts**: Noto Serif TC + Noto Sans TC + Inter
- **Vercel** 自動部署（main 分支 push 即上線）
- 視覺資產 mostly PNG（AI 生成）+ 自製 SVG（矩陣、5 圈、章節圖）

## Directory Structure

```
1st-oolong-hai/
├── index.html              品牌中心（hero、4 張力、DNA、matrix、5 圈、範例、守護紅線）
├── universe.html           燒酎宇宙地圖（10 張風味地圖、願景視角）
├── system.html             5 圈系統詳解（每圈 why/decision/range/trap）
├── space.html              空間筆記（編輯攝影風空間照 + 海報穿插）
├── index-slides.html       16:10 簡報版（用 slides.css + slides.js）
├── slides.css              共用簡報系統（dual-mode + 鍵盤 + 列印）
├── slides.js               簡報模式切換 / 翻頁邏輯
├── space-prompts.md        AI 生圖 prompt 庫（Style A 編輯攝影 + Style B City Pop）
├── README.md               對人的產品介紹
├── favicon.svg / og-image.svg
└── Images/
    ├── 海報/                7 張品牌海報（oolonghai_1.png ~ oolonghai_7.png）
    └── Space/
        ├── clean/            ⭐ space.html 在用：s01-entrance ~ s08-bathroom（共 13 張，web-safe 命名）
        ├── 乾淨昭和風/       原始 ChatGPT 生圖檔名（含中文/空格/冒號），當 backup
        └── 編輯攝影風/       早期一版（oo1-oo11），已被 clean/ 取代，可考慮清理
```

## Architecture & Conventions

### Color tokens（每個 HTML 各自 inline 定義一次，無共用 CSS）

```
--bg-paper:    #F5F0E6   主背景（暖米紙）
--bg-paper-2:  #EDE5D3   副背景
--ink:         #2C3345   主文字（避用純黑）
--ink-soft:    #5C5247   次文字
--tea-brown:   #8B6F47   eyebrow / metadata
--barley:      #C4A57B   accent / divider
--hojicha:     #D4836F   重點橘 / section-num 強調
--green:       #6E8B5E   is/isnt 區塊「是」邊框
--line:        #D9CFB8   border / divider
--highlight:   #E8D9B5   hover 狀態
```

### 字級系統（手機 ≤768px 統一規範）

11 / 13 / 15 / 17 / 18 / 22 / 24 / 26 / 34 / 40 px。
之前曾散亂到 25 種尺寸（10、11.5、13.5、14.5...），統一收斂後較一致。

### 共用排版 pattern

- **section-num eyebrow** — 大寫 letter-spaced 0.4em、`var(--hojicha)`、13px
- **section-title** — Noto Serif TC 36–56px、weight 600–700
- **section-subtitle** — 19px、`var(--ink-soft)`、max-width 640px
- **related cards** — 3-col grid（之前是 2-col、加 space.html 後擴成 3）

### 圖片路徑慣例

- **Posters**: `Images/海報/oolonghai_*.png`（曾從 `Images/` 根目錄搬入；舊路徑已修）
- **Space photos**: `Images/Space/編輯攝影風/oo*.png`
- 中文資料夾名 git 用 UTF-8 escape 顯示，編輯時注意

### Slides 系統（slides.css + slides.js）

- 16:10 固定畫布 1920×1200，用 `transform: scale(var(--scale))` 響應式縮放
- `body.mode-doc`（文件 / 列印）⇄ `body.mode-slide`（簡報翻頁）
- 鍵盤：`←/→` 翻頁、`P` 切模式、`F` 全螢幕、`ESC` 退出簡報
- 列印 `@page { size: 1920px 1200px }` → 直接出 16:10 PDF

## Current Status

完整功能與頁面詳見 [README.md](README.md)。

### 🔜 Next Steps

- **食物策展企劃** ⭐ — 不只是食物照片本身（已在 space.html CH 08 完成），
  user 想討論「在這個空間如何做食物策展、食物 collab 專案企劃」。
  可能要新做 `food.html` 或在 space.html 擴章節。內容方向：策展型菜單、
  跨界合作（職人 / 餐廳 / 季節限定）、客座主廚、食物 × 燒酎配對。
- **海報部分** — 整理一份單獨頁面或 archive 介紹 7 張海報（oolonghai_1 ~ 7）的概念

## Deployment

- Vercel auto-deploy from `main` branch
- Push commit → 幾分鐘 → [1st-oolong-hai.vercel.app](https://1st-oolong-hai.vercel.app) 上線
- 沒有 staging / preview 流程，直接 push 到 main

## Common Pitfalls

### 🔴 品牌文案規則：不假掰、簡單、沒有 AI 感（最重要）

「不假掰」是品牌 4 張力之一，文案守不住、整個品牌就垮。
寫任何 caption / 標題 / 描述前，先記住這幾條：

- **不要用「不是 X 是 Y」對比結構** — 這是最明顯的 AI 文案 tell
  （❌「不是 speakeasy 的隱密入口、不是 hotel bar 的鏡面玻璃。就是一塊木頭⋯」）
- **不要寫文青 punch line** — 像「你只要推。」「老的東西不消失。」「像進去過一次。」這類
- **META 寫 1–3 字** — 不要「步驟 N · 動作 · 細節」三段式
- **像朋友講話、不像品牌宣言** — 短句、直接、不繞圈
- **寫完自問**：會不會太假掰？太文青？太 AI？三個都中就重寫
- **能用的 pattern**：物件清單 + 一句直白 takeaway。不要鋪陳、不要押韻、不要排比
- **Brand DNA 對照**：不假掰 / 庶民 / 日常 / 自在 / 在地 / 有趣 / 不繁複

### ChatGPT / AI 生圖檔名處理

- ChatGPT 直接下載的圖檔名長這樣：`ChatGPT Image 2026年4月28日 下午05_19_44.png`
  含**中文 + 空格 + 冒號**，HTML 引用會踩雷
- 規則：丟進專案前**先 rename** 成 web-safe 格式（如 `s01-xxx.png`）
- 原檔保留當 backup（不要 mv、用 cp）

### 寫程式碼

- **`Images/oolonghai_*.png` 的路徑曾搬家** — 現在在 `Images/海報/` 子資料夾。
  index / universe / system / index-slides / space 五頁都有引用、改路徑要五頁一起改。
- **index.html 的 4 個張力 section** — eyebrow 用 `00 / 我們的氣質` 對齊全頁
  其他 section 的 `01 / 02 / 03 ...` 編號節奏，不要用獨立的 `★ OUR ESSENCE` 樣式。
- **Plotly.js** — `index.html` / `universe.html` 載入了 `cdn.plot.ly/plotly-2.35.2.min.js`
  但實際上整站沒用到任何 Plotly chart（都是 SVG / HTML）。可移除以省 3MB。
- **`.related-grid` 在四頁（index/universe/system/space）都是 3-col**
  — 加新頁面要記得同步擴。

### AI 生圖 prompt 寫法（針對 `space-prompts.md`）

- **Prompt 不要直接放品牌名**（Aesop、Issey Miyake、Sofia Coppola、Hasselblad）。
  AI 會把它當畫面內容、印在吧台 / 牆上。改成 descriptive：
  「the kind of clean lifestyle brand editorial campaign...」
- **「1996 真實重現」會看起來髒/過時**（灰塵、過曝、衣著土氣）。
  要用「**Modern editorial campaign 2025, paying homage to 1996 City Pop**」
  框架（保留色感 / 物件 / 氣味、但用現代攝影師的眼睛）。
- **Negative prompt 必加**：`heavy film grain, halation, dirty look, dingy,
  grungy, cigarettes, dated 90s clothing, gibberish text, logo, watermark`

### 設計

- **禁用純黑** `#000000`，用 `--ink` (#2C3345) 取代。
- **數字用 `font-feature-settings: "tnum" on`**（已在 body）讓欄位對齊整齊。
- **不堆酒牆 / 不刻意 / 不張揚** — 這是品牌 4 張力之一，視覺上要 curated 不要堆量。
