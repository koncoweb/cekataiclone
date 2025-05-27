# AI Chatbot for Product Inquiries

A fullstack application that uses OpenRouter API with the Qwen3-235b model to answer product-related questions.

## Features

- Real-time chat interface
- Integration with OpenRouter API
- Modern, responsive UI
- Loading indicators and error handling

## Project Structure

```
ai-chatbot/
├── backend/              # Express server
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   └── server.js         # API endpoints and server logic
└── frontend/             # React application
    ├── public/           # Static assets
    ├── src/              # Source code
    │   ├── components/   # React components
    │   │   └── Chat.jsx  # Chat interface component
    │   ├── App.css       # Application styles
    │   ├── App.jsx       # Main application component
    │   └── main.jsx      # Entry point
    └── package.json      # Frontend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   OPENROUTER_API_KEY=your_openrouter_api_key
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## API Integration

This application uses the OpenRouter API with the Qwen3-235b model to generate responses. The API key is stored in the backend `.env` file for security.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **API**: OpenRouter (Qwen3-235b model)
- **Styling**: CSS3 with modern animations

## License

MIT
