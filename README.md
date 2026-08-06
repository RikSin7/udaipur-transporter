# Udaipur Royal Transporter

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://udaipurtransporter.netlify.app)
[![Built with Astro](https://img.shields.io/badge/Built_with-Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Styled with Tailwind CSS v4](https://img.shields.io/badge/Styled_with-Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CMS powered by Decap](https://img.shields.io/badge/Content-Decap_CMS-F92672?style=for-the-badge&logo=decap-cms&logoColor=white)](https://decapcms.org/)

**Udaipur Royal Transporter** is a modern, high-performance web application engineered for premium private car hires, dependable airport transfers (Maharana Pratap Airport / Dabok), local sightseeing travel packages, and outstation taxi routes across Rajasthan.

Built for instantaneous load times, rich visual aesthetics, and effortless editorial control, the platform features a Champagne Gold luxury design system, static compilation via modern **Astro**, **Tailwind CSS v4**, and complete headless content management powered by **Decap CMS**.

---

## 🌐 Live Application

👉 **Live Site:** [https://udaipurtransporter.netlify.app](https://udaipurtransporter.netlify.app)  
👉 **Admin Portal:** [https://udaipurtransporter.netlify.app/admin/](https://udaipurtransporter.netlify.app/admin/) _(Requires Git Gateway / Netlify Identity Auth)_

---

## ✨ Highlights & Architecture

### 1. 100% Headless Content Layer & Hub Architecture

Every piece of user-facing content is strictly typed via Astro's Content Layer API (**`src/content.config.ts`**) and configured for **Decap CMS (`/admin/config.yml`)**:

- **Singleton & Hub Collections**: Primary pages (Home, About Us, Contact, Privacy Policy, Terms of Service, Thank You), global site settings, dynamic call-to-action banners (`catalogue_cta`, `direct_contact_cta`), and Hub pages for section landing experiences (`services_hub`, `vehicles_hub`, `blog_hub`, `reviews_hub`, `faqs_hub`).
- **Folder Collections**: Categorised Services, Vehicle Fleet & Capacities, Verified Passenger Reviews, FAQs, and Transport Planning Blog Guides.
- Editors can manage titles, rates, luggage capacities, itineraries, FAQs, ratings, and imagery entirely through the admin dashboard without modifying source code.

### 2. Modern UI & Navigation Ecosystem

- **Interactive Tab Bar Navigation**: Features a sticky, floating `TabBar` component equipped with automatic item-count badges. It functions both as an anchor scroll navigator for categorised services and FAQs, as well as an instant client-side filter for blog guides.
- **Graceful Fallbacks & Empty States**: Uniform, cleanly styled fallback UI components across carousels, vehicle grids, and service listings when content is unpublished or being updated.
- **Tailwind CSS v4 & Utility Scaling**: Uses modern Tailwind CSS v4 paired with custom vanilla tokens in `global.css` and safe className merging via `clsx` and `tailwind-merge` (`cn.ts`).

### 3. Dynamic Icon Resolver Architecture

Instead of hardcoding iconography across components, the application utilizes a centralized **`iconResolver.ts`** mapping dictionary. Content editors select Tabler Icons (`@tabler/icons-astro`) via visual dropdowns in Decap CMS, which are resolved dynamically at build time with zero client-side JavaScript bundle bloat.

### 4. Automated WhatsApp & Direct Telephone Routing

Built specifically for conversion optimization, the platform uses intelligent contact routing utilities (`getWhatsAppUrl` & `createCleanParam`):

- Clicking any vehicle or service enquiry button dynamically compiles a pre-populated WhatsApp message contextualized with the exact vehicle category, itinerary breakdown, or referencing page URL.
- Instantaneous one-click phone calling and email triggering for mobile travelers.

### 5. High-Performance Static Generation & SEO

- **Zero JS by Default**: Built on Astro's Island architecture, delivering lightning-fast page loading speeds and top Core Web Vitals performance.
- **Automated Image & Typography Pipeline**: Automatic optimization of CMS-uploaded media assets to modern compressed formats, complemented by self-hosted variable font packages (`@fontsource/manrope`, `@fontsource/plus-jakarta-sans`) for zero layout shifts.
- **SEO & Sitemap Ready**: Comprehensive dynamic metadata generation, custom social preview descriptions for every route/guide, and automated sitemap generation (`@astrojs/sitemap`).

---

## 🛠️ Tech Stack

- **Core Framework:** [Astro](https://astro.build) (Static Site Generator & Content Layer)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + Custom Luxury Design Tokens + `clsx` / `tailwind-merge`
- **Typography & Icons:** [Fontsource](https://fontsource.org/) (Manrope & Plus Jakarta Sans) + [Tabler Icons for Astro](https://github.com/tabler/tabler-icons) (`@tabler/icons-astro`)
- **CMS:** [Decap CMS](https://decapcms.org) configured with Netlify Identity & Git Gateway
- **Hosting & CI/CD:** [Netlify](https://netlify.com)

---

## 📂 Project Structure

```text
├── public/
│   ├── admin/
│   │   ├── config.yml        # Complete Decap CMS schema & editorial mapping
│   │   └── index.html        # Decap CMS SPA wrapper
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/           # CMS media asset directory
│   ├── components/
│   │   ├── cards/            # Reusable Service, Vehicle, Blog & Review cards
│   │   ├── forms/            # Interactive booking & general enquiry forms
│   │   ├── layout/           # Header, Footer, and base layout scaffolding
│   │   ├── sections/         # Hero grids, WhyChooseUs, Reviews Carousel, CTAs, FAQs
│   │   └── ui/               # Reusable atomic UI elements (TabBar, SectionHeader, HeroHeader, ViewAllButton)
│   ├── content/              # Managed Markdown & YAML files (Hub singletons & collections)
│   ├── layouts/
│   │   └── BaseLayout.astro  # Primary page wrapping template with SEO tags
│   ├── pages/                # File-based routing (/services, /vehicles, /reviews, /blog, etc.)
│   ├── styles/
│   │   └── global.css        # Tailwind imports & luxury design variables
│   └── utils/
│       ├── cn.ts             # Tailwind class merging utility (clsx + tailwind-merge)
│       ├── helpers.ts        # URL sanitization, date formatting & WhatsApp deep linking
│       └── iconResolver.ts   # CMS string-to-JSX dynamic Tabler icon mapper
├── src/content.config.ts     # Astro Content Layer collection definitions & Zod validation
├── astro.config.mjs          # Astro config & Vite plugins (@tailwindcss/vite, sitemap)
└── package.json
```

---

## 🚀 Local Development Setup

Follow these steps to set up and run the codebase on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/RikSin7/udaipur-transporter.git
cd udaipur-transporter
```

### 2. Install Dependencies

Ensure you have Node.js (**v22.12.0 or higher** recommended as per engine specifications), then run:

```bash
npm install
```

### 3. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to inspect and interact with the site in real time.

---

## 📦 Building for Production

To compile the optimized static bundle for Netlify or any static hosting provider:

```bash
npm run build
```

This generates the deployment-ready static HTML, stylesheet bundles, and compressed WebP assets inside the `/dist` directory. You can locally preview the production build by running:

```bash
npm run preview
```

---

## 🔐 CMS & Admin Deployment Notes

This site leverages **Git Gateway** on Netlify to authenticate editorial team members. When hosting on Netlify:

1. Enable **Identity** under your Netlify Site Settings.
2. Activate **Git Gateway** under Identity Services and authorize access to the GitHub repository.
3. Content editors visit **`/admin/`** on the live domain to authenticate and administer site content directly from their browser.

---

## 📄 License

All rights reserved. Designed and built exclusively for **Udaipur Royal Transporter**.
