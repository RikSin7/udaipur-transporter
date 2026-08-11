# Client Handover Guide: Website Management

Welcome to your new website! This guide explains how your website operates, how you can manage its content, and how different services work together to keep it running smoothly.

## 1. Project Overview

Your website is built for speed, security, and ease of use. It separates **Content** from **Code**, meaning you can update text and images safely without touching the underlying source code.

- **Astro:** The ultra-fast framework used to build and generate your website.
- **Decap CMS:** Your user-friendly content management dashboard.
- **GitHub:** Securely stores your website's code and content history.
- **Netlify:** Hosts your website and automatically updates it when you publish changes.
- **Web3Forms:** Processes customer enquiries and delivers them to your inbox.

---

## 2. How Your Website Works

Your website relies on two completely independent systems.

### A. The Website & Content System

This is how your website updates when you change text or images:
`You edit content in Decap CMS → Decap saves the change to GitHub → Netlify detects the GitHub change → Astro rebuilds the website → the updated website goes live.`

### B. The Customer Enquiry System

This is how customers contact you (changes in the CMS do not affect this):
`Customer (via Website Form) -> Web3Forms -> Your Business Email`

---

## 3. Managing Content with Decap CMS

**Decap CMS** is your admin panel. You will log in here to update your website.
_(Access URL to be provided separately during final handover)_

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

## 4. Understanding the Infrastructure

You don't need to be a developer to own your website, but it's important to know what these platforms do:

- **GitHub (The Vault):** Tracks every change you make. If you accidentally delete something in the CMS, a developer can recover it from GitHub.
- **Netlify (The Host):** Powers your live website. When you click 'Publish' in the CMS, Netlify rebuilds the site. It also handles your SSL certificates (HTTPS) and custom domain connection.
- **Web3Forms (The Postman):** Simply takes form submissions and emails them to you.

---

## 5. SEO & Best Practices

- **SEO Fields:** Most CMS pages include fields for SEO Title and Description. Use these to control how your pages appear on Google.
- **Images:** Always compress images before uploading them. Large images slow down your website and increase bandwidth usage.
- **Blogging:** Use the blog to answer real customer questions and link naturally to your services. Useful content beats keyword stuffing.

---

## 6. Client vs. Developer Responsibilities

To keep your business secure, **you (the client) should own the core accounts** (GitHub, Netlify, Domain, Web3Forms). You can then grant a developer access when needed.

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
