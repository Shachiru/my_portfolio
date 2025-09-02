document.addEventListener('DOMContentLoaded', function() {
    initParticles();

    initFormInteractions();

    initFormSubmission();

    initContactAnimations();
});

function initParticles() {
    if (window.particlesJS && document.getElementById('contact-particles')) {
        particlesJS('contact-particles', {
            particles: {
                number: {
                    value: 20,
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
                    value: 0.1,
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
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
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
                            opacity: 0.3
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}

function initFormInteractions() {
    document.querySelectorAll('.cosmic-input').forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('has-content');
        }

        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });

        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const fields = contactForm.querySelectorAll('.cosmic-input');

            fields.forEach(field => {
                if (field.value.trim() === '') {
                    isValid = false;
                    showError(field, 'This field is required');
                } else if (field.id === 'email' && !validateEmail(field.value)) {
                    isValid = false;
                    showError(field, 'Please enter a valid email address');
                } else {
                    removeError(field);
                }
            });

            if (isValid) {
                const submitButton = contactForm.querySelector('.cosmic-button');
                submitButton.innerHTML = '<span class="cosmic-button-text">Sending...</span><div class="loader"></div>';
                submitButton.disabled = true;

                setTimeout(() => {
                    showSuccessModal();

                    contactForm.reset();
                    document.querySelectorAll('.cosmic-input').forEach(input => {
                        input.classList.remove('has-content');
                    });

                    submitButton.innerHTML = '<span class="cosmic-button-text">Send Message</span><span class="cosmic-button-icon"><i class="fas fa-paper-plane"></i></span><span class="cosmic-button-effect"></span>';
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            hideSuccessModal();
        });
    });
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(field, message) {
    removeError(field);

    field.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    field.parentElement.appendChild(errorDiv);
}

function removeError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideSuccessModal();
            }
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideSuccessModal();
            }
        });
    }
}

function hideSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function initContactAnimations() {
    document.querySelectorAll('.contact-item').forEach(item => {
        const icon = item.querySelector('.contact-icon');

        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(10deg)';
        });

        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
}