require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const baserowAPI = require('./utils/baserow');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Baserow API Routes for Employee Table
app.get('/api/employee-fields', async (req, res) => {
  try {
    const fields = await baserowAPI.getEmployeeFields();
    res.json(fields);
  } catch (error) {
    console.error('Error fetching employee fields:', error.message);
    res.status(500).json({ error: 'Failed to fetch employee fields', details: error.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await baserowAPI.getEmployees(req.query);
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Failed to fetch employees', details: error.message });
  }
});

app.get('/api/employees/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await baserowAPI.getEmployeeById(employeeId);
    res.json(employee);
  } catch (error) {
    console.error(`Error fetching employee with ID ${req.params.employeeId}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch employee', details: error.message });
  }
});

app.get('/api/search-employees', async (req, res) => {
  try {
    const { query, fields } = req.query;
    const searchFields = fields ? fields.split(',') : [];
    const results = await baserowAPI.searchEmployees(query, searchFields);
    res.json(results);
  } catch (error) {
    console.error('Error searching employees:', error.message);
    res.status(500).json({ error: 'Failed to search employees', details: error.message });
  }
});

app.get('/api/employee-table-info', async (req, res) => {
  try {
    const tableInfo = await baserowAPI.getEmployeeTableInfo();
    res.json(tableInfo);
  } catch (error) {
    console.error('Error fetching employee table info:', error.message);
    res.status(500).json({ error: 'Failed to fetch employee table info', details: error.message });
  }
});

// AI Chat Route with Employee Database Integration
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, employeeContext } = req.body;
    
    // Fetch employee data if requested
    let contextData = '';
    if (employeeContext) {
      try {
        let employeeData;
        
        // Check if we're searching by ID or by term
        if (employeeContext.searchMode === 'id' && employeeContext.employeeId) {
          // Get employee by ID
          try {
            const employee = await baserowAPI.getEmployeeById(employeeContext.employeeId);
            employeeData = [employee]; // Wrap in array for consistent handling
          } catch (idError) {
            console.error(`Error fetching employee with ID ${employeeContext.employeeId}:`, idError.message);
            // If employee not found, use empty array
            employeeData = [];
          }
        } else if (employeeContext.searchMode === 'term' || !employeeContext.searchMode) {
          // Search by term (default behavior)
          const { searchTerm, searchFields } = employeeContext;
          
          if (searchTerm && searchTerm.trim() !== '') {
            employeeData = await baserowAPI.searchEmployees(searchTerm, searchFields);
          } else {
            const response = await baserowAPI.getEmployees({ size: 10 });
            employeeData = response.results;
          }
        } else {
          // Default to getting all employees if no valid search mode
          const response = await baserowAPI.getEmployees({ size: 10 });
          employeeData = response.results;
        }
        
        if (employeeData && employeeData.length > 0) {
          contextData = `Employee database information:\n${JSON.stringify(employeeData, null, 2)}\n\n`;
        }
      } catch (dbError) {
        console.error('Error fetching employee data:', dbError.message);
        // Continue without employee context if there's an error
      }
    }
    
    const systemPrompt = contextData 
      ? `You are a helpful AI assistant that helps users with product-related questions. Be concise and helpful.\n\nUse the following database information to answer questions when relevant:\n${contextData}`
      : 'You are a helpful AI assistant that helps users with product-related questions. Be concise and helpful.';
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'qwen/qwen3-235b-a22b:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error calling OpenRouter API:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to get response from AI',
      details: error.response?.data || error.message
    });
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Employee database info endpoint - returns info about the employee table
app.get('/api/database-info', async (req, res) => {
  try {
    const employeeTableInfo = await baserowAPI.getEmployeeTableInfo();
    res.json([{
      id: 1, // Dummy database ID
      name: 'Employee Database',
      tables: [employeeTableInfo]
    }]);
  } catch (error) {
    console.error('Error fetching employee database info:', error.message);
    res.status(500).json({ error: 'Failed to fetch employee database info', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Baserow API integration enabled`);
});
