document.addEventListener('DOMContentLoaded', function () {
    initStarField();

    initRoleAnimation();

    updateDateTime();
});

function initStarField() {
    const canvas = document.getElementById('star-field');
    const ctx = canvas.getContext('2d');

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
                    z: Math.random() * 1000,
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.pulse += star.pulseSpeed;
            const pulseFactor = Math.sin(star.pulse) * 0.5 + 0.5;
            star.radius = star.originalRadius * (0.8 + (pulseFactor * 0.5));
            star.yOffset += star.ySpeed * star.yDirection;
            if (Math.abs(star.yOffset) > 20) {
                star.yDirection *= -1;
            }

            star.z -= 0.2 + (star.layer * 0.1);

            if (star.z <= 0) {
                star.z = 1000;
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            }

            const scale = 1000 / star.z;
            const x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
            const y = (star.y - canvas.height / 2) * scale + canvas.height / 2 + star.yOffset;

            const glowSize = star.radius * (1 + pulseFactor * 0.5);

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
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                star.pulseSpeed = 0.05;
                const angle = Math.atan2(dy, dx);
                star.x -= Math.cos(angle) * 0.5;
                star.y -= Math.sin(angle) * 0.5;
            } else {
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

        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }

        roleElement.textContent = currentText;

        let typingSpeed = isDeleting ? 80 : 150;

        if (!isDeleting && currentText === fullText) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();
}

function updateDateTime() {
    const dateElement = document.getElementById('current-datetime');

    if (!dateElement) return;

    updateTime();

    setInterval(updateTime, 1000);

    function updateTime() {
        const now = new Date();
        const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
        dateElement.textContent = formattedDateTime;
    }
}