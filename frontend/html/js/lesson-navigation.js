/**
 * Lesson Page Navigation Manager for HacknGo
 * Handles navigation between pages from lesson pages
 */

class LessonNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
        this.setupBackArrow();
        this.setupLessonButtons();
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

        // Learn icon -> learning.html (current section)
        const learnIcon = document.getElementById('bookOpenAltIcon');
        if (learnIcon) {
            learnIcon.addEventListener('click', () => {
                this.navigateToPage('./learning.html');
            });
        }

        // Practice icon -> practice.html
        const practiceIcon = document.getElementById('atomAltIcon');
        if (practiceIcon) {
            practiceIcon.addEventListener('click', () => {
                this.navigateToPage('./practice.html');
            });
        }

        // Leaderboard icon -> leaderboard.html
        const leaderboardIcon = document.getElementById('trophyIcon');
        if (leaderboardIcon) {
            leaderboardIcon.addEventListener('click', () => {
                this.navigateToPage('./leaderboard.html');
            });
        }

        // Profile icon -> profile.html
        const profileIcon = document.getElementById('userIcon');
        if (profileIcon) {
            profileIcon.addEventListener('click', () => {
                this.navigateToPage('./profile.html');
            });
        }
    }

    /**
     * Setup back arrow navigation
     */
    setupBackArrow() {
        const backArrow = document.querySelector('.arrow-left-icon');
        if (backArrow) {
            backArrow.addEventListener('click', () => {
                this.navigateToPage('./learning.html');
            });
            
            // Add styling for the back arrow
            this.addInteractiveStyle(backArrow);
        }
    }

    /**
     * Setup lesson-specific buttons
     */
    setupLessonButtons() {
        // Back to Module button -> password-sec-module.html
        const backToModuleBtn = document.getElementById('backToModule');
        if (backToModuleBtn) {
            backToModuleBtn.addEventListener('click', () => {
                this.navigateToPage('./password-sec-module.html');
            });
            this.addInteractiveStyle(backToModuleBtn);
        }

        // Mark as Complete button -> mark-as-done.html
        const markCompleteBtn = document.querySelector('.mark-as-complete');
        if (markCompleteBtn) {
            markCompleteBtn.addEventListener('click', () => {
                this.navigateToPage('./mark-as-done.html');
            });
            this.addInteractiveStyle(markCompleteBtn);
        }

        // Also make the rectangle background clickable for Mark as Complete
        const markCompleteRect = document.getElementById('rectangle2');
        if (markCompleteRect) {
            markCompleteRect.addEventListener('click', () => {
                this.navigateToPage('./mark-as-done.html');
            });
            this.addInteractiveStyle(markCompleteRect);
        }
    }

    /**
     * Add interactive styling to elements
     */
    addInteractiveStyle(element) {
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.2s ease';
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
        
        element.addEventListener('mousedown', () => {
            element.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('mouseup', () => {
            element.style.transform = 'scale(1.05)';
        });
    }

    /**
     * Regular page navigation with fade
     */
    navigateToPage(url) {
        const lessonContainer = document.querySelector('.on-click-lesson');
        if (lessonContainer) {
            lessonContainer.style.opacity = '0';
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
            /* Lesson page transition effects */
            .on-click-lesson {
                transition: opacity 0.15s ease-out;
            }

            /* Bottom navigation - NO TRANSITIONS, INSTANT HOVER EFFECTS ONLY */
            .home-icon, #bookOpenAltIcon, #atomAltIcon, #trophyIcon, #userIcon {
                cursor: pointer;
                transition: none !important;
                transform: none !important;
            }

            /* Instant hover effects for bottom nav (no transitions) */
            .home-icon:hover, #bookOpenAltIcon:hover, #atomAltIcon:hover, #trophyIcon:hover, #userIcon:hover {
                transition: none !important;
                transform: scale(1.1) !important;
                opacity: 0.8 !important;
            }

            /* Instant active effects for bottom nav (no transitions) */
            .home-icon:active, #bookOpenAltIcon:active, #atomAltIcon:active, #trophyIcon:active, #userIcon:active {
                transition: none !important;
                transform: scale(0.95) !important;
                opacity: 0.7 !important;
            }

            /* Enhanced styling for lesson buttons */
            .back-to-module, .mark-as-complete {
                user-select: none;
            }

            .back-to-module:hover, .mark-as-complete:hover {
                color: #8fa4ff !important;
                text-shadow: 0 1px 3px rgba(143, 164, 255, 0.3);
            }

            /* Mark as complete button background hover */
            #rectangle2:hover {
                background-color: rgba(143, 164, 255, 0.1) !important;
                border: 1px solid rgba(143, 164, 255, 0.3) !important;
                border-radius: 8px !important;
            }

            /* Smooth transitions for all interactive elements */
            * {
                -webkit-tap-highlight-color: transparent;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Show notification for navigation feedback
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = '#44ff88';
                break;
            case 'error':
                backgroundColor = '#ff4444';
                break;
            default:
                backgroundColor = '#4488ff';
        }
        
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

// Initialize the lesson navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lessonNavigationManager = new LessonNavigationManager();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LessonNavigationManager;
} 