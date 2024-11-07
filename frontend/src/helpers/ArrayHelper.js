export const sortProducts = (products, sortOrder, key = 'approved') => {
    const sorted = [...products].sort((a, b) => {
        if (a[key] === b[key]) return 0;
        if (sortOrder === 'asc') {
            return a[key] ? -1 : 1;
        } else {
            return a[key] ? 1 : -1;
        }
    });
    return sorted;
};