// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function toRad(value) {
    return (value * Math.PI) / 180;
}

// Find nearest church to a given location
export function findNearestChurch(churches, userLat, userLon) {
    let nearest = null;
    let minDistance = Infinity;

    churches.forEach(church => {
        const distance = calculateDistance(
            userLat,
            userLon,
            church.Coords[0],
            church.Coords[1]
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearest = { ...church, distance };
        }
    });

    return nearest;
}

// Format mass times for display
export function formatMassTimes(massString) {
    if (!massString) return null;

    const sections = massString.split('|').map(s => s.trim());
    const formatted = [];

    sections.forEach(section => {
        const parts = section.split(',').map(p => p.trim());
        if (parts.length > 0) {
            const [day, ...times] = parts[0].split(':');
            formatted.push({
                day: day.trim(),
                times: times.length > 0 ? [times.join(':').trim(), ...parts.slice(1)] : parts.slice(1)
            });
        }
    });

    return formatted;
}

// Month names
export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Get color for diocese
export function getDioceseColor(diocese) {
    return diocese === 'Tagbilaran' ? '#2563eb' : '#f59e0b';
}

// Get badge classes for diocese
export function getDioceseBadgeClasses(diocese) {
    return diocese === 'Tagbilaran'
        ? 'bg-blue-100 text-blue-800'
        : 'bg-amber-100 text-amber-800';
}
