/* navbar.js - Improved navbar functionality with immediate loading */

// Immediately set up the navbar when the DOM begins to load
document.addEventListener('DOMContentLoaded', function () {
    // Show navbar immediately with animation
    const navbar = document.getElementById('navbar');

    // Force immediate display of navbar
    if (navbar) {
        // Add loaded class after a very short delay to trigger animation
        setTimeout(() => {
            navbar.classList.add('loaded');
        }, 10);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Highlight active link
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');

                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add subtle hover effect for navbar
    navbar.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.02)';
    });

    navbar.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Ensure navbar loads even before full DOM content is loaded
(function () {
    // This code runs immediately
    const navbar = document.getElementById('navbar');
    if (navbar) {
        // Make sure navbar is visible
        navbar.style.display = 'block';
    }
})();