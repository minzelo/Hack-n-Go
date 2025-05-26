/**
 * Practice Page Navigation Manager for HacknGo
 * Handles navigation between pages and practice quizzes
 */

class PracticeNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
        this.setupQuizNavigation();
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

        // Practice icon -> practice.html (current page)
        const practiceIcon = document.querySelector('.atom-alt-icon');
        if (practiceIcon) {
            practiceIcon.addEventListener('click', () => {
                this.showNotification('You are already on the Practice page!', 'info');
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
     * Setup quiz navigation
     */
    setupQuizNavigation() {
        // Password Security Quiz - available (keep both card and button clickable since it's functional)
        this.setupQuiz(['.practice-item', '.start-quiz'], () => {
            this.navigateToPage('./password-security-quiz.html');
        });

        // Phishing Detection Quiz - coming soon (button and its container)
        this.setupQuiz(['.start-quiz1', '.practice-child2'], () => {
            this.showNotification('Phishing Detection quiz will be available soon!', 'info');
        });

        // Data Protection Quiz - coming soon (button and its container)
        this.setupQuiz(['.start-quiz2', '.practice-child6'], () => {
            this.showNotification('Data Protection quiz will be available soon!', 'info');
        });

        // Public WiFi Safety Quiz - coming soon (button and its container)
        this.setupQuiz(['.start-quiz3', '.practice-child10'], () => {
            this.showNotification('Public WiFi Safety quiz will be available soon!', 'info');
        });
    }

    /**
     * Setup a quiz with click highlighting
     */
    setupQuiz(selectors, clickAction) {
        selectors.forEach(selector => {
            const quiz = document.querySelector(selector);
            if (quiz) {
                quiz.addEventListener('click', (event) => {
                    this.highlightClick(quiz);
                    clickAction();
                });
                
                quiz.style.cursor = 'pointer';
                quiz.style.userSelect = 'none';
            }
        });
    }

    /**
     * Add click highlighting effect
     */
    highlightClick(element) {
        const originalBackground = element.style.backgroundColor || '';
        const originalTransform = element.style.transform || '';
        
        element.style.backgroundColor = 'rgba(143, 164, 255, 0.3)';
        element.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            element.style.backgroundColor = originalBackground;
            element.style.transform = originalTransform;
        }, 150);
    }

    /**
     * Page navigation with fade
     */
    navigateToPage(url) {
        const practiceContainer = document.querySelector('.practice');
        if (practiceContainer) {
            practiceContainer.style.opacity = '0';
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
            /* Practice page transition effects */
            .practice {
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

            /* Only Password Security quiz card is hoverable (since it's functional) */
            .practice-item {
                transition: all 0.2s ease;
                cursor: pointer;
                border-radius: 8px;
            }

            .practice-item:hover {
                transform: translateY(-2px);
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35);
                background-color: rgba(143, 164, 255, 0.1);
                border: 1px solid rgba(143, 164, 255, 0.3);
            }

            /* Make button containers clickable without changing layout */
            .practice-child2, .practice-child6, .practice-child10 {
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .practice-child2:hover, .practice-child6:hover, .practice-child10:hover {
                background-color: rgba(255, 255, 255, 0.05);
            }

            /* Make start quiz text clickable */
            .start-quiz, .start-quiz1, .start-quiz2, .start-quiz3 {
                cursor: pointer;
                user-select: none;
            }

            /* Remove cursor pointer from non-clickable areas */
            .practice-child1, .practice-child5, .practice-child9 {
                cursor: default;
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
    window.practiceNavigationManager = new PracticeNavigationManager();
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PracticeNavigationManager;
} 