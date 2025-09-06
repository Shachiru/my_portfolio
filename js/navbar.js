document.addEventListener('DOMContentLoaded', function () {
    // Show navbar immediately with animation
    const navbar = document.getElementById('navbar');

    // Force immediate display of navbar
    if (navbar) {
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

(function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.display = 'block';
    }
})();