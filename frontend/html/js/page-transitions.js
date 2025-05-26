/**
 * Page Transition Manager for HacknGo Authentication Pages
 * Simple, clean fade transitions between sign-up and sign-in pages
 */

class PageTransitionManager {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        console.log('Page Transition Manager initialized');
        
        // Add transition styles to the page
        this.addTransitionStyles();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.navigateToPage(event.state.page, false);
            }
        });
    }

    addTransitionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .page-transition-fade-out {
                opacity: 0;
                transition: opacity 0.3s ease-out;
            }
            
            .page-transition-fade-in {
                opacity: 1;
                transition: opacity 0.3s ease-in;
            }
            
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .loading-overlay.show {
                opacity: 1;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #333;
                border-top: 4px solid #0418f4;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    showLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => overlay.classList.add('show'), 10);
        
        return overlay;
    }

    hideLoadingOverlay(overlay) {
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }

    async navigateToPage(url, addToHistory = true) {
        if (this.isTransitioning) {
            console.log('Navigation blocked: transition in progress');
            return;
        }

        this.isTransitioning = true;
        console.log('Navigating to:', url);

        try {
            // Show loading overlay
            const loadingOverlay = this.showLoadingOverlay();

            // Add fade out effect to current page
            document.body.classList.add('page-transition-fade-out');

            // Wait for fade out animation
            await this.delay(300);

            // Add to browser history
            if (addToHistory) {
                history.pushState({ page: url }, '', url);
            }

            // Navigate to new page
            window.location.href = url;

        } catch (error) {
            console.error('Navigation error:', error);
            this.isTransitioning = false;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Handle form submissions with transitions
    handleFormSubmission(form, successCallback, errorCallback) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.isTransitioning) return;
            
            this.isTransitioning = true;
            const loadingOverlay = this.showLoadingOverlay();

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData
                });

                if (response.ok) {
                    if (successCallback) {
                        await successCallback(response);
                    }
                } else {
                    if (errorCallback) {
                        await errorCallback(response);
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                if (errorCallback) {
                    await errorCallback(error);
                }
            } finally {
                this.hideLoadingOverlay(loadingOverlay);
                this.isTransitioning = false;
            }
        });
    }
}

// Initialize the page transition manager
window.pageTransitionManager = new PageTransitionManager();

// Add smooth navigation to sign-up links
document.addEventListener('DOMContentLoaded', function() {
    // Handle sign-up text click
    const signUpText = document.getElementById('signUpText');
    if (signUpText) {
        signUpText.addEventListener('click', function(e) {
            e.preventDefault();
            window.pageTransitionManager.navigateToPage('/html/sign-up.html');
        });
    }

    // Handle sign-in text click
    const signInText = document.getElementById('signInText');
    if (signInText) {
        signInText.addEventListener('click', function(e) {
            e.preventDefault();
            window.pageTransitionManager.navigateToPage('/html/sign-in.html');
        });
    }

    console.log('Page transitions ready');
});

// Add minimal, clean CSS enhancements
const style = document.createElement('style');
style.textContent = `
    /* Completely stable backgrounds */
    body {
        background: #000 !important;
        transition: none !important;
    }

    .phone-frame {
        background: #1c1c1c !important;
        transition: none !important;
    }

    /* Fast content fade only */
    .signin-new-account {
        transition: opacity 0.15s ease-out;
        opacity: 1;
    }

    /* Subtle input focus effects */
    input:focus {
        transform: scale(1.01);
        transition: transform 0.15s ease-out;
    }

    /* Button hover effects */
    .signin-new-account-item:hover {
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(4, 24, 244, 0.3);
        transition: all 0.15s ease-out;
    }

    .signin-new-account-item:active {
        transform: translateY(0);
        transition: all 0.1s ease;
    }

    /* Link hover effects */
    .sign-in:hover, .sign-up:hover {
        color: #8fa4ff !important;
        transition: color 0.15s ease-out;
    }

    /* Ensure cursors work properly */
    button, .signin-new-account-item, .sign-up, .sign-in {
        cursor: pointer;
    }

    /* Optimize rendering for fade only */
    .signin-new-account {
        will-change: opacity;
    }
`;

document.head.appendChild(style);

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTransitionManager;
} 