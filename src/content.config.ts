import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.enum([
      "Transfers",
      "Local Travel",
      "Outstation Travel",
      "Group and Event Travel",
      "Additional"
    ]),
    summary: z.string().max(160, "Keep summary under 160 characters for SEO cards"),
    image: image().optional(),
    sortOrder: z.number().default(10),
    published: z.boolean().default(true),

    // 1. Who This Is For (Text-only pills)
    whoIsThisFor: z.array(z.string()).optional(),

    // 2. What's Covered (2x2 Grid with Title & Description)
    whatsCovered: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),

    // 3. Suitable Vehicles (Links to vehicle IDs like 'sedan', 'suv', 'tempo-traveller')
    suitableVehicles: z.array(z.string()).optional(),

    // 4. Service-Specific FAQs
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),

    // 5. Approved Tariff & Pricing Rules
    pricing: z.object({
      amount: z.string().optional(), // e.g., "₹899"
      shortLabel: z.string().optional(), // e.g., "onwards, per trip"
      unit: z.string().optional(), // e.g., "Airport to city, sedan"
      lastUpdated: z.string().optional(), // e.g., "Jul 2026"
      inclusions: z.array(z.string()).optional(),
      exclusions: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }).optional(),
  }),
});

const vehiclesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/vehicles" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    passengers: z.number(),
    luggage: z.number(),
    seats: z.number().optional(),
    amenities: z.array(z.string()),
    image: image().optional(),
    imageNote: z.enum(["Actual Vehicle", "Representative Vehicle"]),
    sortOrder: z.number().default(10),
    published: z.boolean().default(true),
    summary: z.string(),
  }),
});

const settingsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/settings" }),
  schema: z.object({
    companyName: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    email: z.string().email(),
    address: z.string(),
    operatingHours: z.string(),
    serviceArea: z.string(),
    seoDefaultTitle: z.string(),
    seoDefaultDesc: z.string(),
  }),
});

const faqsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string().max(120, "Keep questions concise for mobile viewports"),
    answer: z.string(),
    category: z.enum([
      "General & Booking",
      "Pricing & Tariffs",
      "Vehicles & Drivers",
      "Outstation Routes"
    ]).default("General & Booking"),
    order: z.number().default(10), // Low numbers (e.g., 1, 2) appear first
    published: z.boolean().default(true),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string().max(100, "Keep title SEO friendly"),
    summary: z.string().max(160, "Summary used for card preview and SEO description"),
    publishDate: z.string(),
    author: z.string().default("Transport Editorial Team"),
    category: z.enum(["Vehicle Guide", "Airport Transfers", "Pricing & Quotes", "Travel Tips"]),
    image: image().optional(),
    relatedService: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/about" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    storyHeading: z.string().default("Our Story"),
    image: image().optional(),
    // 1. How We Work Section
    howWeWorkHeading: z.string().default("How we work"),
    howWeWork: z.array(z.object({
      icon: z.string(), // e.g., "IconFileCheck", "IconCar", "IconPhoneCall", "IconShieldCheck"
      title: z.string(),
      desc: z.string(),
    })),

    // 2. Stats Banner Section
    stats: z.array(z.object({
      value: z.string(), // e.g., "Udaipur", "6+", "5", "Direct"
      label: z.string(), // e.g., "Home base & primary service area"
    })).default([
      { value: "Udaipur", label: "Home base & primary service area" },
      { value: "6+", label: "Service categories offered" },
      { value: "5", label: "Vehicle categories, sedan to coach" },
      { value: "Direct", label: "Contact by form, WhatsApp & call" }
    ]),

    // 3. Where We Operate
    coverageHeading: z.string().default("Where we operate"),
    coverageSubtitle: z.string(),
    coverageLocations: z.array(z.string()), 
  }),
});

const contactCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/contact" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    directChannelsHeading: z.string(),
    directChannelsDesc: z.string(),
    locationHeading: z.string(),
    locationSubheading: z.string(),
    locationDesc: z.string(),
    googleMapsUrl: z.string(),
  }),
});

const enquiryCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/enquiry" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    noindex: z.boolean().default(false),
    processHeading: z.string(),
    processSubtitle: z.string(),
    processSteps: z.array(z.object({
      stepNumber: z.string(),
      title: z.string(),
      desc: z.string(),
    })),
    alternativesHeading: z.string(),
    alternativesDesc: z.string(),
  }),
});

const privacyCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/privacy" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    lastUpdated: z.string(),
  }),
});

const termsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/terms" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    lastUpdated: z.string(),
  }),
});

const reviewCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/reviews" }),
  schema: ({ image }) => z.object({
    author: z.string(),
    location: z.string().default("Verified Traveller"),
    service: z.string(), // e.g., "Airport Pickup & 2-Day Sightseeing"
    rating: z.number().min(1).max(5).default(5),
    date: z.string(), // e.g., "October 2025"
    comment: z.string(),
    verified: z.boolean().default(true),
    image: image().optional(), 
    featured: z.boolean().default(true), 
    sortOrder: z.number().default(10),
  }),
});

export const collections = {
  'services': servicesCollection,
  'vehicles': vehiclesCollection,
  'settings': settingsCollection,
  'faqs': faqsCollection,
  'blog': blogCollection,
  'about': aboutCollection,
  'contact': contactCollection,
  'enquiry': enquiryCollection,
  'privacy': privacyCollection,
  'terms': termsCollection,
  'reviews': reviewCollection,
};