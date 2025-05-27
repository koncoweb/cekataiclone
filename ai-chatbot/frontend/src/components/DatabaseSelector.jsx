import { useState, useEffect } from 'react';

const DatabaseSelector = ({ onDatabaseContextChange }) => {
  const [employeeFields, setEmployeeFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [searchFields, setSearchFields] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchMode, setSearchMode] = useState('term'); // 'term' or 'id'
  const employeeTableId = 552741; // Hardcoded employee table ID

  // Fetch employee fields on component mount
  useEffect(() => {
    const fetchEmployeeFields = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/employee-fields');
        if (!response.ok) {
          throw new Error('Failed to fetch employee fields');
        }
        const data = await response.json();
        setEmployeeFields(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee fields:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployeeFields();
  }, []);

  // No need for database or table selection handlers since we're focusing on the employee table only

  // Handle search field selection
  const handleFieldChange = (fieldId) => {
    setSearchFields(prev => {
      const fieldExists = prev.includes(fieldId);
      
      if (fieldExists) {
        const updatedFields = prev.filter(id => id !== fieldId);
        
        // Update employee context when changing fields
        if (isEnabled) {
          onDatabaseContextChange({
            searchTerm: searchTerm || '',
            searchFields: updatedFields
          });
        }
        
        return updatedFields;
      } else {
        const updatedFields = [...prev, fieldId];
        
        // Update employee context when changing fields
        if (isEnabled) {
          onDatabaseContextChange({
            searchTerm: searchTerm || '',
            searchFields: updatedFields
          });
        }
        
        return updatedFields;
      }
    });
  };

  // Handle search term change
  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    // Update employee context when changing search term
    if (isEnabled && searchMode === 'term') {
      onDatabaseContextChange({
        searchMode: 'term',
        searchTerm: term,
        searchFields: searchFields
      });
    }
  };
  
  // Handle employee ID change
  const handleEmployeeIdChange = (e) => {
    const id = e.target.value;
    setEmployeeId(id);
    
    // Update employee context when changing employee ID
    if (isEnabled && searchMode === 'id') {
      onDatabaseContextChange({
        searchMode: 'id',
        employeeId: id
      });
    }
  };
  
  // Handle search mode change
  const handleSearchModeChange = (mode) => {
    setSearchMode(mode);
    
    if (isEnabled) {
      if (mode === 'term') {
        onDatabaseContextChange({
          searchMode: 'term',
          searchTerm: searchTerm,
          searchFields: searchFields
        });
      } else { // mode === 'id'
        onDatabaseContextChange({
          searchMode: 'id',
          employeeId: employeeId
        });
      }
    }
  };

  // Toggle employee database integration
  const handleToggleEnable = () => {
    const newEnabledState = !isEnabled;
    setIsEnabled(newEnabledState);
    
    if (newEnabledState) {
      // Enable employee context based on current search mode
      if (searchMode === 'term') {
        onDatabaseContextChange({
          searchMode: 'term',
          searchTerm: searchTerm || '',
          searchFields: searchFields
        });
      } else { // searchMode === 'id'
        onDatabaseContextChange({
          searchMode: 'id',
          employeeId: employeeId
        });
      }
    } else {
      // Disable employee context
      onDatabaseContextChange(null);
    }
  };

  if (loading) {
    return <div className="database-selector loading">Loading employee database information...</div>;
  }

  if (error) {
    return <div className="database-selector error">Error: {error}</div>;
  }

  return (
    <div className="database-selector">
      <div className="database-toggle">
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={isEnabled}
            onChange={handleToggleEnable}
          />
          <span className="toggle-slider"></span>
        </label>
        <span className="toggle-label">Employee Database Integration</span>
      </div>
      
      {isEnabled && (
        <div className="database-controls">
          <div className="search-mode-selector">
            <button 
              className={`search-mode-btn ${searchMode === 'term' ? 'active' : ''}`}
              onClick={() => handleSearchModeChange('term')}
            >
              Search by Term
            </button>
            <button 
              className={`search-mode-btn ${searchMode === 'id' ? 'active' : ''}`}
              onClick={() => handleSearchModeChange('id')}
            >
              Search by ID
            </button>
          </div>
          
          {searchMode === 'term' ? (
            <>
              <div className="search-group">
                <label>Search Term:</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  placeholder="Search employees..."
                />
              </div>
              
              {employeeFields && employeeFields.length > 0 && (
                <div className="fields-group">
                  <label>Search in Fields:</label>
                  <div className="field-checkboxes">
                    {employeeFields.map(field => (
                      <div key={field.id} className="field-checkbox">
                        <input
                          type="checkbox"
                          id={`field-${field.id}`}
                          checked={searchFields.includes(field.id)}
                          onChange={() => handleFieldChange(field.id)}
                        />
                        <label htmlFor={`field-${field.id}`}>{field.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="search-group">
              <label>Employee ID:</label>
              <input
                type="text"
                value={employeeId}
                onChange={handleEmployeeIdChange}
                placeholder="Enter employee ID"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatabaseSelector;
