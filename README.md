# SkyCache Weather 🌦️

SkyCache is a premium, modern weather dashboard built with React and Node.js. It provides real-time weather information with a stunning, dynamic UI and intelligently caches data to improve performance.

## ✨ Features

- **Real-time Weather**: Get current weather conditions for any city worldwide, including temperature, humidity, wind, and "feels like" stats.
- **Dynamic Backgrounds**: The dashboard background automatically changes based on current conditions (Sunny, Rainy, Cloudy, Snowy) with smooth cross-fade transitions.
- **Enhanced Search History**:
  - **Scrollable Sidebar**: Manage long search histories easily within a slim, personalized scrollbar.
  - **Persistent Logging**: Every search is logged in MongoDB for persistent history.
  - **Empty History**: Clear your entire search history with a single click.
- **Intelligent Caching**: Backend caching using `node-cache` to speed up repeated requests & minimize API costs.
- **Premium UI/UX**:
  - Beautiful glassmorphism design.
  - Custom-styled scrollbars.
  - Responsive layout with Lucide icons.
  - Debounced search for a smooth typing experience.

## 🚀 Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **API Client**: Axios

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Caching**: [node-cache](https://www.npmjs.com/package/node-cache)
- **Security**: [Helmet](https://helmetjs.github.io/) & [Morgan](https://www.npmjs.com/package/morgan) for logging

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)
- [OpenWeather API Key](https://openweathermap.org/api)

### 1. Clone the repository

```bash
git clone <repository-url>
cd skycache-app
```

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/skycache
   OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
skycache-app/
├── backend/            # Express server & API logic
│   ├── controllers/    # Request handlers (weather, search)
│   ├── models/         # Mongoose schemas (SearchLog)
│   ├── routes/         # API endpoints
│   ├── utils/          # Caching & DB helpers
│   └── server.js       # Entry point
├── frontend/           # Vite + React application
│   ├── src/
│   │   ├── hooks/      # Custom React hooks (useWeather)
│   │   ├── utils/      # Formatting & icon helpers
│   │   ├── index.css   # Tailwinds & Custom scrollbar CSS
│   │   └── App.jsx     # Main UI component (Dynamic Backgrounds)
│   └── index.html
└── README.md           # Project documentation
```

## 🔌 API Endpoints

### Weather

- `GET /api/weather?city={name}`: Fetches current weather for a city (returns cached data if available).

### Search History

- `GET /api/search/logs`: Retrieves full search history sorted by most recent.
- `DELETE /api/search`: Clears all searches from the database.

---

Built with ❤️ by kyler
