document.addEventListener('DOMContentLoaded', function () {
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

        input.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
            removeError(this);
        });

        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });
}

function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            const submitButton = document.getElementById('submitBtn');
            const originalContent = submitButton.innerHTML;

            // Show loading state briefly
            submitButton.innerHTML = '<span class="cosmic-button-text">Opening...</span><div class="loader"></div>';
            submitButton.disabled = true;

            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Create email body
            const emailBody = createEmailBody(name, email, subject, message);

            // Create mailto link
            const mailtoLink = `mailto:shachirurashmika35@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            // Small delay to show loading state
            setTimeout(() => {
                // Open email client
                window.location.href = mailtoLink;

                // Show success modal
                showSuccessModal();

                // Reset button state
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;

                // Reset form after a short delay
                setTimeout(() => {
                    contactForm.reset();
                    document.querySelectorAll('.cosmic-input').forEach(input => {
                        input.classList.remove('has-content');
                        removeError(input);
                    });
                }, 1000);

            }, 800);
        });
    }

    // Modal close handlers
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function () {
            hideSuccessModal();
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideSuccessModal();
        }
    });

    // Close modal on backdrop click
    if (successModal) {
        successModal.addEventListener('click', function (e) {
            if (e.target === successModal) {
                hideSuccessModal();
            }
        });
    }
}

function createEmailBody(name, email, subject, message) {
    const currentDate = new Date().toLocaleString();

    return `Hello Shachiru,

I hope this email finds you well. I'm reaching out through your portfolio contact form.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form on ${currentDate}.

Best regards,
${name}`;
}

function validateForm() {
    let isValid = true;
    const fields = [
        {id: 'name', message: 'Please enter your name'},
        {id: 'email', message: 'Please enter a valid email address'},
        {id: 'subject', message: 'Please enter a subject'},
        {id: 'message', message: 'Please enter your message'}
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();

        if (value === '') {
            isValid = false;
            showError(input, field.message);
        } else if (field.id === 'email' && !validateEmail(value)) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        } else {
            removeError(input);
        }
    });

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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