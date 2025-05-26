# HacknGo Page Transition System

## Overview
The `page-transitions.js` file provides a smooth and enhanced navigation experience between the sign-up and sign-in pages.

## Features

### 🎬 **Smooth Transitions**
- **Fade Effects**: Pages fade out and fade in during navigation
- **Slide Animations**: Directional slide effects based on navigation flow
- **Loading States**: Visual feedback during page transitions

### 🔄 **Smart Navigation**
- **Direction Aware**: Tracks whether user is going forward (sign-up → sign-in) or backward (sign-in → sign-up)
- **Auto-prefill**: If user just registered, their email is pre-filled on sign-in page
- **Focus Management**: Automatically focuses on password field after email prefill

### 📱 **Enhanced UX**
- **Success Notifications**: Shows toast messages for successful registration
- **Visual Feedback**: Input fields have enhanced focus effects and validation colors
- **Button Animations**: Hover and click effects on buttons and links

### 💾 **State Management**
- **Registration Success**: Tracks successful registrations
- **Email Persistence**: Temporarily stores registered email for sign-in convenience
- **User Data**: Manages login session data

## Usage

### Automatic Integration
The transition manager automatically initializes when the DOM loads:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    window.pageTransitionManager = new PageTransitionManager();
});
```

### Manual Navigation
You can also trigger transitions programmatically:

```javascript
// Navigate with smooth transition
window.pageTransitionManager.navigateToPage('/html/sign-in.html', 'forward');

// Show notification
window.pageTransitionManager.showNotification('Success!', 'success');

// Set loading state
window.pageTransitionManager.setLoadingState(button, true);
```

## Integration

### HTML Files
Both `sign-up.html` and `sign-in.html` include the script:

```html
<script src="./js/page-transitions.js"></script>
```

### Navigation Links
The system automatically handles these elements:
- `#signInText` - Sign-in link on sign-up page
- `#signUpText` - Sign-up link on sign-in page

### Form Submissions
Updated to use transition manager:
- Registration success → smooth transition to sign-in
- Login success → smooth transition to home page

## CSS Animations

The script automatically adds these CSS animations:
- `slideInRight` - For forward navigation
- `slideInLeft` - For backward navigation
- Enhanced input focus effects
- Button hover and active states
- Link hover effects

## Browser Compatibility
- Modern browsers supporting ES6 classes
- CSS3 animations and transitions
- LocalStorage API

## Future Enhancements
- [ ] Add page preloading for faster transitions
- [ ] Implement swipe gestures for mobile navigation
- [ ] Add transition sound effects
- [ ] Create custom transition themes 