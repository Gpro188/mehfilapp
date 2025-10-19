// Utility functions for API calls

export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const get = (url, options = {}) => {
  return apiCall(url, { method: 'GET', ...options });
};

export const post = (url, data, options = {}) => {
  return apiCall(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options
  });
};

export const put = (url, data, options = {}) => {
  return apiCall(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options
  });
};

export const del = (url, options = {}) => {
  return apiCall(url, { method: 'DELETE', ...options });
};

export const handleApiError = (error) => {
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    return 'Network error. Please check your connection.';
  }
  
  if (error.message.includes('HTTP error')) {
    const status = error.message.split('status: ')[1];
    switch (status) {
      case '401':
        return 'Unauthorized. Please check your credentials.';
      case '403':
        return 'Forbidden. You do not have permission to access this resource.';
      case '404':
        return 'Resource not found.';
      case '500':
        return 'Internal server error. Please try again later.';
      default:
        return `Server error (${status}). Please try again later.`;
    }
  }
  
  return error.message || 'An unknown error occurred.';
};