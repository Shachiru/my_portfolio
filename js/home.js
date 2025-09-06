/* 3D Galaxy Animation with Heartbeat Stars */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize 3D star field
    initStarField();

    // Initialize role typewriter effect
    initRoleAnimation();

    // Update current time
    updateDateTime();
});

// 3D Star field with heartbeat animation
function initStarField() {
    const canvas = document.getElementById('star-field');
    const ctx = canvas.getContext('2d');

    // Set canvas to full screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Star properties
    let stars = [];
    const maxStars = window.innerWidth > 768 ? 200 : 100;
    const layers = 3;

    // Create stars with different depths
    function createStars() {
        stars = [];
        for (let layer = 0; layer < layers; layer++) {
            const layerStars = Math.floor(maxStars / layers);

            for (let i = 0; i < layerStars; i++) {
                const size = Math.random() * 1.5 + (layer * 0.8);

                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 1000, // Depth for 3D effect
                    radius: size,
                    originalRadius: size,
                    color: `rgba(255, 255, 255, ${0.5 + (layer * 0.2)})`,
                    layer: layer,
                    pulse: 0,
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                    // Add vertical movement
                    yOffset: 0,
                    yDirection: Math.random() > 0.5 ? 1 : -1,
                    ySpeed: Math.random() * 0.2 + 0.1
                });
            }
        }
    }

    // Animation loop
    function animateStars() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw stars
        stars.forEach(star => {
            // Heartbeat pulse effect
            star.pulse += star.pulseSpeed;
            const pulseFactor = Math.sin(star.pulse) * 0.5 + 0.5;
            star.radius = star.originalRadius * (0.8 + (pulseFactor * 0.5));

            // Vertical movement (up and down)
            star.yOffset += star.ySpeed * star.yDirection;

            // Reverse direction at limits
            if (Math.abs(star.yOffset) > 20) {
                star.yDirection *= -1;
            }

            // 3D perspective movement
            star.z -= 0.2 + (star.layer * 0.1);

            // Reset depth when star moves past viewer
            if (star.z <= 0) {
                star.z = 1000;
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            }

            // Calculate position with perspective
            const scale = 1000 / star.z;
            const x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
            const y = (star.y - canvas.height / 2) * scale + canvas.height / 2 + star.yOffset;

            // Draw star with glow effect
            const glowSize = star.radius * (1 + pulseFactor * 0.5);

            // Star glow
            const gradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, glowSize * 2
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * scale})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(x, y, glowSize * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Star core
            ctx.beginPath();
            ctx.arc(x, y, star.radius * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, scale)})`;
            ctx.fill();
        });

        // Continue animation
        requestAnimationFrame(animateStars);
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        resizeCanvas();
        createStars();
    });

    // Initialize star field
    resizeCanvas();
    createStars();
    animateStars();

    // Add mouse interaction
    canvas.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        stars.forEach(star => {
            // Calculate distance from mouse to star
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Create repulsion effect when mouse is near
            if (distance < 100) {
                // Increase pulse speed when mouse is near
                star.pulseSpeed = 0.05;
                // Make star move away from mouse
                const angle = Math.atan2(dy, dx);
                star.x -= Math.cos(angle) * 0.5;
                star.y -= Math.sin(angle) * 0.5;
            } else {
                // Reset pulse speed when mouse is far
                star.pulseSpeed = Math.random() * 0.02 + 0.01;
            }
        });
    });
}

// Role typewriter animation
function initRoleAnimation() {
    const roleElement = document.getElementById('changing-role');
    const roles = [
        "UI/UX Designer",
        "Frontend Developer",
        "Software Engineer",
        "DevOps Engineer"
    ];

    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function typeRole() {
        const fullText = roles[currentIndex];

        // Add or remove characters based on typing direction
        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }

        // Update text
        roleElement.textContent = currentText;

        // Typing speed
        let typingSpeed = isDeleting ? 80 : 150;

        // When complete or when to start deleting
        if (!isDeleting && currentText === fullText) {
            // Pause at complete word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            // Move to next role
            isDeleting = false;
            currentIndex = (currentIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeRole, typingSpeed);
    }

    // Start typing animation
    typeRole();
}

// Update date and time
function updateDateTime() {
    const dateElement = document.getElementById('current-datetime');

    if (!dateElement) return;

    // Set to current time initially
    updateTime();

    // Update every second
    setInterval(updateTime, 1000);

    function updateTime() {
        const now = new Date();
        const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
        dateElement.textContent = formattedDateTime;
    }
}