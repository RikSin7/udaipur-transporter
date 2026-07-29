# Udaipur Royal Transporter

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://udaipurtransporter.netlify.app)
[![Built with Astro](https://img.shields.io/badge/Built_with-Astro_5-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled_with-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CMS powered by Decap](https://img.shields.io/badge/Content-Decap_CMS-F92672?style=for-the-badge&logo=decap-cms&logoColor=white)](https://decapcms.org/)

**Udaipur Royal Transporter** is a reliable web application engineered for private car hires, dependable airport transfers (Maharana Pratap Airport / Dabok), local sightseeing packages, and outstation taxi routes across Rajasthan. 

Built for performance, aesthetics, and easy content editing, the platform features a Champagne Gold luxury design system, static HTML compilation via Astro 5, and complete editorial control powered by **Decap CMS**.

---

## 🌐 Live Application

👉 **Live Site:** [https://udaipurtransporter.netlify.app](https://udaipurtransporter.netlify.app)  
👉 **Admin Portal:** [https://udaipurtransporter.netlify.app/admin/](https://udaipurtransporter.netlify.app/admin/) *(Requires Git Gateway / Netlify Identity Auth)*

---

## ✨ Highlights & Architecture

### 1. 100% Headless Content Management (Decap CMS)
Every piece of user-facing content is architected into **Astro Content Collections (`src/content/`)** and configured for **Decap CMS (`/admin/config.yml`)**:
- **Singleton Pages**: Home Page (Hero, Why Choose Us, Booking Process, Enquiry Banner), About Us, Contact, Privacy Policy, Terms of Service, and Global Site Settings.
- **Folder Collections**: Services, Vehicle Fleet & Capacities, Passenger Reviews, FAQs, and Transport Blog Guides.
- Editors can manage titles, rates, itinerary breakdowns, FAQs, verification ratings, and image assets without writing a single line of code.

### 2. Dynamic Icon Resolver Architecture
Instead of hardcoding iconography across Astro components, the application utilizes a centralized **[iconResolver.ts](./src/utils/iconResolver.ts)** dictionary. Editors can select Tabler Icons via simple visual dropdowns in Decap CMS, and components resolve them dynamically with zero client-side JavaScript overhead or bundle bloat.

### 3. Automated WhatsApp & Telephone Routing
Built with conversion optimization in mind, the platform uses intelligent contact utilities (`getWhatsAppUrl` & `createCleanParam`):
- Clicking any vehicle or service enquiry button automatically constructs a pre-populated WhatsApp message contextualized with the exact vehicle category, itinerary, or page URL.
- One-click phone calling integration for mobile travellers.

### 4. High-Performance Static Generation & SEO
- **Zero JS by Default**: Built on Astro's island architecture, delivering instantaneous page load speeds and top Core Web Vitals scores.
- **Image Pipeline**: Automatic optimization of all CMS-uploaded assets from `src/assets/images` to responsive WebP formats at build time.
- **SEO & Social Metadata**: Customizable SEO meta tags, title prefixes, and descriptive summaries for every service route and travel guide.

---

## 🛠️ Tech Stack

- **Core Framework:** [Astro 5.x](https://astro.build) (Static Site Generator)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + Vanilla Custom Design Tokens
- **Icons:** [Tabler Icons for Astro](https://github.com/tabler/tabler-icons) (`@tabler/icons-astro`)
- **CMS:** [Decap CMS](https://decapcms.org) configured with Netlify Identity & Git Gateway
- **Hosting & CI/CD:** [Netlify](https://netlify.com)

---

## 📂 Project Structure

```text
├── public/
│   ├── admin/
│   │   ├── config.yml        # Complete Decap CMS editorial mapping
│   │   └── index.html        # Decap CMS SPA wrapper
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/           # CMS media storage directory
│   ├── components/
│   │   ├── cards/            # Reusable Service, Vehicle, Blog & Review cards
│   │   ├── forms/            # Interactive Enquiry Form
│   │   ├── layout/           # Header, Footer, SEO wrapper
│   │   └── sections/         # Hero, WhyChooseUs, BookingProcess, Featured grids
│   ├── content/              # Managed Markdown & YAML files (Services, Vehicles, etc.)
│   ├── layouts/
│   │   └── BaseLayout.astro  # Primary page template
│   ├── pages/                # File-based routing (/services, /vehicles, /blog, etc.)
│   ├── styles/
│   │   └── global.css        # Luxury design variables & utility overrides
│   └── utils/
│       ├── helpers.ts        # URL sanitization & WhatsApp deep links
│       └── iconResolver.ts   # CMS String-to-JSX dynamic icon mapper
├── astro.config.mjs          # Astro config & Tailwind integration
└── package.json
```

---

## 🚀 Local Development Setup

Follow these simple steps to set up and run the codebase on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/RikSin7/udaipur-transporter.git
cd udaipur-transporter
```

### 2. Install Dependencies
Make sure you have Node.js (v18+ recommended) installed, then run:
```bash
npm install
```

### 3. Start the Dev Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser to view the application in real time.

---

## 📦 Building for Production

To build the optimized static bundle for Netlify or any static hosting provider:

```bash
npm run build
```
This generates the ready-to-deploy static HTML, CSS, and compressed WebP images inside the `/dist` directory. You can preview your production build locally by running:

```bash
npm run preview
```

---

## 🔐 CMS & Admin Deployment Notes
This site uses **Git Gateway** on Netlify to authenticate content editors. When hosting on Netlify, ensure:
1. **Identity** is enabled in your Netlify Site Settings.
2. **Git Gateway** under Identity Services is activated and authenticated with your GitHub repository.
3. Content editors visit **`/admin/`** on your live URL to log in and manage site content directly.

---

## 📄 License
All rights reserved. Designed and built exclusively for **Udaipur Royal Transporter**.
