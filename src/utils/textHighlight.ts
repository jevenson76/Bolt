// Search across multiple fields in inventory table
export async function searchInventory(query: string) {
    if (!query?.trim()) {
        return [];
    }

    const searchQuery = query.trim().toLowerCase();

    const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .or(`
            sku.ilike.%${searchQuery}%,
            mpn.ilike.%${searchQuery}%,
            item_brand.ilike.%${searchQuery}%,
            item_series.ilike.%${searchQuery}%,
            movement.ilike.%${searchQuery}%,
            style.ilike.%${searchQuery}%,
            dial_color.ilike.%${searchQuery}%
        `);

    if (error) {
        console.error('Search error:', error);
        return [];
    }

    return data;
}