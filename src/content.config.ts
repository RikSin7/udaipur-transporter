import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicesCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        category: z.enum(["Transfers", "Local Travel", "Outstation Travel", "Group and Event Travel", "Additional"]),
        summary: z.string().max(160, "Keep summary under 160 characters for SEO cards"),
        image: image().optional(),
        sortOrder: z.number().default(10),
        published: z.boolean().default(true),
        pricing: z.object({
            shortLabel: z.string().optional(), // e.g., "From ₹1,500"
            amount: z.string().optional(),     // e.g., "₹1,500 - ₹2,200"
            unit: z.string().optional(),       // e.g., "Per Trip" or "8 Hrs / 80 Km"
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
        question: z.string(),
        answer: z.string(),
        category: z.enum(["General", "Pricing", "Booking", "Vehicles", "Services"]),
        sortOrder: z.number().default(10),
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
        storyHeading: z.string(),
        image: image().optional(),
        imageCaption: z.string().default("Verified Local Identity"),
        promisesHeading: z.string(),
        promises: z.array(z.object({
            icon: z.string(),
            title: z.string(),
            desc: z.string(),
        })),
        coverageHeading: z.string(),
        coverageSubtitle: z.string(),
        coverageAreas: z.array(z.object({
            title: z.string(),
            desc: z.string(),
        })),
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
};