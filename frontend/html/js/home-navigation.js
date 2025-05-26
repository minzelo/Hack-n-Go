/**
 * Home Page Navigation Manager for HacknGo
 * Handles navigation between pages and slide-up animations
 */

class HomeNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
        this.setupContinueLearningNavigation();
        this.addSlideUpAnimations();
    }

    /**
     * Setup bottom navigation bar
     */
    setupBottomNavigation() {
        // Home icon (current page - no action needed)
        const homeIcon = document.querySelector('.home-icon');
        
        // Learn icon -> learning.html
        const learnIcon = document.getElementById('bookOpenAltIcon');
        if (learnIcon) {
            learnIcon.addEventListener('click', () => {
                this.navigateToPage('./learning.html');
            });
            // No hover effects for bottom menu
        }

        // Practice icon -> practice.html
        const practiceIcon = document.getElementById('atomAltIcon');
        if (practiceIcon) {
            practiceIcon.addEventListener('click', () => {
                this.navigateToPage('./practice.html');
            });
            // No hover effects for bottom menu
        }

        // Leaderboard icon -> leaderboard.html
        const leaderboardIcon = document.getElementById('trophyIcon');
        if (leaderboardIcon) {
            leaderboardIcon.addEventListener('click', () => {
                this.navigateToPage('./leaderboard.html');
            });
            // No hover effects for bottom menu
        }

        // Profile icon -> profile.html
        const profileIcon = document.getElementById('userIcon');
        if (profileIcon) {
            profileIcon.addEventListener('click', () => {
                this.navigateToPage('./profile.html');
            });
            // No hover effects for bottom menu
        }
    }

    /**
     * Setup Continue Learning section navigation
     */
    setupContinueLearningNavigation() {
        // Password Basics lesson - main background area
        const passwordBasicsSection = document.getElementById('rectangle4');
        if (passwordBasicsSection) {
            passwordBasicsSection.addEventListener('click', () => {
                this.slideUpToPage('./password-security-lesson.html');
            });
            this.addClickableStyle(passwordBasicsSection);
        }

        // Password Basics lesson - text elements (for better UX)
        const passwordBasicsText = document.querySelector('.password-basics');
        if (passwordBasicsText) {
            passwordBasicsText.addEventListener('click', () => {
                this.slideUpToPage('./password-security-lesson.html');
            });
            this.addClickableStyle(passwordBasicsText);
        }

        // Password Security description text
        const passwordSecurityDesc = document.querySelector('.password-security-');
        if (passwordSecurityDesc) {
            passwordSecurityDesc.addEventListener('click', () => {
                this.slideUpToPage('./password-security-lesson.html');
            });
            this.addClickableStyle(passwordSecurityDesc);
        }

        // Common Phishing Techniques lesson - main background area (home-child2)
        const commonPhishingSection = document.querySelector('.home-child2');
        if (commonPhishingSection) {
            commonPhishingSection.addEventListener('click', () => {
                this.showNotification('Common Phishing Techniques lesson coming soon!', 'info');
            });
            this.addClickableStyle(commonPhishingSection);
        }

        // Common Phishing Techniques lesson - text elements
        const commonPhishingText = document.querySelector('.common-phishing-techniques');
        if (commonPhishingText) {
            commonPhishingText.addEventListener('click', () => {
                this.showNotification('Common Phishing Techniques lesson coming soon!', 'info');
            });
            this.addClickableStyle(commonPhishingText);
        }

        // Common Phishing Techniques description text
        const phishingAwarenessDesc = document.querySelector('.phishing-awareness-');
        if (phishingAwarenessDesc) {
            phishingAwarenessDesc.addEventListener('click', () => {
                this.showNotification('Common Phishing Techniques lesson coming soon!', 'info');
            });
            this.addClickableStyle(phishingAwarenessDesc);
        }

        // Password Security Challenge in Daily Challenges section
        this.setupDailyChallengesNavigation();

        // You can add more learning modules here
        // Common Phishing Techniques lesson (if needed)
        // const phishingSection = document.querySelector('.some-phishing-selector');
        // if (phishingSection) {
        //     phishingSection.addEventListener('click', () => {
        //         this.slideUpToPage('./phishing-lesson.html');
        //     });
        //     this.addClickableStyle(phishingSection);
        // }
    }

    /**
     * Setup Daily Challenges section navigation
     */
    setupDailyChallengesNavigation() {
        // First, let's identify elements systematically by looking at their actual positions
        // Remove previous conflicting event listeners by cloning elements
        
        // Phishing Detection challenge (top challenge)
        // Based on CSS: .phishing-detection at top: 449px, should use home-child5 at top: 443px
        const phishingSection = document.querySelector('.home-child5');
        if (phishingSection) {
            // Clone to remove existing listeners
            const newPhishingSection = phishingSection.cloneNode(true);
            phishingSection.parentNode.replaceChild(newPhishingSection, phishingSection);
            
            newPhishingSection.addEventListener('click', () => {
                this.showNotification('Phishing Detection challenge coming soon!', 'info');
            });
            this.addClickableStyle(newPhishingSection);
        }

        // Password Security challenge (middle challenge)  
        // Based on CSS: .password-security at top: 493px, should use home-child6 at top: 487px
        const passwordSection = document.querySelector('.home-child6');
        if (passwordSection) {
            // Clone to remove existing listeners
            const newPasswordSection = passwordSection.cloneNode(true);
            passwordSection.parentNode.replaceChild(newPasswordSection, passwordSection);
            
            newPasswordSection.addEventListener('click', () => {
                this.slideUpToPage('./password-security-quiz.html');
            });
            this.addClickableStyle(newPasswordSection);
        }

        // View All Challenges button (bottom)
        // Based on CSS: .view-all-challenges at top: 542px, should use home-child4 at top: 531px
        const viewAllSection = document.querySelector('.home-child4');
        if (viewAllSection) {
            // Clone to remove existing listeners
            const newViewAllSection = viewAllSection.cloneNode(true);
            viewAllSection.parentNode.replaceChild(newViewAllSection, viewAllSection);
            
            newViewAllSection.addEventListener('click', () => {
                this.navigateToPage('./practice.html');
            });
            this.addClickableStyle(newViewAllSection);
        }

        // Also make text elements clickable
        const phishingText = document.querySelector('.phishing-detection');
        if (phishingText) {
            phishingText.addEventListener('click', () => {
                this.showNotification('Phishing Detection challenge coming soon!', 'info');
            });
            this.addClickableStyle(phishingText);
        }

        const passwordText = document.querySelector('.password-security');
        if (passwordText) {
            passwordText.addEventListener('click', () => {
                this.slideUpToPage('./password-security-quiz.html');
            });
            this.addClickableStyle(passwordText);
        }

        const viewAllText = document.querySelector('.view-all-challenges');
        if (viewAllText) {
            viewAllText.addEventListener('click', () => {
                this.navigateToPage('./practice.html');
            });
            this.addClickableStyle(viewAllText);
        }
    }

    /**
     * Regular page navigation with fade
     */
    navigateToPage(url) {
        const homeContainer = document.querySelector('.home');
        if (homeContainer) {
            homeContainer.style.opacity = '0';
            setTimeout(() => {
                window.location.href = url;
            }, 150);
        } else {
            window.location.href = url;
        }
    }

    /**
     * Slide up animation for lesson pages
     */
    slideUpToPage(url) {
        // Get the phone frame element to match its dimensions
        const phoneFrame = document.querySelector('.phone-frame');
        const phoneRect = phoneFrame.getBoundingClientRect();
        
        // Determine loading text based on URL
        const isQuiz = url.includes('quiz');
        const loadingText = isQuiz ? 'Loading Password Security Quiz...' : 'Loading Password Security Lesson...';
        
        // Create a container for the lesson page that will slide up within the phone frame
        const slideContainer = document.createElement('div');
        slideContainer.className = 'lesson-slide-container';
        slideContainer.style.cssText = `
            position: fixed;
            top: ${phoneRect.bottom}px;
            left: ${phoneRect.left}px;
            width: ${phoneRect.width}px;
            height: ${phoneRect.height}px;
            background: #20273d;
            z-index: 1000;
            transition: top 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            border-radius: 20px;
            box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        `;

        // Add loading content to the slide container
        slideContainer.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: white;
                font-family: 'IBM Plex Sans', sans-serif;
                font-size: 18px;
            ">
                <div style="text-align: center;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border: 3px solid rgba(255,255,255,0.3);
                        border-radius: 50%;
                        border-top-color: #8fa4ff;
                        animation: spin 1s ease-in-out infinite;
                        margin: 0 auto 20px auto;
                    "></div>
                    <div>${loadingText}</div>
                </div>
            </div>
            <style>
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;

        document.body.appendChild(slideContainer);

        // Trigger slide up animation to match the phone frame position
        setTimeout(() => {
            slideContainer.style.top = `${phoneRect.top}px`;
        }, 50);

        // Navigate after animation completes
        setTimeout(() => {
            window.location.href = url;
        }, 550); // Slightly longer to complete the animation
    }

    /**
     * Add hover effects to navigation icons
     */
    addHoverEffect(element) {
        element.style.cursor = 'pointer';
        element.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
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
            element.style.transform = 'scale(1.1)';
        });
    }

    /**
     * Add clickable styling to lesson sections
     */
    addClickableStyle(element) {
        element.style.cursor = 'pointer';
        element.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
            element.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = 'none';
        });

        element.addEventListener('mousedown', () => {
            element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Add CSS animations for enhanced UX
     */
    addSlideUpAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Page transition effects */
            .home {
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

            /* Continue Learning section hover effects */
            .home-child1:hover {
                background-color: rgba(143, 164, 255, 0.1) !important;
                border: 1px solid rgba(143, 164, 255, 0.3) !important;
                border-radius: 8px !important;
            }

            .home-child2:hover {
                background-color: rgba(143, 164, 255, 0.1) !important;
                border: 1px solid rgba(143, 164, 255, 0.3) !important;
                border-radius: 8px !important;
            }

            /* Daily Challenges simple hover effects */
            .home-child4:hover, .home-child5:hover, .home-child6:hover {
                background-color: rgba(143, 164, 255, 0.1) !important;
                border: 1px solid rgba(143, 164, 255, 0.3) !important;
                border-radius: 8px !important;
                transition: all 0.2s ease !important;
            }

            /* Clickable text styling */
            .password-basics, .password-security-, .phishing-detection, .password-security, .view-all-challenges, .common-phishing-techniques, .phishing-awareness- {
                cursor: pointer;
                transition: color 0.2s ease;
                user-select: none;
            }

            .password-basics:hover, .password-security-:hover, .phishing-detection:hover, .password-security:hover, .view-all-challenges:hover, .common-phishing-techniques:hover, .phishing-awareness-:hover {
                color: #8fa4ff !important;
                text-shadow: 0 1px 3px rgba(143, 164, 255, 0.3);
            }

            /* Lesson slide container animation */
            .lesson-slide-container {
                transition: top 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
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
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#44ff88' : '#4488ff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 14px;
            z-index: 1001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.style.opacity = '1', 100);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }
}

// Initialize the home navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homeNavigationManager = new HomeNavigationManager();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomeNavigationManager;
} 