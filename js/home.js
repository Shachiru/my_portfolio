/* Advanced home.js with 3D star animation */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize star field
    initStarField();

    // Button interactions
    initButtonEffects();

    // 3D tilt effect for glass card
    initTiltEffect();
});

// Star field animation
function initStarField() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Create stars
    let stars = [];
    let shootingStars = [];
    const maxStars = window.innerWidth > 768 ? 200 : 100;
    const layers = 3;

    function createStars() {
        stars = [];
        for (let layer = 0; layer < layers; layer++) {
            for (let i = 0; i < maxStars / layers; i++) {
                const size = Math.random() * 2 + (layer * 1);
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: size,
                    originalRadius: size,
                    color: `rgba(255, 255, 255, ${0.5 + (layer * 0.2)})`,
                    layer: layer,
                    twinkleSpeed: Math.random() * 0.1 + 0.01,
                    twinkleDirection: Math.random() > 0.5 ? 1 : -1,
                    twinkleTime: 0
                });
            }
        }
    }

    // Create a shooting star
    function createShootingStar() {
        if (Math.random() > 0.97 && shootingStars.length < 3) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 3);
            const length = Math.random() * 100 + 50;
            const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);

            shootingStars.push({
                x: x,
                y: y,
                length: length,
                angle: angle,
                speed: Math.random() * 10 + 15,
                opacity: 1
            });
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw and update stars
        stars.forEach(star => {
            // Twinkle effect
            star.twinkleTime += star.twinkleSpeed;
            const twinkleFactor = Math.sin(star.twinkleTime) * 0.5 + 0.5;
            star.radius = star.originalRadius * (0.7 + (twinkleFactor * 0.6));

            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();

            // Move star (parallax effect)
            star.x += (0.1 + (star.layer * 0.1)) * (star.layer + 1);

            // Reset star position when it goes off-screen
            if (star.x > canvas.width + 10) {
                star.x = -10;
                star.y = Math.random() * canvas.height;
            }
        });

        // Create shooting stars
        createShootingStar();

        // Draw and update shooting stars
        shootingStars.forEach((star, index) => {
            ctx.save();
            ctx.translate(star.x, star.y);
            ctx.rotate(star.angle);

            // Create gradient for the shooting star
            const gradient = ctx.createLinearGradient(0, 0, star.length, 0);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(star.length, 0);
            ctx.lineWidth = 2;
            ctx.strokeStyle = gradient;
            ctx.stroke();

            ctx.restore();

            // Update shooting star
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.01;

            // Remove shooting star when it fades out
            if (star.opacity <= 0) {
                shootingStars.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    // Initialize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createStars();
    });

    resizeCanvas();
    createStars();
    animate();
}

// Button effects
function initButtonEffects() {
    const btn = document.querySelector('.btn-galaxy');

    if (btn) {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });

        // Smooth scroll on button click
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// 3D tilt effect for glass card
function initTiltEffect() {
    const card = document.querySelector('.glass-card');

    if (card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 5; // Max 5deg
            const rotateX = ((centerY - y) / centerY) * 5; // Max 5deg

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            // Reset to default animation
            this.style.transform = '';
        });
    }
}