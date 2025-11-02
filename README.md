# 🎉 Mini Event Finder

A full-stack event discovery application built with Node.js, Express, React, and TypeScript. Discover, search, and create events with location-based distance calculation.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Challenges Faced](#challenges-faced)
- [AI Tools Usage](#ai-tools-usage)
- [Deployment](#deployment)

## ✨ Features

### Core Features
- ✅ **Create Events** - Simple form to create new events with location details
- ✅ **Browse Events** - View all events in a clean, responsive grid layout
- ✅ **Event Details** - Detailed view for each event with all information
- ✅ **Search & Filter** - Search events by title/description and filter by location
- ✅ **Distance Calculation** - Calculate and display distance from user's location
- ✅ **Location Sorting** - Events sorted by distance when user location is enabled

### Bonus Features
- ✅ **TypeScript** - Full TypeScript implementation for type safety
- ✅ **Loading States** - Proper loading indicators throughout the app
- ✅ **Error Handling** - Comprehensive error handling with user-friendly messages
- ✅ **Responsive Design** - Mobile-friendly UI that works on all devices
- ✅ **Modern UI** - Clean, modern interface with smooth animations

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety and better developer experience
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern CSS features

## 📁 Project Structure

```
Mini Event Finder/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts      # Error handling middleware
│   │   │   └── validator.ts         # Request validation
│   │   ├── routes/
│   │   │   └── events.ts            # Event routes
│   │   ├── types/
│   │   │   └── event.ts             # TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── eventStore.ts        # In-memory event storage
│   │   │   └── distance.ts          # Distance calculation (Haversine)
│   │   └── index.ts                 # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── events.ts            # API client functions
    │   ├── components/
    │   │   ├── Loading.tsx          # Loading component
    │   │   └── ErrorMessage.tsx     # Error display component
    │   ├── pages/
    │   │   ├── EventList.tsx        # Event list page
    │   │   ├── EventDetail.tsx     # Event detail page
    │   │   └── CreateEvent.tsx      # Create event form
    │   ├── types/
    │   │   └── event.ts             # TypeScript types
    │   ├── utils/
    │   │   └── geolocation.ts       # Geolocation helper
    │   ├── App.tsx                  # Main app component
    │   └── main.tsx                 # Entry point
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── .env.example
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Internshala
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   **For Windows (PowerShell):**
   
   Backend:
   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```
   If `.env.example` doesn't exist, create `.env` manually with:
   ```
   PORT=5000
   NODE_ENV=development
   ```
   
   Frontend:
   ```powershell
   cd frontend
   Copy-Item .env.example .env
   ```
   If `.env.example` doesn't exist, create `.env` manually with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   
   **For Linux/Mac:**
   
   Backend:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Frontend:
   ```bash
   cd frontend
   cp .env.example .env
   ```
   
   **Note:** If you encounter PowerShell execution policy errors, see [SETUP.md](./SETUP.md) for solutions.

## ▶️ Running the Project

### Development Mode

**Note:** If you get PowerShell execution policy errors, see [SETUP.md](./SETUP.md) or use Command Prompt (cmd) instead.

1. **Start the backend server** (Terminal 1)
   
   Windows (PowerShell/CMD):
   ```powershell
   cd backend
   npm run dev
   ```
   
   Linux/Mac:
   ```bash
   cd backend
   npm run dev
   ```
   
   The backend will run on `http://localhost:5000`

2. **Start the frontend dev server** (Terminal 2)
   
   Windows (PowerShell/CMD):
   ```powershell
   cd frontend
   npm run dev
   ```
   
   Linux/Mac:
   ```bash
   cd frontend
   npm run dev
   ```
   
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Create Event
```http
POST /api/events
Content-Type: application/json

{
  "title": "Tech Meetup",
  "description": "Join us for an evening of networking",
  "location": {
    "name": "San Francisco, CA",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "date": "2024-01-15T18:00:00.000Z",
  "maxParticipants": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Tech Meetup",
    "description": "Join us for an evening of networking",
    "location": {
      "name": "San Francisco, CA",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "date": "2024-01-15T18:00:00.000Z",
    "maxParticipants": 50,
    "currentParticipants": 0,
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### 2. Get All Events
```http
GET /api/events
GET /api/events?location=San Francisco
GET /api/events?search=tech
GET /api/events?userLat=37.7749&userLng=-122.4194
```

**Query Parameters:**
- `location` (optional) - Filter by location name
- `search` (optional) - Search in title and description
- `userLat` (optional) - User's latitude for distance calculation
- `userLng` (optional) - User's longitude for distance calculation

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Tech Meetup",
      ...
      "distance": 5.2
    }
  ],
  "count": 1
}
```

#### 3. Get Event by ID
```http
GET /api/events/:id
GET /api/events/1?userLat=37.7749&userLng=-122.4194
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Tech Meetup",
    ...
    "distance": 5.2
  }
}
```

### Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error message here"
  }
}
```

**Status Codes:**
- `400` - Bad Request (validation errors)
- `404` - Not Found (event not found)
- `500` - Internal Server Error

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

For production, update `VITE_API_URL` to your deployed backend URL.

## 🎯 Challenges Faced

### 1. **TypeScript Type Safety with Distance Calculation**
**Challenge:** Adding distance as an optional property to events while maintaining type safety.

**Solution:** Created an `EventWithDistance` interface that extends the base `Event` interface with an optional `distance` property. This allowed for proper typing when distance is calculated.

### 2. **Geolocation API Integration**
**Challenge:** Handling geolocation permissions and errors gracefully in the browser.

**Solution:** Implemented proper error handling with user-friendly messages and fallback options. Added loading states for when location is being fetched.

### 3. **Haversine Formula Implementation**
**Challenge:** Implementing accurate distance calculation between two coordinates.

**Solution:** Used the Haversine formula to calculate great-circle distances, which provides accurate results for locations on Earth.

### 4. **State Management in React**
**Challenge:** Managing complex state with filters, search, and location data.

**Solution:** Used React hooks (useState, useEffect) effectively and organized state logically. Used URL parameters for filters to enable shareable links.

### 5. **Error Handling Across Stack**
**Challenge:** Ensuring consistent error handling from API to UI.

**Solution:** Created a centralized error handler middleware in the backend and reusable error components in the frontend. All errors are displayed in a user-friendly format.

## 🤖 AI Tools Usage

This project was built with the assistance of **Cursor AI** (powered by Claude). Here's how AI tools were used:

### Effective Usage:
1. **Code Generation** - Used AI to generate initial boilerplate for both backend and frontend
2. **TypeScript Types** - AI helped create comprehensive type definitions
3. **Error Handling Patterns** - Generated consistent error handling code
4. **CSS Styling** - AI suggested modern CSS patterns for responsive design

### Custom Modifications:
1. **Distance Calculation** - Modified AI-generated Haversine formula to round to 1 decimal place
2. **UI/UX Improvements** - Enhanced AI suggestions with better visual feedback
3. **Loading States** - Added custom loading indicators beyond basic suggestions
4. **Error Messages** - Customized error messages to be more user-friendly

### Learning & Understanding:
- Reviewed all AI-generated code thoroughly
- Understood the logic behind distance calculations
- Modified and improved suggested patterns
- Added comprehensive comments and documentation

**Note:** This project demonstrates effective AI collaboration - using AI for speed while maintaining understanding and making custom improvements.

## 🚢 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) and [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)

### Quick Summary

**Frontend (Netlify):**
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`
- Environment variable: `VITE_API_URL`

**Backend (Railway/Render/Vercel):**
- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variable: `NODE_ENV=production`

### Example Deployment URLs

- **Frontend:** https://event-finder.netlify.app
- **Backend:** https://event-finder-api.railway.app

## 📝 License

This project is created for educational purposes as part of an internship assignment.

## 👨‍💻 Author

Built with ❤️ using modern web technologies

---

**Note:** This application uses in-memory storage. Data will be reset on server restart. For production, consider integrating a database like MongoDB or PostgreSQL.

