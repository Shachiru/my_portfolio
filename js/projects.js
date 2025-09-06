// Projects Section JavaScript with Fixed Filtering
class ProjectsManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.mouseLight = null;

        // Updated GitHub activity based on your actual repos
        this.githubActivity = {
            'my_portfolio': 'Active Development',
            'Android-Task-Manager-App': 'Recent Updates',
            'online-library-system--frontend': 'Maintained',
            'connect-four-game_CW': 'Stable Release',
            'Project_GymGenius-MVC': 'Complete'
        };

        this.init();
    }

    init() {
        this.createGalaxyBackground();
        this.setupFilterButtons();
        this.setupProjectCards();
        this.setupMouseTracking();
        this.setupIntersectionObserver();
        this.staggerCardAnimations();
        this.addGithubActivityIndicators();

        // Call immediately and then again after a delay to ensure title visibility
        this.ensureTitleVisibility();

        // Call again after a short delay to ensure DOM is fully rendered
        setTimeout(() => {
            this.ensureTitleVisibility();
        }, 100);

        // Final check after page is fully loaded
        window.addEventListener('load', () => {
            this.ensureTitleVisibility();
        });
    }

    ensureTitleVisibility() {
        // Force title visibility with enhanced approach
        const sectionTitle = document.querySelector('.section-title');
        const title = document.querySelector('.cosmic-title');
        const highlight = document.querySelector('.highlight');
        const titleLine = document.querySelector('.title-line');

        if (sectionTitle) {
            // Make section title container super visible
            sectionTitle.style.position = 'relative';
            sectionTitle.style.zIndex = '1000'; // Very high z-index
            sectionTitle.style.display = 'block';
            sectionTitle.style.visibility = 'visible';
            sectionTitle.style.opacity = '1';

            // Remove any potential interfering backgrounds
            sectionTitle.style.background = 'transparent';
        }

        if (title) {
            // Force title to be visible
            title.style.position = 'relative';
            title.style.zIndex = '1001'; // Even higher z-index
            title.style.display = 'block';
            title.style.visibility = 'visible';
            title.style.opacity = '1';

            // Ensure text is visible with multiple approaches
            title.style.color = '#ffffff';
            title.style.textShadow = '0 0 30px rgba(168, 85, 247, 0.8)';

            // Force gradient text to be visible
            title.style.background = 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)';
            title.style.webkitBackgroundClip = 'text';
            title.style.webkitTextFillColor = 'transparent';
            title.style.backgroundClip = 'text';
        }

        if (highlight) {
            // Make highlight text extra visible
            highlight.style.color = '#a855f7 !important';
            highlight.style.webkitTextFillColor = '#a855f7 !important';
            highlight.style.textShadow = '0 0 30px rgba(168, 85, 247, 0.8)';
            highlight.style.position = 'relative';
            highlight.style.zIndex = '1002'; // Highest z-index
            highlight.style.opacity = '1';
            highlight.style.visibility = 'visible';
        }

        if (titleLine) {
            // Make the title line visible
            titleLine.style.opacity = '1';
            titleLine.style.visibility = 'visible';
            titleLine.style.zIndex = '1000';
        }

        console.log('Title visibility enforcement executed');
    }

    createGalaxyBackground() {
        const section = document.querySelector('.cosmic-section');

        // Create galaxy background layers
        const galaxyBg = document.createElement('div');
        galaxyBg.className = 'galaxy-background';

        // Ensure galaxy background doesn't interfere with title
        galaxyBg.style.zIndex = '5'; // Lower z-index than content

        section.appendChild(galaxyBg);

        // Create multiple star layers
        for (let i = 0; i < 3; i++) {
            const starsLayer = document.createElement('div');
            starsLayer.className = 'stars-layer';
            galaxyBg.appendChild(starsLayer);
        }

        // Create blinking stars
        const blinkingStars = document.createElement('div');
        blinkingStars.className = 'blinking-stars';

        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'blinking-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 1) + 's';
            blinkingStars.appendChild(star);
        }
        galaxyBg.appendChild(blinkingStars);

        // Create nebula effect
        const nebulaEffect = document.createElement('div');
        nebulaEffect.className = 'nebula-effect';
        galaxyBg.appendChild(nebulaEffect);
    }

    addGithubActivityIndicators() {
        this.projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent;
            const repoKey = this.getRepoKey(title);

            if (this.githubActivity[repoKey]) {
                const indicator = document.createElement('div');
                indicator.className = 'github-activity';
                indicator.textContent = this.githubActivity[repoKey];
                card.querySelector('.project-card-inner').appendChild(indicator);
            }
        });
    }

    getRepoKey(title) {
        const mapping = {
            'Portfolio Website': 'my_portfolio',
            'Android Task Manager App': 'Android-Task-Manager-App',
            'Online Library System': 'online-library-system--frontend',
            'Connect Four Game': 'connect-four-game_CW',
            'GYM Genius': 'Project_GymGenius-MVC'
        };

        return mapping[title] || '';
    }

    staggerCardAnimations() {
        this.projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
        });
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(button);
            });
        });
    }

    handleFilterClick(clickedButton) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        clickedButton.classList.add('active');

        // Get filter value
        const filterValue = clickedButton.getAttribute('data-filter');

        // Filter projects
        this.filterProjects(filterValue);

        // Add button click effect
        this.addButtonClickEffect(clickedButton);
    }

    filterProjects(filterValue) {
        console.log('Filtering projects with:', filterValue);

        // First, make all cards that should be visible, visible again
        this.projectCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = filterValue === 'all' || cardCategory === filterValue;

            if (shouldShow) {
                // Make sure the card is in the DOM with display block
                card.style.display = 'block';

                // Give the browser a moment to process this change
                setTimeout(() => {
                    card.classList.remove('filtered-out');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 10);
            }
        });

        // Then, animate out and eventually hide cards that shouldn't be shown
        this.projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = filterValue === 'all' || cardCategory === filterValue;

            if (!shouldShow) {
                // Add the filtered-out class first (this handles the visual animation)
                card.classList.add('filtered-out');
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.8)';

                // After animation completes, remove from layout
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500); // This should match your transition duration
            }
        });

        // After all filtering is done, adjust the grid layout
        setTimeout(() => {
            this.adjustGridLayout();
        }, 600);
    }

    adjustGridLayout() {
        // Force a reflow of the grid
        const grid = document.querySelector('.projects-grid');

        // Save current scroll position
        const scrollPosition = window.scrollY;

        grid.style.display = 'none';

        // Force browser reflow
        void grid.offsetHeight;

        // Restore grid
        grid.style.display = 'grid';

        // Restore scroll position to prevent page jump
        window.scrollTo(0, scrollPosition);
    }

    addButtonClickEffect(button) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(168, 85, 247, 0.4);
            transform: scale(0);
            animation: smoothRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;

        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 800);
    }

    setupProjectCards() {
        this.projectCards.forEach(card => {
            this.createProjectDetailsOverlay(card);
            this.createMouseLight(card);

            card.addEventListener('mouseenter', () => this.onCardHover(card));
            card.addEventListener('mouseleave', () => this.onCardLeave(card));

            // Keyboard navigation
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleProjectDetails(card);
                }
            });
        });
    }

    createMouseLight(card) {
        const mouseLight = document.createElement('div');
        mouseLight.className = 'mouse-light';
        card.appendChild(mouseLight);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            mouseLight.style.left = (x - 150) + 'px';
            mouseLight.style.top = (y - 150) + 'px';
        });
    }

    createProjectDetailsOverlay(card) {
        const title = card.querySelector('.project-title').textContent;
        const description = this.getProjectDescription(title);
        const githubLink = this.getGithubLink(title);

        const overlay = document.createElement('div');
        overlay.className = 'project-details-overlay';

        overlay.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="project-links">
                <a href="${githubLink}" target="_blank" class="project-link github">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
                <a href="#" class="project-link demo">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        `;

        card.querySelector('.project-card-inner').appendChild(overlay);
    }

    getProjectDescription(title) {
        const descriptions = {
            'Connect Four Game': 'An interactive two-player strategy game built with Java and JavaFX. Features intelligent AI opponent, smooth animations, comprehensive game statistics tracking, and modern user interface design with responsive controls.',
            'GYM Genius': 'A comprehensive gym management system developed with Java Spring Boot and MySQL. Includes member management, workout tracking, equipment maintenance, billing system, and detailed analytics dashboard with MVC architecture.',
            'Portfolio Website': 'My personal portfolio website showcasing modern web development skills. Features responsive design, smooth animations, glassmorphism effects, optimized performance, and SEO best practices. Currently active with regular updates.',
            'E-Commerce Platform': 'A full-stack e-commerce solution built with the MERN stack. Includes user authentication, product catalog, shopping cart, secure payment processing, order management, and comprehensive admin dashboard.',
            'Home & Vehicle Maintenance App': 'A comprehensive UI/UX design for a mobile maintenance tracking application. Includes user journey mapping, wireframes, interactive prototypes, and modern design principles with accessibility focus.',
            'Online Library System': 'A digital library management system with advanced search capabilities, user authentication, book catalog management, borrowing system, and responsive web design. Recently updated with enhanced features and performance improvements.'
        };

        return descriptions[title] || `A professional ${title.toLowerCase()} project showcasing modern development practices and innovative solutions with clean architecture and user-focused design principles.`;
    }

    getGithubLink(title) {
        // Using your actual GitHub repositories based on provided info
        const githubLinks = {
            'Connect Four Game': 'https://github.com/Shachiru/connect-four-game_CW',
            'GYM Genius': 'https://github.com/Shachiru/Project_GymGenius-MVC',
            'Portfolio Website': 'https://github.com/Shachiru/my_portfolio',
            'Online Library System': 'https://github.com/Shachiru/online-library-system--frontend',
            'E-Commerce Platform': 'https://github.com/Shachiru/e-commerce-platform',
            'Home & Vehicle Maintenance App': 'https://github.com/Shachiru/Android-Task-Manager-App'
        };

        return githubLinks[title] || 'https://github.com/Shachiru';
    }

    onCardHover(card) {
        // Don't apply hover effects to filtered out cards
        if (card.classList.contains('filtered-out')) {
            return;
        }

        // Ultra smooth hover effects
        card.style.filter = 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.25))';

        // Animate tech badges with smooth stagger
        const techBadges = card.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.transform = 'translateY(-3px)';
                badge.style.background = 'rgba(168, 85, 247, 0.2)';
                badge.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                badge.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, index * 40);
        });
    }

    onCardLeave(card) {
        card.style.filter = 'none';

        const techBadges = card.querySelectorAll('.tech-badge');
        techBadges.forEach(badge => {
            badge.style.transform = 'translateY(0)';
            badge.style.background = 'rgba(255, 255, 255, 0.08)';
            badge.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        });
    }

    toggleProjectDetails(card) {
        const overlay = card.querySelector('.project-details-overlay');
        if (overlay) {
            const isVisible = overlay.style.transform === 'translateY(0px)';

            if (isVisible) {
                overlay.style.transform = 'translateY(-100%)';
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            } else {
                overlay.style.transform = 'translateY(0px)';
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            }
        }
    }

    setupMouseTracking() {
        const section = document.querySelector('.cosmic-section');

        // Smooth mouse tracking for galaxy effect
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // Update nebula position with smooth movement
            const nebula = section.querySelector('.nebula-effect');
            if (nebula) {
                nebula.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px) rotate(${x * 0.005}deg)`;
                nebula.style.transition = 'transform 0.3s ease-out';
            }

            // Update star layers with parallax effect
            const starLayers = section.querySelectorAll('.stars-layer');
            starLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.015;
                layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                layer.style.transition = 'transform 0.2s ease-out';
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';

                    // Add smooth glow effect when in view
                    setTimeout(() => {
                        if (!entry.target.classList.contains('filtered-out')) {
                            entry.target.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.1)';
                            entry.target.style.transition = 'box-shadow 1s ease-out';
                        }
                    }, 600);
                }
            });
        }, {
            threshold: 0.1
        });

        this.projectCards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Enhanced CSS animations and fixes
const style = document.createElement('style');
style.textContent = `
    @keyframes smoothRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .project-card.filtered-out {
        opacity: 0 !important;
        transform: translateY(30px) scale(0.8) !important;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .projects-grid {
        transition: all 0.3s ease-out;
    }
    
    /* Critical title visibility fixes */
    .section-title {
        position: relative;
        z-index: 1000 !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
    }
    
    .cosmic-title {
        position: relative;
        z-index: 1001 !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
        color: #ffffff !important;
        text-shadow: 0 0 30px rgba(168, 85, 247, 0.8) !important;
    }
    
    .highlight {
        color: #a855f7 !important;
        -webkit-text-fill-color: #a855f7 !important;
        position: relative;
        z-index: 1002 !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    .title-line {
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 1000 !important;
    }
    
    /* Make sure galaxy background doesn't overlay content */
    .galaxy-background, .stars-layer, .blinking-stars, .nebula-effect {
        z-index: 5 !important;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();

    // Additional check after DOM loaded
    setTimeout(() => {
        const title = document.querySelector('.cosmic-title');
        if (title && (getComputedStyle(title).opacity < 1 || getComputedStyle(title).visibility === 'hidden')) {
            console.log('Title still not visible after DOM load, forcing visibility...');

            title.style.cssText = `
                position: relative !important;
                z-index: 9999 !important;
                visibility: visible !important;
                opacity: 1 !important;
                display: block !important;
                color: #ffffff !important;
                text-shadow: 0 0 30px rgba(168, 85, 247, 0.8) !important;
            `;

            document.querySelector('.highlight').style.cssText = `
                color: #a855f7 !important;
                -webkit-text-fill-color: #a855f7 !important;
                position: relative !important;
                z-index: 9999 !important;
                visibility: visible !important;
                opacity: 1 !important;
            `;
        }
    }, 500);
});

// Export for potential external use
window.ProjectsManager = ProjectsManager;