document.addEventListener('DOMContentLoaded', function() {
    initParticles();

    initSmoothScroll();

    animateSkillBars();

    initTiltEffect();

    observeElements();
});

function initParticles() {
    if (window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
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
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
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
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function animateSkillBars() {
    // Delay the animation for a better effect
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                bar.style.width = `${percentage}%`;
            }, 300);
        });
    }, 500);
}

function initTiltEffect() {
    if (window.VanillaTilt) {
        const elements = document.querySelectorAll('[data-tilt]');

        elements.forEach(element => {
            const maxTilt = element.getAttribute('data-tilt-max') || 5;
            const speed = element.getAttribute('data-tilt-speed') || 400;

            VanillaTilt.init(element, {
                max: parseInt(maxTilt),
                speed: parseInt(speed),
                glare: true,
                "max-glare": 0.1,
                gyroscope: true
            });
        });
    } else {
        console.log('VanillaTilt library not loaded');
    }
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    document.querySelectorAll('.skill-category').forEach(item => {
        observer.observe(item);
    });

    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('load', function() {
            this.style.transition = 'opacity 0.8s ease';
            this.style.opacity = '1';
        });

        profilePhoto.style.opacity = '0';
    }
}
