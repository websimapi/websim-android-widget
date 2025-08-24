function updateTime() {
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');

    const now = new Date();

    // Time formatting
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;

    // Date formatting
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);
}

// Update the time immediately on load
updateTime();

// Then update it every second
setInterval(updateTime, 1000);

