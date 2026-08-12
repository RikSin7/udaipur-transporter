# Client Handover Guide: Website Management & Setup

Welcome to your new website! This guide will help you set up and manage your website.

---

## 1. Initial Setup: Taking Ownership of Your Website

Please follow these steps in order to set up your website infrastructure. You don't need to be a developer to do this, but follow the steps carefully.

### Step 1: Create a GitHub Account & Fork the Codebase

GitHub is where your website's code and content history will live.

1. Go to [GitHub.com](https://github.com) and create a free account.
2. Ensure you are logged in, then visit the original code repository provided by your developer: https://github.com/craftsys/tsp-www
3. Click the **Fork** button in the top right corner. This creates a complete copy of the website's codebase under your own GitHub account. Your website code is now safely yours!

### Step 2: Deploy on Netlify

Netlify is the hosting platform that makes your website live on the internet.

1. Go to [Netlify.com](https://netlify.com) and sign up using your new GitHub account.
2. In your Netlify dashboard, click **Add new site** -> **Import an existing project**.
3. Choose **GitHub** and authorize Netlify to access your repositories.
4. Select the repository you just forked in Step 1.
5. Netlify will automatically detect that this is an **Astro** website. The default settings are already correct:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy site**. Wait a few minutes, and Netlify will provide a live link to your new website!

### Step 3: Set Up Web3Forms (For Customer Emails)

Web3Forms is the service that sends customer form submissions directly to your email.

1. Go to [Web3Forms.com](https://web3forms.com) and sign up using the email address where you want to receive customer enquiries.
2. You will receive an **Access Key** (it looks like a long string of letters and numbers, e.g., `12345678-abcd-1234-abcd-1234567890ab`).
3. Once you have logged into your Decap CMS (see Step 4 below on how to enable this), go to **Pages & Settings** -> **Site Settings**.
4. Scroll down to the **Web3Forms Access Key** field and paste your new key there.
5. Click **Publish**. Netlify will automatically rebuild your site with your new access key, and all future forms will go straight to your email!

### Step 4: Enable the Content Management System (Decap CMS)

To allow you to easily edit text and images without touching code, you need to enable the CMS in Netlify.

1. In your Netlify Site dashboard, click on **Site configuration** (or Site settings) on the left sidebar.
2. Scroll down and click on **Identity**, then click **Enable Identity**.
3. Under **Registration preferences**, change it from "Open" to **Invite only** (so strangers can't freely edit your site).
4. Scroll down to **Services** -> **Git Gateway** and click **Enable Git Gateway**. This connects the CMS to your GitHub repo.
5. Go back to the top of the **Identity** tab and click **Invite users**. Enter your own email address to invite yourself as an admin.
6. Check your email, click the invite link, and set a password. You can now access your CMS at `yourwebsite.com/admin/`!

---

## 2. Project Overview

Your website is built for speed, security, and ease of use. It separates **Content** from **Code**, meaning you can update text and images safely without touching the underlying source code.

- **Astro:** The ultra-fast framework used to build and generate your website.
- **Decap CMS:** Your user-friendly content management dashboard.
- **GitHub:** Securely stores your website's code and content history.
- **Netlify:** Hosts your website and automatically updates it when you publish changes.
- **Web3Forms:** Processes customer enquiries and delivers them to your inbox.

---

## 3. How Your Website Works

Your website relies on two completely independent systems.

### A. The Website & Content System

This is how your website updates when you change text or images:
`You edit content in Decap CMS → Decap saves the change to GitHub → Netlify detects the GitHub change → Astro rebuilds the website → the updated website goes live.`

### B. The Customer Enquiry System

This is how customers contact you (changes in the CMS do not affect this):
`Customer (via Website Form) -> Web3Forms -> Your Business Email`

---

## 4. Managing Content with Decap CMS

**Decap CMS** is your admin panel. You will log in here to update your website. Once set up, access it by adding `/admin/` to your website URL (e.g., `www.yourwebsite.com/admin/`).

### What Can You Change?

You can safely update:

- **Site Settings** (Contact info, logos, global SEO)
- **Services & Vehicles** (Descriptions, pricing details, amenities)
- **Pages** (Home, About, Contact, Privacy, Terms)
- **Blog & FAQs**
- **Customer Reviews**

### How to Publish Changes

1. Log in to the CMS and edit your content.
2. Click **Publish**.
3. **Wait a few minutes.** Because your website is highly optimized and statically generated, Netlify needs a moment to rebuild the pages. The changes will appear live shortly after.

### Important: Content Validation

The website uses strict validation (Zod schemas) to check content during the build. If required data is missing or invalid, the build may fail rather than publishing an invalid version of the website. If this happens, contact your developer.

---

## 5. SEO & Best Practices

- **SEO Fields:** Most CMS pages include fields for SEO Title and Description. Use these to control how your pages appear on Google.
- **Images:** Always compress images before uploading them. Large images slow down your website and increase bandwidth usage.
- **Blogging:** Use the blog to answer real customer questions and link naturally to your services. Useful content beats keyword stuffing.

---

## 6. Client vs. Developer Responsibilities

By completing the initial setup, **you (the client) fully own the core accounts** (GitHub, Netlify, Domain, Web3Forms). You can grant a developer access when needed without losing ownership.

### You (The Content Administrator) Should:

- Update text, images, services, and blogs via Decap CMS.
- Manage your business email for form enquiries.
- Keep your hosting and domain subscriptions active.

### A Developer Should Handle:

- Design and layout changes (CSS/Tailwind).
- Adding entirely new features or website sections.
- Fixing complex code or build errors.
- Configuring new integrations.

---

## 7. Common Questions (FAQ)

**Do I need to know how to code?**
No. All regular content updates are done through the user-friendly Decap CMS interface.

**Why doesn't my change appear immediately?**
Publishing triggers a new build. It takes a few minutes for Netlify to generate the new files. Check back shortly!

**Can I create a brand new category?**
Only if the CMS provides a specific field for it. Adding a new category often requires a developer to create a new layout or route in the code.

**What happens if I publish a mistake?**
Simply log back into the CMS, correct the mistake, and click Publish again.

**Can I change the website design from the CMS?**
No. The CMS is strictly for managing _content_ (text and images). Design changes require a developer to update the Astro code.

---

## 8. Simple Troubleshooting Guide

- **Typo or incorrect text?** -> Log into Decap CMS and fix it.
- **Not receiving customer emails?** -> Check your spam/junk folder first. Then check the Web3Forms account and its current submission allowance. If the website form itself appears broken, contact your developer.
- **Website looks broken or has a new error?** -> Contact your developer.
- **Website is completely offline?** -> Check your domain registrar (is the domain renewed?) and Netlify account.

---

## 9. Final Security Notes

- **Keep your infrastructure independent.** Ensure you own the Netlify, GitHub, and Domain accounts. Don't leave them permanently tied to a developer's personal email.
- **Never share passwords in the CMS.** The CMS is for public-facing website content only.
