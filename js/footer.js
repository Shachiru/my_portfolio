/* Footer with automatic year update and animations */

document.addEventListener('DOMContentLoaded', function () {
    // Set current year in copyright text
    updateCopyrightYear();

    // Initialize footer particles
    initFooterParticles();

    // Initialize smooth scroll for footer links
    initSmoothScroll();
});

// Update copyright year automatically
function updateCopyrightYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// Initialize particles for footer background
function initFooterParticles() {
    if (window.particlesJS && document.getElementById('footer-particles')) {
        particlesJS('footer-particles', {
            particles: {
                number: {
                    value: 15,
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
                    value: 0.05,
                    random: true
                },
                size: {
                    value: 2,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.05,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.3,
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
                        enable: false
                    }
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.2
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize smooth scroll for footer links
function initSmoothScroll() {
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}