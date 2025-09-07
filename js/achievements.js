// Global variables for viewer functionality
let currentViewerZoom = 1;
let viewerIsDragging = false;
let viewerStartX = 0;
let viewerStartY = 0;
let viewerTranslateX = 0;
let viewerTranslateY = 0;
let currentCertificateImage = '';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Achievements section with inline viewer initializing...');

    // Initialize the achievements section
    initAchievementsSection();

    // Initialize achievements particles background
    initAchievementsParticles();

    // Initialize achievement cards interactions
    initAchievementCards();

    // Initialize viewer image interactions
    initViewerImageInteractions();

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyPress);

    console.log('Achievements section initialized successfully');
});

// Function to view certificate inline
function viewCertificate(certId, imageSrc, title, provider, date, skills, verifyLink) {
    console.log('Viewing certificate:', title);

    const viewer = document.getElementById('certificateViewer');
    const grid = document.querySelector('.achievements-grid');
    const viewerImage = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerSubtitle = document.getElementById('viewerSubtitle');
    const viewerCertTitle = document.getElementById('viewerCertTitle');
    const viewerCertProvider = document.getElementById('viewerCertProvider');
    const viewerCertDate = document.getElementById('viewerCertDate');
    const viewerCertSkills = document.getElementById('viewerCertSkills');
    const viewerVerifyLink = document.getElementById('viewerVerifyLink');

    // Check if elements exist
    if (!viewer || !viewerImage) {
        console.error('Viewer elements not found');
        return;
    }

    // Store current image for download
    currentCertificateImage = imageSrc;

    // Populate viewer with certificate data
    viewerImage.src = imageSrc;
    viewerImage.alt = title;
    viewerTitle.textContent = title;
    viewerSubtitle.textContent = `Issued by ${provider} • ${date}`;
    viewerCertTitle.textContent = title;
    viewerCertProvider.textContent = provider;
    viewerCertDate.textContent = date;
    viewerVerifyLink.href = verifyLink;

    // Clear and populate skills
    viewerCertSkills.innerHTML = '';
    skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        viewerCertSkills.appendChild(skillTag);
    });

    // Reset zoom and position
    resetViewerZoom();

    // Show viewer with animation
    viewer.style.display = 'block';
    setTimeout(() => {
        viewer.classList.add('active');
        grid.classList.add('viewer-active');
    }, 50);

    // Scroll to viewer
    setTimeout(() => {
        viewer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);

    console.log('Certificate viewer opened successfully');
}

// Function to close certificate viewer
function closeCertificateViewer() {
    console.log('Closing certificate viewer');

    const viewer = document.getElementById('certificateViewer');
    const grid = document.querySelector('.achievements-grid');

    if (viewer) {
        viewer.classList.remove('active');
        grid.classList.remove('viewer-active');

        setTimeout(() => {
            viewer.style.display = 'none';
            resetViewerZoom();
        }, 600);
    }
}

// Zoom functions for viewer
function zoomViewer(direction) {
    const viewerImage = document.getElementById('viewerImage');
    if (!viewerImage) return;

    const oldZoom = currentViewerZoom;

    if (direction === 'in') {
        currentViewerZoom = Math.min(currentViewerZoom + 0.3, 3);
    } else if (direction === 'out') {
        currentViewerZoom = Math.max(currentViewerZoom - 0.3, 0.5);
        if (currentViewerZoom === 1) {
            viewerTranslateX = 0;
            viewerTranslateY = 0;
        }
    }

    updateViewerImageTransform();
    console.log(`Viewer zoom changed from ${oldZoom} to ${currentViewerZoom}`);
}

function resetViewerZoom() {
    currentViewerZoom = 1;
    viewerTranslateX = 0;
    viewerTranslateY = 0;
    updateViewerImageTransform();
    console.log('Viewer zoom reset to default');
}

function updateViewerImageTransform() {
    const viewerImage = document.getElementById('viewerImage');
    if (viewerImage) {
        viewerImage.style.transform = `scale(${currentViewerZoom}) translate(${viewerTranslateX / currentViewerZoom}px, ${viewerTranslateY / currentViewerZoom}px)`;
        viewerImage.style.cursor = currentViewerZoom > 1 ? 'move' : 'grab';
    }
}

// Download certificate function
function downloadCertificate() {
    if (!currentCertificateImage) {
        console.error('No certificate image to download');
        return;
    }

    const link = document.createElement('a');
    link.href = currentCertificateImage;
    link.download = `certificate-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Certificate download initiated');
}

// Initialize viewer image interactions
function initViewerImageInteractions() {
    const viewerImage = document.getElementById('viewerImage');
    if (!viewerImage) return;

    // Mouse wheel zoom
    viewerImage.addEventListener('wheel', function(e) {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const oldZoom = currentViewerZoom;
        currentViewerZoom = Math.max(0.5, Math.min(3, currentViewerZoom + delta));

        if (currentViewerZoom === 1) {
            viewerTranslateX = 0;
            viewerTranslateY = 0;
        }

        updateViewerImageTransform();
        console.log(`Wheel zoom: ${oldZoom} -> ${currentViewerZoom}`);
    });

    // Mouse drag functionality
    viewerImage.addEventListener('mousedown', function(e) {
        if (currentViewerZoom > 1) {
            viewerIsDragging = true;
            viewerStartX = e.clientX - viewerTranslateX;
            viewerStartY = e.clientY - viewerTranslateY;
            viewerImage.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (viewerIsDragging && currentViewerZoom > 1) {
            viewerTranslateX = e.clientX - viewerStartX;
            viewerTranslateY = e.clientY - viewerStartY;
            updateViewerImageTransform();
        }
    });

    document.addEventListener('mouseup', function() {
        if (viewerIsDragging) {
            viewerIsDragging = false;
            const viewerImage = document.getElementById('viewerImage');
            if (viewerImage) {
                viewerImage.style.cursor = currentViewerZoom > 1 ? 'move' : 'grab';
            }
        }
    });

    // Touch support for mobile
    let lastTouchDistance = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    viewerImage.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            lastTouchDistance = getTouchDistance(e.touches);
        } else if (e.touches.length === 1 && currentViewerZoom > 1) {
            viewerIsDragging = true;
            touchStartX = e.touches[0].clientX - viewerTranslateX;
            touchStartY = e.touches[0].clientY - viewerTranslateY;
        }
        e.preventDefault();
    });

    viewerImage.addEventListener('touchmove', function(e) {
        e.preventDefault();

        if (e.touches.length === 2) {
            const currentDistance = getTouchDistance(e.touches);
            const delta = (currentDistance - lastTouchDistance) * 0.01;

            currentViewerZoom = Math.max(0.5, Math.min(3, currentViewerZoom + delta));
            updateViewerImageTransform();
            lastTouchDistance = currentDistance;
        } else if (e.touches.length === 1 && viewerIsDragging && currentViewerZoom > 1) {
            viewerTranslateX = e.touches[0].clientX - touchStartX;
            viewerTranslateY = e.touches[0].clientY - touchStartY;
            updateViewerImageTransform();
        }
    });

    viewerImage.addEventListener('touchend', function() {
        viewerIsDragging = false;
    });

    function getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Handle keyboard events
function handleKeyPress(e) {
    const viewer = document.getElementById('certificateViewer');
    if (viewer && viewer.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeCertificateViewer();
                break;
            case '+':
            case '=':
                zoomViewer('in');
                break;
            case '-':
                zoomViewer('out');
                break;
            case '0':
                resetViewerZoom();
                break;
        }
    }
}

// Initialize particles background
function initAchievementsParticles() {
    if (window.particlesJS && document.getElementById('achievements-particles')) {
        particlesJS('achievements-particles', {
            particles: {
                number: {
                    value: 25,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: ["#56a5fa", "#667eea", "#764ba2"]
                },
                shape: {
                    type: ["circle", "triangle"],
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
                    value: 4,
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
                    distance: 120,
                    color: "#56a5fa",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
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
                        distance: 100,
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

function initAchievementsSection() {
    const achievementCards = document.querySelectorAll('.achievement-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    achievementCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
}

function initAchievementCards() {
    const achievementCards = document.querySelectorAll('.achievement-card');

    achievementCards.forEach(card => {
        const skillTags = card.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        const verifyBtn = card.querySelector('.verify-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            });

            verifyBtn.addEventListener('mouseleave', function() {
                this.style.background = 'linear-gradient(135deg, #56a5fa, #667eea)';
            });
        }
    });

    animateStats();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isNumber = !isNaN(parseInt(finalValue));

                if (isNumber) {
                    animateCounter(target, parseInt(finalValue));
                }
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, targetValue) {
    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// Add loading state for verify buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.verify-btn, .viewer-verify-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            this.style.pointerEvents = 'none';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
});

// Add to window for debugging
window.viewCertificate = viewCertificate;
window.closeCertificateViewer = closeCertificateViewer;
window.zoomViewer = zoomViewer;
window.resetViewerZoom = resetViewerZoom;
window.downloadCertificate = downloadCertificate;