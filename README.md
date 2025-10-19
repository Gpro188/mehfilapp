# Arts Fest Result Publishing Web App

An exciting project! An arts fest result publishing web app with comprehensive management features.

## Features

### Public View
1. **Home/Results Page** - Beautiful leaderboard showing team standings with total points
2. **Search & Filter** - Search by student name, filter by team/category/program type
3. **Individual Results** - Detailed view of each student's achievements
4. **Top Performers** - Highlighted top 3 in each team and category with celebratory design
5. **Event Info** - Display current event name and logo

### Admin Panel
1. **Login Screen** - Simple, secure admin authentication
2. **Event Management** - Create/edit fest events, set event name and logo
3. **Team Management** - Add teams, manage student lists per team
4. **Category Setup** - Configure categories (Sub Junior, Junior, Senior)
5. **Program Management** - Add individual/group/general programs with point configurations
6. **Result Entry** - Quick form to add results (1st/2nd/3rd prize, A/B grade) with auto-point calculation
7. **Points Configuration** - Set different point values for different program types

## Technical Approach
- Use localStorage for local data persistence (no backend needed initially)
- Context API with @nkzw/create-context-hook for state management
- Styled Components for styling
- Responsive design that works on web and mobile

## Key Features
✅ Automatic Point Calculation - Different points for individual/group/general programs
✅ Prize System - 1st/2nd/3rd prizes with configurable points
✅ Grade System - A/B grades with additional points
✅ Category Support - Sub Junior, Junior, Senior categories
✅ Team Colors - Visual team identification throughout the app
✅ Real-time Updates - All data persisted with localStorage
✅ Beautiful UI - Purple gradient theme, smooth animations, modern cards
✅ Mobile & Web Compatible - Works perfectly on both platforms

## Design Highlights
- 🎨 Purple-to-violet gradient theme
- 🏆 Trophy/medal icons for rankings
- 🎯 Color-coded teams
- 📊 Clean data visualization
- ✨ Smooth transitions and interactions

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

### Building for Production
To create a production build:
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── AdminHeader.jsx
│   ├── AdminTabs.jsx
│   ├── DashboardOverview.jsx
│   ├── EventSwitcher.jsx
│   ├── SearchAndFilter.jsx
│   ├── TeamStandings.jsx
│   ├── TopPerformers.jsx
│   ├── ResultsDisplay.jsx
│   ├── FormComponents.jsx
│   ├── DataTable.jsx
│   ├── Card.jsx
│   ├── StatsDisplay.jsx
│   ├── Alert.jsx
│   ├── Modal.jsx
│   ├── ConfirmationDialog.jsx
│   ├── LoadingSpinner.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── FilterPanel.jsx
│   ├── ToastNotification.jsx
│   ├── ToastContainer.jsx
│   ├── Celebration.jsx
│   ├── ProgressBar.jsx
│   ├── Rating.jsx
│   ├── Tag.jsx
│   ├── Avatar.jsx
│   ├── Timeline.jsx
│   ├── BarChart.jsx
│   ├── PieChart.jsx
│   ├── LineChart.jsx
│   ├── ChartSection.jsx
│   └── ...
├── hooks/
│   ├── useToast.js
│   ├── useForm.js
│   ├── usePagination.js
│   └── useSearchFilter.js
├── utils/
│   ├── localStorage.js
│   ├── dateFormatter.js
│   ├── idGenerator.js
│   ├── formValidator.js
│   ├── apiClient.js
│   ├── fileHandler.js
│   ├── animation.js
│   └── confetti.js
├── App.jsx
└── index.js
```

## Admin Access
- Username: admin
- Password: admin123

## Deployment
The app can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## License
This project is licensed under the MIT License.