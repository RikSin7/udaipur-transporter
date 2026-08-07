import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string().max(160, "Keep summary under 160 characters for SEO cards"),
    image: image().optional(),
    gallery: z.array(
      z.union([
        z.object({
          url: image(),
          isPrimary: z.boolean().default(false).optional(),
        }),
        image().transform((val) => ({ url: val, isPrimary: false })),
      ])
    ).optional(),
    galleryBadge: z.string(),
    galleryTitle: z.string(),
    galleryDescription: z.string(),
    heroBadge: z.string().optional(),
    heroTitle: z.string(),
    heroDescription: z.string().optional(),
    sortOrder: z.number().default(10),
    published: z.boolean().default(true),

    // 1. Who This Is For
    whoIsThisForHeading: z.string().optional(),
    whoIsThisForContent: z.string().optional(),
    whoIsThisFor: z.array(z.string()).optional(),

    // 2. What's Covered (2x2 Grid with Title & Description)
    whatsCovered: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    whatsCoveredNote: z.string().optional(),

    // 3. Suitable Vehicles (Links to vehicle IDs like 'sedan', 'suv', 'tempo-traveller')
    suitableVehicles: z.array(z.string()).optional(),

    // 4. Service-Specific FAQs
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),

    // 5. Approved Tariff & Pricing Rules
    pricing: z.object({
      prefix: z.string().optional(), // e.g., "Starting from"
      amount: z.union([z.string(), z.number()]).transform(val => typeof val === "number" ? `₹${val}` : val).optional(), // e.g., "₹899" or 899
      shortLabel: z.string().optional(), // e.g., "onwards, per trip"
      unit: z.string().optional(), // e.g., "Airport to city, sedan"
      lastUpdated: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString().slice(0, 10) : val).optional(), // e.g., "Jul 2026"
      inclusions: z.array(z.string()).optional(),
      exclusions: z.array(z.string()).optional(),
      disclaimer: z.string().optional(), // e.g., "Sending a request does not confirm a trip..."
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
    imageNote: z.enum(["Actual Vehicle", "Representative Vehicle"]).optional(),
    sortOrder: z.number().default(10),
    published: z.boolean().default(true),
    summary: z.string(),
  }),
});

const settingsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/settings" }),
  schema: ({ image }) => z.object({
    logo: image().optional(),
    favicon: z.string().optional(),
    companyName: z.string(),
    phone: z.union([z.string(), z.number()]).transform(val => String(val)),
    whatsapp: z.union([z.string(), z.number()]).transform(val => String(val)),
    email: z.string().email(),
    address: z.string(),
    operatingHours: z.string(),
    serviceArea: z.string(),
    seoDefaultTitle: z.string(),
    seoDefaultDesc: z.string(),
    seoDefaultImage: z.string().optional(),
    socialLinks: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      tripadvisor: z.string().optional(),
      googleMaps: z.string().optional(),
    }).optional(),
    footerTagline: z.string().optional(),
    footerDisclaimer: z.string().optional(),
    announcementBar: z.object({
      enabled: z.boolean().default(false),
      text: z.string().optional(),
      link: z.string().optional(),
    }).optional(),
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
    sortOrder: z.number().default(10),
    published: z.boolean().default(true),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string().max(100, "Keep title SEO friendly"),
    summary: z.string().max(160, "Summary used for card preview and SEO description"),
    publishDate: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString().slice(0, 10) : val),
    author: z.string().default("Transport Editorial Team"),
    category: z.enum(["Vehicle Guide", "Airport Transfers", "Pricing & Quotes", "Travel Tips"]).default("Travel Tips"),
    image: image().optional(),
    relatedService: z.string().optional(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/about" }),
  schema: ({ image }) => z.object({
    seoTitle: z.string().optional(),
    seoDesc: z.string().max(160, "Keep SEO description under 160 characters").optional(),
    title: z.string(),
    subtitle: z.string(),
    badge: z.string(),
    storyBadge: z.string().default("Who We Are"),
    storyHeading: z.string().default("Our Story"),
    storyEnquiryBtnText: z.string().default("Send Travel Enquiry"),
    storyWhatsappBtnText: z.string().default("Chat With Us"),
    image: image().optional(),
    heroImage: image().optional(),
    // 1. How We Work Section
    howWeWorkBadge: z.string().default("Operational Standards"),
    howWeWorkHeading: z.string().default("How we work"),
    howWeWork: z.array(z.object({
      icon: z.string(), // e.g., "IconFileCheck", "IconCar", "IconPhoneCall", "IconShieldCheck"
      title: z.string(),
      desc: z.string(),
    })),

    // 2. Stats Banner Section
    stats: z.array(z.object({
      value: z.union([z.string(), z.number()]).transform(val => String(val)), // e.g., "Udaipur", "6+", "5", "Direct"
      label: z.string(), // e.g., "Home base & primary service area"
    })).default([
      { value: "Udaipur", label: "Primary home base & central regional operating area" },
      { value: "6+", label: "Approved private transport service categories offered" },
      { value: "5", label: "Diverse vehicle categories ranging from sedan to coach" },
      { value: "Direct", label: "Direct local operator via form, phone & WhatsApp" }
    ]),

    // 3. Where We Operate
    coverageBadge: z.string(),
    coverageHeading: z.string().default("Where we operate"),
    coverageSubtitle: z.string(),
    coverageLocations: z.array(z.string()),

    // 4. Explore Our Transport Ecosystem
    ecosystemBadge: z.string().default("Next Steps & Resources"),
    ecosystemHeading: z.string().default("Explore Our Transport Ecosystem"),
    ecosystemDescription: z.string().default("Verify our customer feedback, review available transport packages, or reach out directly to plan your Udaipur itinerary."),
    ecosystemCards: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
      link: z.string(),
      linkText: z.string(),
    })).default([
      {
        icon: "IconCar",
        title: "Transport Catalogue",
        desc: "Browse our approved service categories, including airport transfers, local car hire with driver, and outstation Rajasthan tours.",
        link: "/services/",
        linkText: "View All Services",
      },
      {
        icon: "IconShieldCheck",
        title: "Customer Reviews",
        desc: "Read verified feedback from families, couples, and international tourists who have travelled across Udaipur and Rajasthan with our drivers.",
        link: "/reviews/",
        linkText: "Read Real Feedback",
      },
      {
        icon: "IconPhoneCall",
        title: "Contact & Support",
        desc: "Find our phone numbers, WhatsApp details, operating hours, and location information to get in touch with our team immediately.",
        link: "/contact/",
        linkText: "Get In Touch",
      },
    ]),
  }),
});

const contactCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/contact" }),
  schema: ({ image }) => z.object({
    heroImage: image().optional(),
    seoTitle: z.string().optional(),
    seoDesc: z
      .string()
      .max(160, "Keep SEO description under 160 characters")
      .optional(),
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    directChannelsHeading: z.string(),
    directChannelsSubheading: z.string(),
    directChannelsDesc: z.string(),
    phoneCard: z
      .object({
        label: z.string(),
        title: z.string(),
        desc: z.string(),
        badgeText: z.string(),
      })
      .default({
        label: "Call Us Directly",
        title: "+91 70458 36164",
        desc: "Speak directly with our Udaipur dispatch team for immediate cab bookings and urgent route inquiries.",
        badgeText: "Available for Immediate Assistance",
      }),
    whatsappCard: z
      .object({
        label: z.string(),
        title: z.string(),
        desc: z.string(),
        badgeText: z.string(),
      })
      .default({
        label: "WhatsApp Support",
        title: "Chat With Coordinator",
        desc: "Send us your itinerary or voice notes. We reply with flat, owner-approved vehicle quotes and pictures.",
        badgeText: "Pre-filled with website context",
      }),
    emailCard: z
      .object({
        label: z.string(),
        title: z.string(),
        desc: z.string(),
        badgeText: z.string(),
      })
      .default({
        label: "Email Inquiries",
        title: "Email Us",
        desc: "Best suited for detailed multi-day Rajasthan tour itineraries, corporate billing requests, and event transport.",
        badgeText: "Written tariff quotes & invoices",
      }),
    locationHeading: z.string(),
    locationSubheading: z.string(),
    locationDesc: z.string(),
    googleMapsUrl: z.string().optional(),
  }),
});

const privacyCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/privacy" }),
  schema: z.object({
    seoTitle: z.string().optional(),
    seoDesc: z.string().max(160, "Keep SEO description under 160 characters").optional(),
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    lastUpdated: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString().slice(0, 10) : val),
  }),
});

const termsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/terms" }),
  schema: z.object({
    seoTitle: z.string().optional(),
    seoDesc: z.string().max(160, "Keep SEO description under 160 characters").optional(),
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    lastUpdated: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString().slice(0, 10) : val),
  }),
});

const reviewCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/reviews" }),
  schema: ({ image }) => z.object({
    author: z.string(),
    location: z.string().default("Verified Traveller"),
    service: z.string(), // e.g., "Airport Pickup & 2-Day Sightseeing"
    rating: z.number().int().min(1).max(5).default(5),
    date: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString().slice(0, 10) : val), // e.g., "October 2025"
    comment: z.string(),
    verified: z.boolean().default(true),
    image: image().optional(),
    featured: z.boolean().default(true),
    published: z.boolean().default(true),
    sortOrder: z.number().default(10),
  }),
});

const homeCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/home" }),
  schema: z.object({
    // 1. Hero Section
    heroBadge: z.string().default("Private transport from Udaipur"),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroCtaText: z.string().default("Request Travel Quote"),
    heroWhatsappText: z.string().default("WhatsApp Us"),
    heroFeatures: z.array(z.object({
      icon: z.string(),
      text: z.string(),
    })).optional().default([]),

    // 2. Why Choose Us Section
    whyChooseUsBadge: z.string().default("Our Promise"),
    whyChooseUsHeading: z.string().default("Why Travellers Choose Us"),
    whyChooseUsItems: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
      badgeText: z.string(),
    })).optional().default([]),

    // 3. Featured Services Section Header
    servicesSection: z.object({
      badge: z.string().default("Featured Services"),
      heading: z.string().default("What We Drive for You"),
      description: z.string().default("Choose from owner-approved transport categories. We offer transparent pricing structures and reliable driver allocation for every journey."),
    }),

    // 4. Featured Fleet Section Header
    vehiclesSection: z.object({
      badge: z.string().default("Vehicles"),
      heading: z.string().default("Featured Fleet"),
      description: z.string().default("Explore well-maintained cabs and tempo travellers. Every listing features realistic luggage guidance and verified amenities."),
    }),

    // 5. Booking Process Section
    bookingBadge: z.string().default("How to reach us"),
    bookingHeading: z.string().default("Three easy ways to enquire"),
    contactMethods: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
      ctaText: z.string(),
      ctaLink: z.string(),
    })).optional().default([]),
    workflowHeading: z.string().default("What happens after you send a request"),
    workflowSteps: z.array(z.object({
      stepNumber: z.union([z.string(), z.number()]).transform(val => String(val)),
      title: z.string(),
      desc: z.string(),
    })).optional().default([]),

    // 6. Customer Reviews Section Header
    reviewsSection: z.object({
      badge: z.string().default("What Travellers Say"),
      heading: z.string().default("Customer Reviews"),
      description: z.string().default("Read genuine feedback from families, couples, and international travellers who hired private cabs and drivers with Udaipur Royal Transporter."),
    }),

    // 7. Plan Your Trip (Blog) Section Header
    blogSection: z.object({
      badge: z.string().default("Practical Travel Advice"),
      heading: z.string().default("Plan Your Trip"),
      description: z.string().default("Logistical advice on selecting vehicle capacities, navigating airport pickup protocols, and understanding transparent outstation taxi pricing."),
    }),

    // 8. FAQ Section Header
    faqSection: z.object({
      badge: z.string().default("Operational Transparency"),
      heading: z.string().default("Frequently Asked Questions"),
      description: z.string().default("Everything you need to know about our owner-approved pricing, driver selection, and local travel policies."),
    }),

    // 9. Final Enquiry Section
    enquiryBadge: z.string().default("Direct Local Booking"),
    enquiryTitle: z.string().default("Request Your Transport Quote"),
    enquiryDesc: z.string().default("Share your itinerary details below. Our Udaipur team will review your route and contact you directly with an owner-approved rate and vehicle availability."),
  }),
});

const servicesHubCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services_hub" }),
  schema: ({ image }) => z.object({
    heroImage: image().optional(),
    seoTitle: z.string(),
    seoDesc: z.string(),
    badge: z.string(),
    title: z.string(),
    description: z.string(),
    disclaimerText: z.string(),
    categories: z.array(z.object({
      name: z.string(),
      subtitle: z.string(),
      icon: z.string().default("IconCar"),
    })),
  }),
});

const vehiclesHubCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/vehicles_hub" }),
  schema: ({ image }) => z.object({
    heroImage: image().optional(),
    seoTitle: z.string(),
    seoDesc: z.string(),
    badge: z.string(),
    title: z.string(),
    description: z.string(),
    listBadge: z.string().default("Explore By Capacity"),
    listTitle: z.string().default("Select Your Vehicle"),
    listDescription: z.string().default("Compare passenger seat counts, exact luggage allowances, and on-board amenities below. All vehicles arrive air-conditioned, impeccably cleaned, and driven by experienced Rajasthan route chauffeurs."),
  }),
});

const reviewsHubCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/reviews_hub" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDesc: z.string(),
    badge: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

const blogHubCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog_hub" }),
  schema: ({ image }) => z.object({
    heroImage: image().optional(),
    seoTitle: z.string(),
    seoDesc: z.string(),
    badge: z.string(),
    title: z.string(),
    description: z.string(),
    bannerHeading: z.string(),
    bannerDesc: z.string(),
    bannerButtonText: z.string().optional(),
    bannerButtonUrl: z.string().optional(),
    bannerWhatsappText: z.string().optional(),
    articleCtaBadge: z.string(),
    articleCtaTitle: z.string(),
    articleCtaDesc: z.string(),
  }),
});

const faqsHubCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/faqs_hub" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDesc: z.string(),
    badge: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

const thankYouCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/thank_you" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDesc: z.string(),
    title: z.string(),
    message: z.string(),
    buttonText: z.string(),
  }),
});

const catalogueCtaCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/catalogue_cta" }),
  schema: z.object({
    servicesHeaderBadge: z.string().default("Next Steps & Support"),
    servicesHeaderTitle: z.string().default("Explore Fleet & Get Expert Guidance"),
    servicesHeaderDesc: z.string().default("Need assistance mapping your itinerary or comparing vehicle capacities? Connect directly with our local coordinators."),
    servicesCrossBadge: z.string(),
    servicesCrossTitle: z.string(),
    servicesCrossDesc: z.string(),
    servicesInquiryBadge: z.string(),
    servicesInquiryTitle: z.string(),
    servicesInquiryDesc: z.string(),
    vehiclesHeaderBadge: z.string().default("Next Steps & Support"),
    vehiclesHeaderTitle: z.string().default("Explore Services & Get Expert Guidance"),
    vehiclesHeaderDesc: z.string().default("Unsure about vehicle selection or planning outstation travel routes? Connect directly with our local coordinators."),
    vehiclesCrossBadge: z.string(),
    vehiclesCrossTitle: z.string(),
    vehiclesCrossDesc: z.string(),
    vehiclesInquiryBadge: z.string(),
    vehiclesInquiryTitle: z.string(),
    vehiclesInquiryDesc: z.string(),
  }),
});

const directContactCtaCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/direct_contact_cta" }),
  schema: z.object({
    faqsBadge: z.string(),
    faqsTitle: z.string(),
    faqsDesc: z.string(),
    reviewsBadge: z.string(),
    reviewsTitle: z.string(),
    reviewsDesc: z.string(),
  }),
});


export const collections = {
  'home': homeCollection,
  'services': servicesCollection,
  'vehicles': vehiclesCollection,
  'settings': settingsCollection,
  'faqs': faqsCollection,
  'blog': blogCollection,
  'about': aboutCollection,
  'contact': contactCollection,
  'privacy': privacyCollection,
  'terms': termsCollection,
  'reviews': reviewCollection,
  'services_hub': servicesHubCollection,
  'vehicles_hub': vehiclesHubCollection,
  'reviews_hub': reviewsHubCollection,
  'blog_hub': blogHubCollection,
  'faqs_hub': faqsHubCollection,
  'thank_you': thankYouCollection,
  'catalogue_cta': catalogueCtaCollection,
  'direct_contact_cta': directContactCtaCollection,
};