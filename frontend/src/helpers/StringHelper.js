export const formatDateTime = (date) => {
    if (!date) return 'N/A';
    try {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date(date));
    } catch (error) {
        return 'Invalid Date';
    }
};
