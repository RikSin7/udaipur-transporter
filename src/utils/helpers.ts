/**
 * Generates a pre-filled WhatsApp URL with page context
 */
export function getWhatsAppUrl(phone: string, serviceName?: string, pageUrl?: string): string {
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

export function sortPublishedByOrder<T extends { data: { published: boolean; sortOrder: number } }>(items: T[]): T[] {
    return items
        .filter(item => item.data.published)
        .sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}

export function createCleanParam(text: string): string {
    return text
        .replace(/\//g, '-')          // Replace slashes with hyphens
        .replace(/[()]/g, '')         // Remove parentheses for cleaner reading
        .replace(/\s+/g, '+')         // Use '+' instead of '%20' for spaces in URL query strings
        .replace(/\+-+\+/g, '+-+')    // Clean up multiple hyphens with pluses
        .trim();
}