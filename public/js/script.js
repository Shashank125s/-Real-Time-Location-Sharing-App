const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log(`Location accuracy: ${accuracy} meters`);

            socket.emit("send-location", { latitude, longitude, accuracy });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true, // Ensures most accurate location is used
            timeout: 5000, // Timeout for retrieving the location
            maximumAge: 0 // Prevents the use of cached location data
        }
    );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markers = {};

socket.on("receive-location", function (data) {
    const { id, latitude, longitude, accuracy } = data;
    map.setView([latitude, longitude], 15, { animate: true });

    // Remove previous accuracy circle (if any)
    if (markers[id] && markers[id].accuracyCircle) {
        markers[id].accuracyCircle.remove();
    }

    // Add a circle to show the accuracy range
    if (accuracy) {
        const accuracyCircle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);
        markers[id] = markers[id] || {};
        markers[id].accuracyCircle = accuracyCircle;
    }

    // Update or create the marker for the user
    if (markers[id] && markers[id].marker) {
        markers[id].marker.setLatLng([latitude, longitude]);
    } else {
        markers[id] = markers[id] || {};
        markers[id].marker = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", function (id) {
    if (markers[id]) {
        map.removeLayer(markers[id].marker);
        if (markers[id].accuracyCircle) {
            map.removeLayer(markers[id].accuracyCircle);
        }
        delete markers[id];
    }
});
