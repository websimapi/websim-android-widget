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

// --- Multiplayer Phone App Logic ---

const phoneIcon = document.getElementById('phone-icon');
const phoneApp = document.getElementById('phone-app');
const backButton = document.getElementById('back-button');
const contactList = document.getElementById('contact-list');

phoneIcon.addEventListener('click', () => {
    phoneApp.classList.remove('hidden');
});

backButton.addEventListener('click', () => {
    phoneApp.classList.add('hidden');
});

const room = new WebsimSocket();

async function initializeApp() {
    await room.initialize();

    room.subscribePresence(() => {
        updateContactList();
    });

    updateContactList();
}

function updateContactList() {
    if (!room.peers) return;

    contactList.innerHTML = ''; 

    const otherPeers = Object.values(room.peers).filter(peer => peer.id !== room.clientId);
    
    if (otherPeers.length === 0) {
        const li = document.createElement('li');
        li.textContent = "No one else is online.";
        li.style.padding = "20px";
        li.style.textAlign = "center";
        li.style.color = "#888";
        contactList.appendChild(li);
        return;
    }

    otherPeers.forEach(peer => {
        const li = document.createElement('li');
        li.className = 'contact-item';

        li.innerHTML = `
            <img src="${peer.avatarUrl}" alt="${peer.username}'s avatar" class="avatar">
            <span class="username">${peer.username}</span>
            <button class="call-button" data-username="${peer.username}">
                <img src="/icon_phone.png" alt="Call icon">
            </button>
        `;

        contactList.appendChild(li);
    });
}

contactList.addEventListener('click', (event) => {
    const callButton = event.target.closest('.call-button');
    if (callButton) {
        const username = callButton.dataset.username;
        alert(`Calling ${username}...`);
        // In a real app, this would initiate a WebRTC call.
    }
});

initializeApp();