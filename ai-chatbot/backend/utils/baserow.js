const axios = require('axios');

/**
 * Baserow API utility functions
 */
class BaserowAPI {
  constructor() {
    this.apiUrl = process.env.BASEROW_API_URL || 'https://api.baserow.io';
    this.token = process.env.BASEROW_API_TOKEN;
    this.employeeTableId = 552741; // Hardcoded employee table ID
    
    if (!this.token) {
      throw new Error('Baserow API token is not set in environment variables');
    }

    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Token ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Get fields for the employee table
   * @returns {Promise<Array>} - List of fields
   */
  async getEmployeeFields() {
    try {
      const response = await this.client.get(`/api/database/fields/table/${this.employeeTableId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee fields:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get employee rows
   * @param {Object} params - Query parameters (page, size, search, filters)
   * @returns {Promise<Object>} - Employee rows with pagination info
   */
  async getEmployees(params = {}) {
    try {
      // Add user_field_names=true to get human-readable field names
      const queryParams = { ...params, user_field_names: true };
      const response = await this.client.get(`/api/database/rows/table/${this.employeeTableId}/`, {
        params: queryParams
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get a specific employee by ID
   * @param {number} employeeId - The employee row ID
   * @returns {Promise<Object>} - Employee data
   */
  async getEmployeeById(employeeId) {
    try {
      const response = await this.client.get(`/api/database/rows/table/${this.employeeTableId}/${employeeId}/?user_field_names=true`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${employeeId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Search employees
   * @param {string} searchTerm - Term to search for
   * @param {Array} searchFields - Fields to search in (optional)
   * @returns {Promise<Array>} - Matching employees
   */
  async searchEmployees(searchTerm, searchFields = []) {
    try {
      const params = {
        search: searchTerm,
        user_field_names: true
      };
      
      if (searchFields.length > 0) {
        params.search_fields = searchFields.join(',');
      }
      
      const response = await this.client.get(`/api/database/rows/table/${this.employeeTableId}/`, {
        params
      });
      
      return response.data.results;
    } catch (error) {
      console.error('Error searching employees:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get employee table info - simplified for frontend
   * @returns {Promise<Object>} - Employee table info
   */
  async getEmployeeTableInfo() {
    try {
      const fields = await this.getEmployeeFields();
      return {
        id: this.employeeTableId,
        name: 'Employees',
        fields: fields.map(field => ({
          id: field.id,
          name: field.name,
          type: field.type
        }))
      };
    } catch (error) {
      console.error('Error fetching employee table info:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new BaserowAPI();
