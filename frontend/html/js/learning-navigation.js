/**
 * Learning Page Navigation Manager for HacknGo
 * Handles navigation between pages and learning modules
 */

class LearningNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
        this.setupLearningModules();
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

        // Learn icon -> learning.html (current page)
        const learnIcon = document.querySelector('.book-open-alt-icon');
        if (learnIcon) {
            learnIcon.addEventListener('click', () => {
                this.showNotification('You are already on the Learning page!', 'info');
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
     * Setup learning modules with multiple selector fallbacks
     */
    setupLearningModules() {
        // Password Security Module
        this.setupModule(['.learning-child'], () => {
            this.navigateToPage('./password-sec-module.html');
        });

        // Phishing Awareness Module
        this.setupModule(['.learning-child1'], () => {
            this.showNotification('Phishing Awareness module will be available in the future!', 'info');
        });

        // Public WiFi Safety Module - try multiple selectors
        this.setupModule(['.learning-child4', '.learning-child5', '.learning-child6'], () => {
            this.showNotification('Public WiFi Safety module will be available in the future!', 'info');
        });

        // Data Protection Module - try multiple selectors
        this.setupModule(['.learning-child7', '.learning-child8', '.learning-child9'], () => {
            this.showNotification('Data Protection module will be available in the future!', 'info');
        });

        // Two-Factor Authentication Module
        this.setupModule(['.learning-child11'], () => {
            this.showNotification('Two-Factor Authentication module will be available in the future!', 'info');
        });

        // Malware Module
        this.setupModule(['.learning-child14'], () => {
            this.showNotification('Malware module will be available in the future!', 'info');
        });
    }

    /**
     * Setup a module with multiple possible selectors and click highlighting
     */
    setupModule(selectors, clickAction) {
        selectors.forEach(selector => {
            const module = document.querySelector(selector);
            if (module) {
                module.addEventListener('click', (event) => {
                    // Add click highlighting
                    this.highlightClick(module);
                    // Execute the click action
                    clickAction();
                });
                
                module.style.cursor = 'pointer';
                module.style.userSelect = 'none';
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
        const learningContainer = document.querySelector('.learning');
        if (learningContainer) {
            learningContainer.style.opacity = '0';
            setTimeout(() => {
                window.location.href = url;
            }, 150);
        } else {
            window.location.href = url;
        }
    }

    /**
     * Add minimal CSS for navigation
     */
    addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Learning page transition effects */
            .learning {
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

            /* Module hover effects with smooth transitions */
            .learning-child, .learning-child1, .learning-child4, .learning-child5, .learning-child6,
            .learning-child7, .learning-child8, .learning-child9, .learning-child11, .learning-child14 {
                transition: all 0.2s ease;
                cursor: pointer;
            }

            .learning-child:hover, .learning-child1:hover, .learning-child4:hover, .learning-child5:hover, .learning-child6:hover,
            .learning-child7:hover, .learning-child8:hover, .learning-child9:hover, .learning-child11:hover, .learning-child14:hover {
                transform: translateY(-2px);
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35);
                background-color: rgba(255, 255, 255, 0.1);
            }

            /* Click effect styles */
            .learning-child, .learning-child1, .learning-child4, .learning-child5, .learning-child6,
            .learning-child7, .learning-child8, .learning-child9, .learning-child11, .learning-child14 {
                border-radius: 8px;
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
    window.learningNavigationManager = new LearningNavigationManager();
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningNavigationManager;
} 