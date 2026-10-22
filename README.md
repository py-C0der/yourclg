# BTechX 🚀

> **A Free, Modern Academic Resource & AI Tools Platform for B.Tech Engineering Students.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE-MIT)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE-APACHE)
[![Website](https://img.shields.io/badge/Website-btechx.online-blue.svg)](https://btechx.online)
[![Build Status](https://img.shields.io/badge/Deployment-GitHub%20Pages-success.svg)](https://github.com/py-C0der/yourclg)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-informational.svg)](#tech-stack)

---

## 📌 Overview

**BTechX** is a state-of-the-art, open-source web application designed to simplify learning for undergraduate B.Tech engineering students. It provides instant access to organized branch-wise notes, syllabus documents, unit-wise reference PDFs, and custom developer/AI tools—all wrapped in a sleek, ultra-smooth monochrome dark interface.

🌐 **Live Website**: [btechx.online](https://btechx.online)

---

## ✨ Key Features

- **📚 Organized B.Tech Curriculum**:
  - **1st Year Subjects**: Engineering Mathematics 1 & 2, Engineering Physics, Basic Electrical Engineering (BEE), Computer Science & Programming (CSE), Basic Electronics (IEE), Basic Mechanical Engineering (IME).
  - **2nd Year Subjects**: Discrete Mathematical Structures (DMGT), and expanding curriculum.
- **⚡ Ultra-Smooth & Fluid Performance**:
  - Hardware-accelerated GPU transitions (`will-change`, 3D transforms).
  - High-end `cubic-bezier` easing curves for responsive hover states.
  - Zero 300ms tap-delay (`touch-action: manipulation`) and transparent touch highlights tailored for mobile users.
- **📄 Native PDF Modal Viewer**:
  - **Desktop**: In-page glassmorphic preview modal with 404 fallback handling.
  - **Mobile & Tablet**: Direct native browser tab redirection for optimal readability.
- **🛠️ AI Tools Suite**:
  - **Metacleaner**: Instant privacy tool to clean EXIF and metadata from shared files.
  - **Angkor AI**: Video lecture analyzer that converts educational videos into structured study notes.
  - **Realiology**: Next-generation Sanatana Dharma knowledge retrieval engine based on RAG architecture.
- **🔄 Silent Auto-Update System**:
  - Client-side background version checker (`version.json`) that silently reloads updated assets without disrupting active study sessions.
- **🔍 SEO & Search Console Ready**:
  - Pre-configured `sitemap.xml`, `robots.txt`, open-graph tags, and clean semantic markup.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Glassmorphism, GPU Acceleration), JavaScript (ES6+).
- **Fonts & Icons**: Google Fonts (Poppins, Fira Code, Outfit), FontAwesome 6.4.0.
- **Hosting & Deployment**: GitHub Pages with custom domain mapping (`btechx.online`).
- **Version Control**: Git & GitHub.

---

## 📂 Project Structure

```dir
BTechX/
├── 1stYearSub/         # 1st Year Subject pages (math1.html, cse.html, etc.)
├── 2ndYearSub/         # 2nd Year Subject pages (dmgt.html, etc.)
├── Data/               # Curriculum PDFs, Syllabus & Unit Notes
├── assets/
│   └── js/             # Client-side scripts (nav.js, pdf-modal.js, version-check.js)
├── images/             # Image assets and previews
├── Videos/             # Media and video preview loops
├── index.html          # Main Landing Homepage
├── syllabus.html       # Syllabus directory
├── about.html          # About & Contact page
├── apps.html           # Apps & AI Showcase page (Bento Grid)
├── styles.css          # Main Design System & Responsive Stylesheet
├── sitemap.xml         # Search engine sitemap
├── robots.txt          # Web crawler configuration
├── version.json        # Live deployment version tracker
├── LICENSE             # Dual License (MIT OR Apache-2.0)
├── LICENSE-MIT         # MIT License text
├── LICENSE-APACHE      # Apache License 2.0 text
└── README.md           # Project Documentation
```

---

## 💻 Local Setup & Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/py-C0der/yourclg.git
   cd BTechX
   ```

2. **Run Locally**:
   Open `index.html` in any web browser, or use a local dev server:
   ```bash
   # Using Python
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 📜 License

This project is dual-licensed under either:

- **MIT License** ([LICENSE-MIT](LICENSE-MIT) or [opensource.org/licenses/MIT](https://opensource.org/licenses/MIT))
- **Apache License, Version 2.0** ([LICENSE-APACHE](LICENSE-APACHE) or [apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0))

at your option. See the [LICENSE](LICENSE) file for complete details.

---

## 👨‍💻 Author & Support

Developed with ❤️ by **Subham Moharana (BTechX)**.

- 💼 **LinkedIn**: [Subham Moharana](https://www.linkedin.com/in/subhammoharana2007/?locale=en-US)
- 📸 **Instagram**: [@mr.backbencher.007.in](https://www.instagram.com/mr.backbencher.007.in)
- 📧 **Support Email**: [btechx.support@gmail.com](mailto:btechx.support@gmail.com)
