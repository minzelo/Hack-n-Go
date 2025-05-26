/**
 * Quiz Page Navigation Manager for HacknGo
 * Handles navigation between pages from quiz pages
 */

class QuizNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBottomNavigation();
        this.setupQuizAnswers();
        this.setupBackArrow();
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
        const learnIcon = document.getElementById('bookOpenAltIcon');
        if (learnIcon) {
            learnIcon.addEventListener('click', () => {
                this.navigateToPage('./learning.html');
            });
        }

        // Practice icon -> practice.html (current section)
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
     * Setup quiz answer options
     */
    setupQuizAnswers() {
        // Answer 1: password123 (incorrect)
        const answer1 = document.querySelector('.on-click-start-quiz-child2');
        if (answer1) {
            answer1.addEventListener('click', () => {
                this.handleIncorrectAnswer(answer1, 'password123');
            });
            this.addAnswerStyle(answer1);
        }

        // Answer 2: P@ssw0rd (incorrect)
        const answer2 = document.querySelector('.on-click-start-quiz-child4');
        if (answer2) {
            answer2.addEventListener('click', () => {
                this.handleIncorrectAnswer(answer2, 'P@ssw0rd');
            });
            this.addAnswerStyle(answer2);
        }

        // Answer 3: Tr0ub4dor&3 (incorrect)
        const answer3 = document.querySelector('.on-click-start-quiz-child6');
        if (answer3) {
            answer3.addEventListener('click', () => {
                this.handleIncorrectAnswer(answer3, 'Tr0ub4dor&3');
            });
            this.addAnswerStyle(answer3);
        }

        // Answer 4: correct-horse-battery-staple (correct)
        const answer4 = document.querySelector('.on-click-start-quiz-child8');
        if (answer4) {
            answer4.addEventListener('click', () => {
                this.handleCorrectAnswer(answer4);
            });
            this.addAnswerStyle(answer4);
        }
    }

    /**
     * Handle incorrect answer selection
     */
    handleIncorrectAnswer(element, answerText) {
        // Add visual feedback for incorrect answer
        element.style.backgroundColor = 'rgba(255, 68, 68, 0.2)';
        element.style.border = '2px solid #ff4444';
        
        // Show notification
        this.showNotification(`"${answerText}" is not the most secure option. Try again!`, 'error');
        
        // Reset styling after 2 seconds
        setTimeout(() => {
            element.style.backgroundColor = '';
            element.style.border = '';
        }, 2000);
    }

    /**
     * Handle correct answer selection
     */
    handleCorrectAnswer(element) {
        // Add visual feedback for correct answer
        element.style.backgroundColor = 'rgba(68, 255, 136, 0.2)';
        element.style.border = '2px solid #44ff88';
        
        // Show success notification
        this.showNotification('Correct! "correct-horse-battery-staple" is the most secure password.', 'success');
        
        // You can add navigation to next question or results page here
        console.log('Correct answer selected - ready for next step');
    }

    /**
     * Add styling to answer options
     */
    addAnswerStyle(element) {
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.2s ease';
        element.style.userSelect = 'none';
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.backgroundColor = 'rgba(143, 164, 255, 0.1)';
            element.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            if (!element.style.border.includes('2px solid')) {
                element.style.backgroundColor = '';
            }
            element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Regular page navigation with fade
     */
    navigateToPage(url) {
        const quizContainer = document.querySelector('.on-click-start-quiz');
        if (quizContainer) {
            quizContainer.style.opacity = '0';
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
            /* Quiz page transition effects */
            .on-click-start-quiz {
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

            /* Smooth transitions for all interactive elements */
            * {
                -webkit-tap-highlight-color: transparent;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Show notification for navigation feedback and quiz results
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
        }, 3000); // Show for 3 seconds for quiz feedback
    }

    /**
     * Setup back arrow navigation
     */
    setupBackArrow() {
        const backArrow = document.querySelector('.arrow-left-icon');
        if (backArrow) {
            backArrow.addEventListener('click', () => {
                this.navigateToPage('./practice.html');
            });
            
            // Add styling for the back arrow
            backArrow.style.cursor = 'pointer';
            backArrow.style.transition = 'all 0.2s ease';
            
            // Add hover effect
            backArrow.addEventListener('mouseenter', () => {
                backArrow.style.transform = 'scale(1.1)';
                backArrow.style.opacity = '0.8';
            });
            
            backArrow.addEventListener('mouseleave', () => {
                backArrow.style.transform = 'scale(1)';
                backArrow.style.opacity = '1';
            });
            
            backArrow.addEventListener('mousedown', () => {
                backArrow.style.transform = 'scale(0.95)';
            });
            
            backArrow.addEventListener('mouseup', () => {
                backArrow.style.transform = 'scale(1.1)';
            });
        }
    }
}

// Initialize the quiz navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizNavigationManager = new QuizNavigationManager();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizNavigationManager;
} 