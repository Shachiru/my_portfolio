/* Advanced Projects Section with 3D Cards and Animations */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tilt effect for project cards
    initTiltEffect();

    // Initialize filter functionality
    initFilters();

    // Initialize particle background
    initParticles();

    // Initialize image loading animations
    initImageLoading();

    // Add smooth interaction animations
    initInteractions();
});

// Initialize tilt effect
function initTiltEffect() {
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".project-card-inner"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.03,
            perspective: 1000
        });
    } else {
        console.log('VanillaTilt library not loaded');
    }
}

// Initialize project filtering
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Hide/show card with animation
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 500);
                }
            });

            // Re-arrange the grid after filtering
            setTimeout(() => {
                rearrangeGrid();
            }, 600);
        });
    });
}

// Rearrange grid after filtering (maintain clean layout)
function rearrangeGrid() {
    const projectsGrid = document.querySelector('.projects-grid');
    const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');

    // Simple re-arrangement for demo
    visibleProjects.forEach((project, index) => {
        project.style.order = index;
    });
}

// Initialize particles background
function initParticles() {
    if (window.particlesJS) {
        particlesJS('projects-particles', {
            particles: {
                number: {
                    value: 30,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.15,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Lazy load and animate images
function initImageLoading() {
    const projectImages = document.querySelectorAll('.project-image');

    projectImages.forEach(image => {
        // Fade in images once loaded
        if (image.complete) {
            image.classList.add('loaded');
        } else {
            image.addEventListener('load', () => {
                image.classList.add('loaded');
            });
        }

        // Add error handling
        image.addEventListener('error', () => {
            image.src = 'assets/images/placeholder-project.jpg';
        });
    });
}

// Add smooth interactions and animations
function initInteractions() {
    // Tech badge animations
    const techBadges = document.querySelectorAll('.tech-badge');

    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1) translateY(-3px)';
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Project links hover effect
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Modal functionality for project details (if needed)
    document.querySelectorAll('.project-link.demo').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                // Here you could open a modal with project details
                console.log('Demo link clicked:', link.closest('.project-card').querySelector('.project-title').textContent);
            }
        });
    });
}