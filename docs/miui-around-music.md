# MIUI Around Music 1.0

**小米 · 2022 · UI / Visual**

---

## 背景 Background

随着 AIOT 设备渗透率持续提升，用户的听歌场景从单一手机端延伸至 Speaker、TV、Panel、CarOS 等多个触点。头部音乐产品已通过「硬件 + 订阅服务 + 内容生态」构筑竞争壁垒，单纯的硬件优势难以持续，软件体验成为硬件溢价与用户粘性的核心载体。

小米需要一款能够覆盖全场景、体现高品质感的系统级音乐工具——不是另一个内容平台，而是真正属于 MIUI 生态的音乐体验。

As AIOT device penetration continues to grow, users' music-listening scenarios have expanded from a single phone to multiple touchpoints — Speaker, TV, Panel, CarOS and beyond. Leading music products have built moats through "hardware + subscription + content ecosystem." Hardware advantages alone are no longer sustainable; software experience has become the core vehicle for hardware premium and user retention.

Xiaomi needed a system-level music tool that covers all scenarios and conveys high quality — not another content platform, but a music experience that truly belongs to the MIUI ecosystem.

---

## 设计目标 Objectives

> 随心一点 · 让音乐轻松流转
> *Just a tap · Let music flow freely*

三个核心方向：

**1. 高品质的体验感知建立**
去「运营化」，信息降噪，回归曲库与播放器的核心体验。

**2. 全场景的无缝流转**
梳理核心流转触点，建立高效简单的流转交互——手机、音箱、电视、耳机之间一键切换。

**3. 一致的多终端体验延续**
建立多终端的动态视觉规范，结合硬件优势打造差异化体验。

Three core directions:

**1. Establishing high-quality experience perception**
Remove "operational noise," reduce information overload, and return to the core experience of library and player.

**2. Seamless cross-scenario handoff**
Streamline the key handoff touchpoints, build efficient and simple transfer interactions — one-tap switching between phone, speaker, TV, and earphones.

**3. Consistent multi-device experience continuity**
Establish a dynamic visual system across devices, leveraging hardware advantages to create differentiated experiences.

---

## 设计策略 Design Strategy

### 产品定位
音楽（高品質感）—— ハイレゾ音楽のシームレスなストリーミング

这不是一个内容消费平台，而是一个**高品质、轻量的系统级音乐工具**。设计语言围绕「轻」「净」「流动」展开，视觉上去除冗余的运营位与推荐算法入口，让用户回到音乐本身。

This is not a content consumption platform, but a **high-quality, lightweight system-level music tool**. The design language revolves around "light," "clean," and "fluid" — visually removing redundant editorial slots and recommendation algorithm entries, returning users to the music itself.

### 主应用 App
- 首页以「今日电台」为核心锚点，个性化推荐入口克制而精准
- 播放器页面采用全屏封面 + 歌词浮层的沉浸式体验
- 歌单、排行榜、分类入口层级清晰，降低认知负担

### 多端流转 Cross-device Handoff
- 播放器内置设备切换面板，支持 Xiaomi Sound Pro、Xiaomi TV 等多设备实时切换
- 锁屏通知栏、控制中心均可直接操作播放与设备流转
- 无需回到 App，随时随地掌控播放状态

### 小组件 Widgets
- 桌面小组件支持多种尺寸：当前播放曲目、今日播放时长（96 min）等
- Live Activity / 灵动岛形态的播放控件，适配最新交互范式

### 多终端 Multi-device
- **手机**：主应用 + 锁屏控制 + 小组件
- **音箱（Xiaomi Sound）**：Panel 形态，歌词全屏展示，环境感知色彩
- **电视（Xiaomi TV）**：大屏沉浸式播放，黑胶唱片动效 + 歌词投影
- **耳机**：设备管理页，噪音模式切换，空间音频控制

---

## 设计亮点 Design Highlights

- **色彩跟随封面**：播放器背景色动态提取专辑封面主色，营造沉浸感
- **黑胶唱片形态**：在 TV、Panel 等大屏终端采用旋转黑胶 + 歌词的视觉语言，强化仪式感
- **信息密度克制**：首页保持极简结构，拒绝 banner 轰炸，体现系统级产品的克制美学
- **设备感知流转**：用户无需手动选择，系统感知当前活跃设备并智能推荐流转目标

- **Album-art driven color**: Player background dynamically extracts the dominant color from album art, creating an immersive atmosphere.
- **Vinyl aesthetic**: On TV and Panel large-screen terminals, rotating vinyl + lyrics creates a ceremonial visual language.
- **Restrained information density**: Home page maintains a minimal structure, rejecting banner overload — reflecting the aesthetic restraint of a system-level product.
- **Device-aware handoff**: The system senses the currently active device and intelligently recommends handoff targets without manual selection.

---

## 角色 Role

Product Designer — 负责整体产品定义、交互设计、视觉规范与多端适配方案。

Product Designer — Responsible for overall product definition, interaction design, visual system, and multi-device adaptation.
