/**
 * Password Security Module Navigation Manager for HacknGo
 * Handles navigation between pages and module lessons
 */

class ModuleNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
        this.setupModuleLessons();
        this.setupBackNavigation();
        this.addNavigationStyles();
    }

    /**
     * Setup bottom navigation bar
     */
    setupBottomNavigation() {
        // Home icon -> home.html
        const homeIcon = document.querySelector('.home-icon');
        if (homeIcon) {
            homeIcon.addEventListener('click', () => {
                this.navigateToPage('./home.html');
            });
        }

        // Learn icon -> learning.html
        const learnIcon = document.querySelector('.book-open-alt-icon');
        if (learnIcon) {
            learnIcon.addEventListener('click', () => {
                this.navigateToPage('./learning.html');
            });
        }

        // Practice icon -> practice.html
        const practiceIcon = document.querySelector('.atom-alt-icon');
        if (practiceIcon) {
            practiceIcon.addEventListener('click', () => {
                this.navigateToPage('./practice.html');
            });
        }

        // Leaderboard icon -> leaderboard.html
        const leaderboardIcon = document.querySelector('.trophy-icon');
        if (leaderboardIcon) {
            leaderboardIcon.addEventListener('click', () => {
                this.navigateToPage('./leaderboard.html');
            });
        }

        // Profile icon -> profile.html
        const profileIcon = document.querySelector('.user-icon');
        if (profileIcon) {
            profileIcon.addEventListener('click', () => {
                this.navigateToPage('./profile.html');
            });
        }
    }

    /**
     * Setup module lessons
     */
    setupModuleLessons() {
        // Password Security lesson (first lesson - available)
        this.setupLesson(['.on-click-module-child1', '.password-security1'], () => {
            this.navigateToPage('./password-security-lesson.html');
        });

        // Other lessons - coming soon
        this.setupLesson(['.on-click-module-child2'], () => {
            this.showNotification('Common Password Mistakes lesson will be available soon!', 'info');
        });

        this.setupLesson(['.on-click-module-child4'], () => {
            this.showNotification('Password Strength Quiz will be available soon!', 'info');
        });

        this.setupLesson(['.on-click-module-child6'], () => {
            this.showNotification('Password Managers lesson will be available soon!', 'info');
        });

        this.setupLesson(['.on-click-module-child8'], () => {
            this.showNotification('Creating Strong Passwords lesson will be available soon!', 'info');
        });

        this.setupLesson(['.on-click-module-child10'], () => {
            this.showNotification('This lesson is not unlocked yet', 'info');
        });

        this.setupLesson(['.on-click-module-child12'], () => {
            this.showNotification('This lesson is not unlocked yet', 'info');
        });

        this.setupLesson(['.on-click-module-child14'], () => {
            this.showNotification('This lesson is not unlocked yet', 'info');
        });
    }

    /**
     * Setup back navigation
     */
    setupBackNavigation() {
        const backArrow = document.querySelector('.arrow-left-icon');
        if (backArrow) {
            backArrow.addEventListener('click', () => {
                this.navigateToPage('./learning.html');
            });
            backArrow.style.cursor = 'pointer';
        }
    }

    /**
     * Setup a lesson with multiple possible selectors and click highlighting
     */
    setupLesson(selectors, clickAction) {
        selectors.forEach(selector => {
            const lesson = document.querySelector(selector);
            if (lesson) {
                lesson.addEventListener('click', (event) => {
                    // Add click highlighting
                    this.highlightClick(lesson);
                    // Execute the click action
                    clickAction();
                });
                
                lesson.style.cursor = 'pointer';
                lesson.style.userSelect = 'none';
            }
        });
    }

    /**
     * Add click highlighting effect
     */
    highlightClick(element) {
        // Save original styles
        const originalBackground = element.style.backgroundColor || '';
        const originalTransform = element.style.transform || '';
        
        // Apply click effect
        element.style.backgroundColor = 'rgba(143, 164, 255, 0.3)';
        element.style.transform = 'scale(0.98)';
        
        // Reset after animation
        setTimeout(() => {
            element.style.backgroundColor = originalBackground;
            element.style.transform = originalTransform;
        }, 150);
    }

    /**
     * Regular page navigation with fade
     */
    navigateToPage(url) {
        const moduleContainer = document.querySelector('.on-click-module');
        if (moduleContainer) {
            moduleContainer.style.opacity = '0';
            setTimeout(() => {
                window.location.href = url;
            }, 150);
        } else {
            window.location.href = url;
        }
    }

    /**
     * Add CSS for navigation
     */
    addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Module page transition effects */
            .on-click-module {
                transition: opacity 0.15s ease-out;
            }

            /* Bottom navigation - instant hover effects */
            .home-icon, .book-open-alt-icon, .atom-alt-icon, .trophy-icon, .user-icon {
                cursor: pointer;
                transition: none !important;
            }

            .home-icon:hover, .book-open-alt-icon:hover, .atom-alt-icon:hover, .trophy-icon:hover, .user-icon:hover {
                transform: scale(1.1) !important;
                opacity: 0.8 !important;
            }

            /* Back arrow hover effect */
            .arrow-left-icon:hover {
                transform: scale(1.1);
                opacity: 0.8;
                transition: all 0.2s ease;
            }

            /* Lesson hover effects */
            .on-click-module-child1, .on-click-module-child2, .on-click-module-child4, 
            .on-click-module-child6, .on-click-module-child8, .on-click-module-child10, 
            .on-click-module-child12, .on-click-module-child14 {
                transition: all 0.2s ease;
                cursor: pointer;
                border-radius: 8px;
            }

            .on-click-module-child1:hover, .on-click-module-child2:hover, .on-click-module-child4:hover, 
            .on-click-module-child6:hover, .on-click-module-child8:hover, .on-click-module-child10:hover, 
            .on-click-module-child12:hover, .on-click-module-child14:hover {
                transform: translateY(-2px);
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35);
                background-color: rgba(255, 255, 255, 0.1);
            }

            /* Special styling for available lesson (Password Security) */
            .on-click-module-child1:hover {
                background-color: rgba(143, 164, 255, 0.1);
                border: 1px solid rgba(143, 164, 255, 0.3);
            }

            /* Text elements clickable styling */
            .password-security1 {
                cursor: pointer;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        
        let backgroundColor = '#4488ff';
        if (type === 'success') backgroundColor = '#44ff88';
        if (type === 'error') backgroundColor = '#ff4444';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${backgroundColor};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 14px;
            z-index: 1001;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 300px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.style.opacity = '1', 100);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.moduleNavigationManager = new ModuleNavigationManager();
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuleNavigationManager;
} 