# AI Chatbot with Database Integration

A fullstack application that uses OpenRouter API with the Qwen3-235b model to answer product-related questions, with Baserow database integration for accessing employee information.

## Features

- Real-time chat interface
- Integration with OpenRouter API (Qwen3-235b model)
- Baserow database integration for employee data
- Two search modes: by term or by specific employee ID
- Dynamic context generation for AI responses
- Modern, responsive UI
- Loading indicators and error handling

## Project Structure

```
ai-chatbot/
├── backend/                       # Express server
│   ├── .env                       # Environment variables
│   ├── package.json               # Backend dependencies
│   ├── server.js                  # API endpoints and server logic
│   └── utils/                     # Utility functions
│       └── baserow.js             # Baserow API integration
└── frontend/                      # React application
    ├── public/                    # Static assets
    ├── src/                       # Source code
    │   ├── components/            # React components
    │   │   ├── Chat.jsx           # Chat interface component
    │   │   └── DatabaseSelector.jsx # Database integration UI
    │   ├── styles/                # Component-specific styles
    │   │   └── DatabaseSelector.css # Styles for database selector
    │   ├── App.css                # Application styles
    │   ├── App.jsx                # Main application component
    │   └── main.jsx               # Entry point
    └── package.json               # Frontend dependencies
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
   BASEROW_API_TOKEN=your_baserow_api_token
   BASEROW_API_URL=https://api.baserow.io
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

## API Integrations

### OpenRouter AI Integration

This application uses the OpenRouter API with the Qwen3-235b model to generate responses. The API key is stored in the backend `.env` file for security.

### Baserow Database Integration

The application integrates with Baserow, a no-code database platform, to access employee data. The integration allows the AI chatbot to:

1. Access employee information from a Baserow table (ID: 552741)
2. Search for employees using two different modes:
   - **Search by Term**: Search across multiple fields using keywords
   - **Search by ID**: Retrieve a specific employee record by its ID
3. Include relevant employee data in the AI's context for more informed responses

The Baserow API token is stored securely in the backend `.env` file.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **APIs**: 
  - OpenRouter (Qwen3-235b model) for AI responses
  - Baserow API for database access
- **Styling**: CSS3 with modern animations
- **Database**: Baserow (cloud-based database)

## How It Works

### AI and Database Integration Flow

1. User toggles on "Employee Database Integration" in the chat interface
2. User selects a search mode (by term or by ID) and enters search criteria
3. When the user sends a message, the frontend includes the employee context in the request
4. The backend processes the request:
   - If searching by term, it queries the Baserow API to find matching employees
   - If searching by ID, it fetches the specific employee record
5. The backend enhances the AI prompt with the retrieved employee data
6. OpenRouter API generates a response using both the user's question and the employee data context
7. The response is sent back to the frontend and displayed to the user

### Backend API Endpoints

- `/api/chat` - Main endpoint for AI chat with database context integration
- `/api/employee-fields` - Get fields from the employee table
- `/api/employees` - Get all employees or paginated results
- `/api/employees/:employeeId` - Get a specific employee by ID
- `/api/search-employees` - Search for employees by term across fields
- `/api/employee-table-info` - Get employee table structure

## License

MIT
