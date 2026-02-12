# SkyCache Weather 🌦️

SkyCache is a modern weather dashboard built with React and Node.js. It provides real-time weather information and intelligently caches data to minimize external API calls and improve performance.

## ✨ Features

- **Real-time Weather**: Get current weather conditions for any city worldwide.
- **Intelligent Caching**: Backend caching using `node-cache` to speed up repeated requests.
- **Search History**: Persistent storage of recent searches using MongoDB.
- **Responsive Design**: Beautiful UI built with Tailwind CSS, featuring dark mode support.
- **Debounced Search**: Smooth user experience with optimized search inputs.

## 🚀 Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Caching**: [node-cache](https://www.npmjs.com/package/node-cache)
- **Security**: [Helmet](https://helmetjs.github.io/)

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
   MONGO_URI=mongodb://localhost:27017/skycache
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
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── utils/          # Caching & helpers
│   └── server.js       # Entry point
├── frontend/           # Vite + React application
│   ├── src/
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Formatting & icon helpers
│   │   └── App.jsx     # Main UI component
│   └── index.html
└── README.md           # Project documentation
```

## 🔌 API Endpoints

- `GET /api/weather?city={name}`: Fetches current weather for a city.
- `GET /api/search/logs`: Retrieves recent search history.

---

Built with ❤️ by kyler
