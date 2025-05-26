/**
 * Profile Page Navigation Manager for HacknGo
 * Handles navigation between pages and profile interactions
 */

class ProfileNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.createNavigationWrapper();
        this.setupBottomNavigation();
        this.setupProfileActions();
        this.addNavigationStyles();
    }

    /**
     * Create a wrapper div for navigation that stays on top (Profile page only)
     */
    createNavigationWrapper() {
        // Find navigation elements
        const navElements = this.findProfileNavigationElements();
        
        if (navElements.length === 0) {
            console.log('No navigation elements found');
            return;
        }

        // Create the wrapper div
        const navWrapper = document.createElement('div');
        navWrapper.id = 'profile-navigation-wrapper';
        navWrapper.className = 'profile-nav-wrapper';

        // Clone navigation elements into the wrapper
        navElements.forEach(element => {
            navWrapper.appendChild(element.cloneNode(true));
            element.style.display = 'none'; // Hide original elements
        });

        // Add wrapper to the body (so it's always on top)
        document.body.appendChild(navWrapper);

        console.log('Profile navigation wrapper created with', navElements.length, 'elements');
    }

    /**
     * Find navigation-related elements for profile page
     */
    findProfileNavigationElements() {
        const selectors = [
            '.profile-child11', // navigation background
            '.home', '.learn', '.practice', '.profile1', '.leaderboard', // text labels
            '.home-icon', '.book-open-alt-icon', '.atom-alt-icon', '.trophy-icon', '.user-icon' // icons
        ];

        const elements = [];
        selectors.forEach(selector => {
            const found = document.querySelectorAll(selector);
            found.forEach(el => {
                // Check if this element is part of bottom navigation by position
                const rect = el.getBoundingClientRect();
                const phoneFrame = document.querySelector('.phone-frame');
                const frameRect = phoneFrame ? phoneFrame.getBoundingClientRect() : { bottom: window.innerHeight };
                
                // If element is in bottom 100px of phone frame, it's likely navigation
                if (rect.bottom >= frameRect.bottom - 100) {
                    elements.push(el);
                }
            });
        });

        return elements;
    }

    /**
     * Setup bottom navigation bar
     */
    setupBottomNavigation() {
        // Wait a bit for wrapper to be created
        setTimeout(() => {
            const wrapper = document.getElementById('profile-navigation-wrapper');
            const container = wrapper || document; // fallback to document if wrapper not found

            // Home icon -> home.html
            const homeIcon = container.querySelector('.home-icon');
            if (homeIcon) {
                homeIcon.addEventListener('click', () => {
                    this.navigateToPage('./home.html');
                });
            }

            // Learn icon -> learning.html
            const learnIcon = container.querySelector('.book-open-alt-icon');
            if (learnIcon) {
                learnIcon.addEventListener('click', () => {
                    this.navigateToPage('./learning.html');
                });
            }

            // Practice icon -> practice.html
            const practiceIcon = container.querySelector('.atom-alt-icon');
            if (practiceIcon) {
                practiceIcon.addEventListener('click', () => {
                    this.navigateToPage('./practice.html');
                });
            }

            // Leaderboard icon -> leaderboard.html
            const leaderboardIcon = container.querySelector('.trophy-icon');
            if (leaderboardIcon) {
                leaderboardIcon.addEventListener('click', () => {
                    this.navigateToPage('./leaderboard.html');
                });
            }

            // Profile icon -> profile.html (current page)
            const profileIcon = container.querySelector('.user-icon');
            if (profileIcon) {
                profileIcon.addEventListener('click', () => {
                    this.showNotification('You are already on the Profile page!', 'info');
                });
            }
        }, 100);
    }

    /**
     * Setup profile-specific actions
     */
    setupProfileActions() {
        // Sign Out button
        const signOutButton = document.querySelector('.profile-child7');
        if (signOutButton) {
            signOutButton.addEventListener('click', () => {
                this.handleSignOut();
            });
            signOutButton.style.cursor = 'pointer';
        }

        // View All Achievements button (if there's a specific element for it)
        const viewAchievements = document.querySelector('.view-all-achievements');
        if (viewAchievements) {
            viewAchievements.addEventListener('click', () => {
                this.showNotification('Achievement details will be available soon!', 'info');
            });
            viewAchievements.style.cursor = 'pointer';
        }
    }

    /**
     * Handle sign out action
     */
    handleSignOut() {
        if (confirm('Are you sure you want to sign out?')) {
            this.showNotification('Signing out...', 'info');
            // Simulate sign out process
            setTimeout(() => {
                // Redirect to sign-in page
                this.navigateToPage('./sign-in.html');
            }, 1500);
        }
    }

    /**
     * Page navigation with fade
     */
    navigateToPage(url) {
        const profileContainer = document.querySelector('.profile');
        if (profileContainer) {
            profileContainer.style.opacity = '0';
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
            /* Match home.html body styling exactly */
            body {
                margin: 0 !important;
                padding: 0 !important;
                background: #000 !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                height: 100vh !important;
            }

            /* Match home.html phone-frame dimensions but allow internal scrolling */
            .phone-frame {
                width: 402px !important;
                height: 874px !important;
                background: #1c1c1c !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                position: relative !important;
                border: 1px solid #333 !important;
                border-radius: 20px !important;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.4) !important;
            }

            /* Ensure profile content has space for fixed navigation */
            .profile {
                padding-bottom: 160px !important;
                min-height: 874px !important;
            }

            /* Match home.html media query */
            @media (min-width: 391px) {
                html, body {
                    overflow: hidden !important;
                }
            }

            /* Profile Navigation Wrapper - Always on Top */
            .profile-nav-wrapper {
                position: fixed !important;
                bottom: 0 !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: 402px !important;
                height: 75px !important;
                z-index: 9999 !important;
                pointer-events: auto !important;
                background: transparent !important;
            }

            /* Wrapper content positioning */
            .profile-nav-wrapper > * {
                position: absolute !important;
            }

            /* Navigation background - EXACT match to home.html positioning */
            .profile-nav-wrapper .profile-child11 {
                position: absolute !important;
                top: 0 !important;
                right: 16px !important;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
                border-radius: 20px !important;
                background-color: #2a365c !important;
                width: 371px !important;
                height: 54px !important;
                bottom: auto !important;
                left: auto !important;
            }

            /* Navigation text labels - EXACT match to home.html positions */
            .profile-nav-wrapper .home {
                position: absolute !important;
                top: 32px !important;
                left: 60px !important;
                font-size: 11px !important;
                color: #acc0ff !important;
                width: 31px !important;
                height: 15px !important;
                font-family: 'IBM Plex Sans' !important;
                display: inline-block !important;
            }

            .profile-nav-wrapper .learn {
                position: absolute !important;
                top: 32px !important;
                left: 116px !important;
                font-size: 11px !important;
                color: #acc0ff !important;
                width: 31px !important;
                height: 15px !important;
                font-family: 'IBM Plex Sans' !important;
                display: inline-block !important;
            }

            .profile-nav-wrapper .practice {
                position: absolute !important;
                top: 32px !important;
                left: 173px !important;
                font-size: 11px !important;
                color: #acc0ff !important;
                text-align: center !important;
                width: 42px !important;
                height: 15px !important;
                font-family: 'IBM Plex Sans' !important;
                display: inline-block !important;
            }

            .profile-nav-wrapper .profile1 {
                position: absolute !important;
                top: 32px !important;
                left: 311px !important;
                font-size: 11px !important;
                color: #acc0ff !important;
                width: 32px !important;
                height: 15px !important;
                font-family: 'IBM Plex Sans' !important;
                display: inline-block !important;
            }

            .profile-nav-wrapper .leaderboard {
                position: absolute !important;
                top: 32px !important;
                left: 231px !important;
                font-size: 11px !important;
                color: #acc0ff !important;
                width: 71px !important;
                height: 15px !important;
                font-family: 'IBM Plex Sans' !important;
                display: inline-block !important;
            }

            /* Navigation icons - EXACT match to home.html positions */
            .profile-nav-wrapper .home-icon {
                position: absolute !important;
                top: 7px !important;
                left: 63px !important;
                width: 24px !important;
                height: 24px !important;
                cursor: pointer !important;
            }

            .profile-nav-wrapper .book-open-alt-icon {
                position: absolute !important;
                top: 9px !important;
                left: 118px !important;
                width: 20px !important;
                height: 20px !important;
                cursor: pointer !important;
            }

            .profile-nav-wrapper .atom-alt-icon {
                position: absolute !important;
                top: 9px !important;
                left: 182px !important;
                width: 24px !important;
                height: 24px !important;
                cursor: pointer !important;
            }

            .profile-nav-wrapper .trophy-icon {
                position: absolute !important;
                top: 8px !important;
                left: 249px !important;
                width: 24px !important;
                height: 24px !important;
                cursor: pointer !important;
            }

            .profile-nav-wrapper .user-icon {
                position: absolute !important;
                top: 7px !important;
                left: 315px !important;
                width: 24px !important;
                height: 24px !important;
                cursor: pointer !important;
            }

            /* Hover effects for navigation icons in wrapper - match home.html style */
            .profile-nav-wrapper .home-icon:hover,
            .profile-nav-wrapper .book-open-alt-icon:hover,
            .profile-nav-wrapper .atom-alt-icon:hover,
            .profile-nav-wrapper .trophy-icon:hover,
            .profile-nav-wrapper .user-icon:hover {
                transform: scale(1.1) !important;
                opacity: 0.8 !important;
                transition: none !important;
            }

            /* Hide original navigation elements in phone frame */
            .phone-frame .profile-child11,
            .phone-frame .home,
            .phone-frame .learn,
            .phone-frame .practice,
            .phone-frame .profile1,
            .phone-frame .leaderboard,
            .phone-frame .home-icon,
            .phone-frame .book-open-alt-icon,
            .phone-frame .atom-alt-icon,
            .phone-frame .trophy-icon,
            .phone-frame .user-icon {
                display: none !important;
            }

            /* Profile page transition effects */
            .profile {
                transition: opacity 0.15s ease-out;
            }

            /* Sign out button hover effect */
            .profile-child7:hover {
                background-color: rgba(255, 255, 255, 0.1);
                transition: all 0.2s ease;
            }

            /* View achievements button hover effect */
            .view-all-achievements:hover {
                background-color: rgba(255, 255, 255, 0.1);
                transition: all 0.2s ease;
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
    window.profileNavigationManager = new ProfileNavigationManager();
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileNavigationManager;
} 