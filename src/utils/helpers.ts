/**
 * Generates a pre-filled WhatsApp URL with page context
 */
export function getWhatsAppUrl(phone: string, serviceName?: string): string {
    const cleanPhone = phone.replace(/\D/g, '');

    let message = "Hello! I am planning a trip and would love some help booking private transport in Udaipur. Could you please share some details and quotes with me?";

    if (serviceName) {
        const lowerName = serviceName.toLowerCase();
        const isGeneric =
            lowerName.includes('about') ||
            lowerName.includes('contact') ||
            lowerName.includes('general') ||
            lowerName.includes('faq') ||
            lowerName.includes('article') ||
            lowerName.includes('blog') ||
            lowerName.includes('review') ||
            lowerName.includes('transport planning')
        if (!isGeneric) {
            message = `Hello! I am planning a trip and would love some help. I am specifically interested in booking the ${serviceName}. Could you please share more details, availability, and pricing with me?`;
        }
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a tel: URI from a formatted phone string
 */
export function getCallUrl(phone: string = ""): string {
    return `tel:${(phone || "").replace(/\s+/g, "")}`;
}

/**
 * Formats a date string or Date object into human-readable string
 */
export function formatDate(date: string | Date, monthFormat: "short" | "long" | "numeric" = "short", locale: string = "en-IN"): string {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(locale, {
        year: "numeric",
        month: monthFormat,
        day: "numeric",
    });
}

/**
 * Converts a hyphenated URL slug into Title Case display label
 */
export function formatSlug(slug: string = ""): string {
    if (!slug) return "";
    return decodeURIComponent(slug)
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Converts an arbitrary text string (such as category name) into a lowercase hyphenated ID/slug
 */
export function slugify(text: string = ""): string {
    return (text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Cleans string for URL parameters while safely URI-encoding special characters
 */
export function createCleanParam(text: string = ""): string {
    const cleaned = text
        .replace(/\//g, '-')          // Replace slashes with hyphens
        .replace(/[()]/g, '')         // Remove parentheses for cleaner reading
        .trim();
    return encodeURIComponent(cleaned)
        .replace(/%20/g, '+')         // Use '+' instead of '%20' for spaces in URL query strings
        .replace(/\+-+\+/g, '+-+');   // Clean up multiple hyphens with pluses
}

/**
 * Filters an array of objects to include only those where `data.published` is not `false`, 
 * and then sorts them based on `data.sortOrder`. 
 * 
 * Items without a `sortOrder` or with `sortOrder` set to `false` are effectively moved to the end.
 * 
 * @param items - Array of items to filter and sort
 * @returns Sorted array of items
 */

interface SortableItem {
    data: {
        published: boolean;
        sortOrder?: number;
    };
};

export function sortPublishedByOrder<T extends SortableItem>(items: T[]): T[] {
    return items
        .filter((i) => i.data.published)
        .sort((a, b) => (a.data.sortOrder ?? Infinity) - (b.data.sortOrder ?? Infinity))
}
