/* navbar.js - Simplified navbar functionality */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
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
    const navbar = document.getElementById('navbar');
    navbar.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });

    navbar.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});