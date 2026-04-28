# 台灣第一家烏龍嗨 · The Oolong Hai

> 日常但不一般的燒酎下午酒場
> 帶著 90 年代喫茶店的氣味，現在喝得到。

品牌書網站。包含品牌定位、酒單設計系統、燒酎宇宙地圖、空間筆記、簡報版。

🌐 上線：[1st-oolong-hai.vercel.app](https://1st-oolong-hai.vercel.app)

---

## 📄 頁面

| 頁面 | URL | 用途 |
|---|---|---|
| **品牌中心** | `/` ([index.html](index.html)) | 主入口 — 4 張力、7 DNA、5 圈系統概覽、5 款代表性商品、4 紅線 |
| **燒酎宇宙地圖** | `/universe.html` | 10 張互動式風味地圖（願景視角，給團隊與夥伴看） |
| **5 圈系統詳解** | `/system.html` | 酒單設計系統的完整教學（每圈含 why / decision / 範例 / 陷阱） |
| **空間筆記** | `/space.html` | 編輯雜誌風空間照（7 個鏡頭 + 2 張海報 + 點擊放大 lightbox） |
| **品牌書簡報版** | `/index-slides.html` | 16:10 簡報版（雙模式：文件 ⇄ 簡報，可直接列印 PDF） |

---

## 🛠 Tech Stack

- 純 **HTML + CSS + 原生 JS**，無框架、無 build tool
- **Google Fonts**：Noto Serif TC + Noto Sans TC + Inter
- 自製 **SVG 視覺化**（產品矩陣、5 圈同心圓、季節輪、章節圖）
- **Vercel** 自動部署（push to main → 上線）

---

## 🎨 Design

- 暖米紙背景 `#F5F0E6`，避用純黑（用 `#2C3345` 墨色）
- 主色：茶褐 / 麥色 / 焙茶橙 / 墨色
- 字體三軌：Noto Serif TC（標題）+ Noto Sans TC（正文）+ Inter（英文 / 編號）
- 統一手機字級系統（11 / 13 / 15 / 17 / 18 / 22 / 24 / 26 / 34 / 40 px）
- 數字用 `tabular-nums`，避免欄位錯位

---

## 🖼 視覺資產

```
Images/
├── 海報/                7 張品牌海報（暗示品牌張力 × 文化座標）
└── Space/編輯攝影風/    13 張空間示意照（入口 / 吧台 / 酒櫃 / 角落 / 廁所...）
```

另有 [`space-prompts.md`](space-prompts.md) — AI 生圖 prompt 庫，
含**編輯攝影風**（Style A）+ **90 年代 City Pop 數位懷舊風**（Style B）兩條視覺軌。

---

## 🚀 Deploy

Static site，Vercel 自動部署：

```bash
git push origin main   # 幾分鐘後上線
```

也可直接部署到 Netlify / Cloudflare Pages 任一平台。

---

## ⌨️ 簡報版操作（index-slides.html）

| 鍵 | 動作 |
|---|---|
| `←` / `→` | 上 / 下一頁 |
| `P` | 切換 文件 ⇄ 簡報 模式 |
| `F` | 全螢幕 |
| `ESC` | 退出簡報模式 |

文件模式可直接 `Cmd + P` → 列印成 16:10 PDF（每頁一張 slide）。
