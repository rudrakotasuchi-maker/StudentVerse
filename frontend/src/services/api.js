const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = localStorage.getItem('studentverse_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      const networkErr = new Error('Cannot connect to StudentVerse API server. Please ensure the backend is running on port 5000.');
      networkErr.status = 503;
      throw networkErr;
    }
    throw error;
  }
}

export const api = {
  get: (endpoint, params = null) => {
    let url = endpoint;
    if (params) {
      const query = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      ).toString();
      if (query) url += `?${query}`;
    }
    return request(url, { method: 'GET' });
  },

  post: (endpoint, body) => {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  put: (endpoint, body) => {
    return request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  delete: (endpoint) => {
    return request(endpoint, { method: 'DELETE' });
  }
};

export default api;
