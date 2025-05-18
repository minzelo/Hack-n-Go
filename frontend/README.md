# Hack-n-Go Frontend Documentation

## Project Structure
```
frontend/
├── html/
│   ├── css/
│   │   └── on-start-quiz.css
│   ├── icons/
│   │   ├── Home.svg
│   │   ├── Book_open_alt.svg
│   │   ├── Atom_alt.svg
│   │   ├── Trophy.svg
│   │   ├── User.svg
│   │   └── Arrow_left.svg
│   └── on-start-quiz.html
```

## Components

### Quiz Interface (on-start-quiz)
The quiz interface provides an interactive learning experience for cybersecurity concepts.

#### Layout
- Mobile-optimized design (402x874px)
- Phone frame styling with dark theme
- Navigation bar at bottom
- Progress bar at top

#### Features
1. **Progress Tracking**
   - Visual progress bar
   - Question counter (1/1 format)

2. **Navigation Elements**
   - Home
   - Learn
   - Practice
   - Leaderboard
   - Profile
   - Back button (arrow-left)

3. **Question Display**
   - Question text
   - Multiple choice options
   - Radio button selection

#### Styling
- Color Scheme:
  - Primary Background: #20273D
  - Secondary Background: #151628
  - Accent Colors: #5B71FF, #AF52DE
  - Text: #ACC0FF, #FFFFFF
- Font: IBM Plex Sans
- Responsive elements with hover states
- Mobile-first design approach

## Interactive Elements
- Navigation icons with click events
- Multiple choice selection
- Progress indication
- Back navigation

## Mobile Responsiveness
- Designed for mobile-first approach
- Phone frame wrapper for desktop viewing
- Optimized for screen sizes 391px and above
- Hidden overflow for clean presentation

## Usage
1. Load the quiz page through `on-start-quiz.html`
2. Navigate using bottom bar icons
3. Select answers using radio buttons
4. Track progress through top progress bar

## Development Notes
- All icons should be placed in the `/icons` directory
- CSS is modularized in the `/css` directory
- JavaScript event listeners are prepared for navigation elements
