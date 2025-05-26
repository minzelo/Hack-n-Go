/**
 * Leaderboard Page Navigation Manager for HacknGo
 * Handles navigation between pages
 */

class LeaderboardNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
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

        // Leaderboard icon -> leaderboard.html (current page)
        const leaderboardIcon = document.querySelector('.trophy-icon');
        if (leaderboardIcon) {
            leaderboardIcon.addEventListener('click', () => {
                this.showNotification('You are already on the Leaderboard page!', 'info');
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
     * Page navigation with fade
     */
    navigateToPage(url) {
        const leaderboardContainer = document.querySelector('.scoreboard');
        if (leaderboardContainer) {
            leaderboardContainer.style.opacity = '0';
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
            /* Leaderboard page transition effects */
            .scoreboard {
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
    window.leaderboardNavigationManager = new LeaderboardNavigationManager();
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeaderboardNavigationManager;
} 