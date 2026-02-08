// Create floating hearts
function createHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;

    const heartCount = 25;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 15 + Math.random() * 25;
        const delay = Math.random() * 5;

        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDelay = `${delay}s`;

        heartsContainer.appendChild(heart);
    }
}

// Create the No button// Create the No button - UPDATED to start on right
function createNoButton() {
    const buttonsContainer = document.getElementById('buttonsContainer');
    if (!buttonsContainer) return null;

    const noBtn = document.createElement('button');
    noBtn.classList.add('btn');
    noBtn.id = 'noBtn';
    noBtn.textContent = 'No';
    noBtn.type = 'button';

    // Get Yes button position and dimensions
    const yesBtn = document.getElementById('yesBtn');
    if (yesBtn) {
        const yesBtnRect = yesBtn.getBoundingClientRect();
        const containerRect = buttonsContainer.getBoundingClientRect();

        // Position No button to the right of Yes button with some spacing
        const spacing = 40; // Space between buttons
        const initialX = yesBtnRect.width + spacing;
        const initialY = 0; // Same vertical position as Yes

        noBtn.style.left = `${initialX}px`;
        noBtn.style.top = `${initialY}px`;
    } else {
        // Fallback to random position if Yes button not found
        updateNoButtonPosition(noBtn);
    }

    buttonsContainer.appendChild(noBtn);
    return noBtn;
}

// Rest of your JavaScript remains the same...
// Update No button position to a random spot within container
function updateNoButtonPosition(noBtn) {
    const container = document.getElementById('buttonsContainer');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const btnWidth = 150;
    const btnHeight = 70;
    const maxX = containerRect.width - btnWidth;
    const maxY = containerRect.height - btnHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Make No button run away from cursor - FIXED VERSION
function setupNoButtonInteraction(noBtn) {
    if (!noBtn) return;

    const container = document.getElementById('buttonsContainer');
    if (!container) return;

    // Store container position for accurate calculations
    let containerRect = container.getBoundingClientRect();
    const btnWidth = 150;
    const btnHeight = 70;
    const maxX = containerRect.width - btnWidth;
    const maxY = containerRect.height - btnHeight;
    const runAwayDistance = 100;

    // Update container position on resize/scroll
    function updateContainerPosition() {
        containerRect = container.getBoundingClientRect();
    }

    window.addEventListener('resize', updateContainerPosition);
    window.addEventListener('scroll', updateContainerPosition);

    // Track mouse position globally
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position on mousemove
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        checkAndMoveButton();
    });

    // Also track touch movement for mobile
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            checkAndMoveButton();
        }
    }, { passive: true });

    // Function to check distance and move button
    function checkAndMoveButton() {
        // Get current button position
        const btnX = parseFloat(noBtn.style.left) || 0;
        const btnY = parseFloat(noBtn.style.top) || 0;

        // Calculate button center in screen coordinates
        const btnCenterX = containerRect.left + btnX + btnWidth / 2;
        const btnCenterY = containerRect.top + btnY + btnHeight / 2;

        // Calculate distance from mouse to button center
        const distanceX = mouseX - btnCenterX;
        const distanceY = mouseY - btnCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If mouse is too close, move the button
        if (distance < runAwayDistance) {
            // Calculate angle away from mouse
            const angle = Math.atan2(distanceY, distanceX);

            // Move in opposite direction (add 180 degrees = π radians)
            const moveAngle = angle + Math.PI;
            const moveDistance = runAwayDistance * 1.2;

            // Calculate new position
            let newX = btnX + Math.cos(moveAngle) * moveDistance;
            let newY = btnY + Math.sin(moveAngle) * moveDistance;

            // Keep button within container bounds with padding
            const padding = 10;
            newX = Math.max(padding, Math.min(maxX - padding, newX));
            newY = Math.max(padding, Math.min(maxY - padding, newY));

            // Apply new position
            noBtn.style.left = `${newX}px`;
            noBtn.style.top = `${newY}px`;
        }
    }

    // Also move button if it's clicked (as a backup)
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateNoButtonPosition(noBtn);
    });

    // Prevent dragging on touch devices
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        updateNoButtonPosition(noBtn);
    }, { passive: false });
}

// Setup Yes button functionality
function setupYesButton() {
    const yesBtn = document.getElementById('yesBtn');
    if (!yesBtn) return;

    const message = document.getElementById('message');
    const noBtn = document.getElementById('noBtn');
    const bearEmoji = document.querySelector('.bear-emoji');

    yesBtn.addEventListener('click', () => {
        sessionStorage.setItem('valentineAccepted', 'true');

        if (message) {
            message.style.display = 'block';
        }

        if (noBtn) {
            noBtn.style.display = 'none';
        }

        createConfetti();

        if (bearEmoji) {
            bearEmoji.textContent = '💖';
            bearEmoji.style.fontSize = '120px';
            bearEmoji.style.animation = 'none';
            setTimeout(() => {
                bearEmoji.style.animation = 'bounce 1s infinite ease-in-out';
            }, 100);
        }

        yesBtn.textContent = "💖";
        yesBtn.style.backgroundColor = '#e91e63';
        yesBtn.style.pointerEvents = 'none';
        yesBtn.style.fontSize = '2.5rem';

        document.title = "💖 Valentine Accepted! 💖";
    });
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff4081', '#e91e63', '#9c27b0', '#3f51b5', '#4CAF50'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('heart');
        confetti.innerHTML = ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];

        const left = Math.random() * 100;
        const top = -10;
        const size = 15 + Math.random() * 25;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 4;

        confetti.style.left = `${left}%`;
        confetti.style.top = `${top}%`;
        confetti.style.fontSize = `${size}px`;
        confetti.style.animation = `float ${duration}s ${delay}s forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, (duration + delay) * 1000);
    }
}

// Restore the accepted state if user has already clicked Yes
function restoreAcceptedState() {
    const isAccepted = sessionStorage.getItem('valentineAccepted');

    if (isAccepted === 'true') {
        const yesBtn = document.getElementById('yesBtn');
        const message = document.getElementById('message');
        const noBtn = document.getElementById('noBtn');
        const bearEmoji = document.querySelector('.bear-emoji');

        if (yesBtn) {
            yesBtn.textContent = "💖";
            yesBtn.style.backgroundColor = '#e91e63';
            yesBtn.style.pointerEvents = 'none';
            yesBtn.style.fontSize = '2.5rem';
        }

        if (message) {
            message.style.display = 'block';
        }

        if (noBtn) {
            noBtn.style.display = 'none';
        }

        if (bearEmoji) {
            bearEmoji.textContent = '💖';
            bearEmoji.style.fontSize = '120px';
        }

        document.title = "💖 Valentine Accepted! 💖";

        createHearts();

        return true;
    }

    return false;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const isAlreadyAccepted = restoreAcceptedState();

    if (!isAlreadyAccepted) {
        createHearts();
        const noBtn = createNoButton();
        if (noBtn) {
            setupNoButtonInteraction(noBtn);
        }
        setupYesButton();
    }

   
});

// Minimal music setup
document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('backgroundMusic');
    if (bgMusic) {
        bgMusic.volume = 0.3; // Set to 30% volume
        bgMusic.play().catch(function () {
            // If blocked, play when user clicks
            document.addEventListener('click', function () {
                bgMusic.play();
            }, { once: true });
        });
    }
});
