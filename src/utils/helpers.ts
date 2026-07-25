import type { CollectionEntry } from 'astro:content';

/**
 * Generates a pre-filled WhatsApp URL with page context
 */
export function getWhatsAppUrl(phone: string, serviceName?: string, pageUrl?: string): string {
    // Clean phone number to digits only
    const cleanPhone = phone.replace(/\D/g, '');

    let message = "Hello, I would like to enquire about private transport in Udaipur.";
    if (serviceName) {
        message = `Hello, I am enquiring about ${serviceName}.`;
        if (pageUrl) {
            message += `\nPage: ${pageUrl}`;
        }
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Filter published items and sort by sortOrder ascending
 */
export function sortPublishedByOrder<T extends { data: { published: boolean; sortOrder: number } }>(items: T[]): T[] {
    return items
        .filter(item => item.data.published)
        .sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}