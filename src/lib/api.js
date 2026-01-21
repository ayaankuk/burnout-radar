const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const saveToken = (token) => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
};

export const authAPI = {
  async register(email, password, fullName) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
    if (data.token) saveToken(data.token);
    return data;
  },

  async login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) saveToken(data.token);
    return data;
  },

  async getProfile() {
    return await apiRequest('/auth/profile');
  },

  logout() {
    removeToken();
  },
};

export const entriesAPI = {
  async getAll() {
    const data = await apiRequest('/entries');
    return data.entries;
  },

  async create(entryData) {
    const data = await apiRequest('/entries', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
    return data.entry;
  },

  async delete(id) {
    const data = await apiRequest(`/entries/${id}`, {
      method: 'DELETE',
    });
    return data.entry;
  },

  async getStats() {
    const data = await apiRequest('/entries/stats');
    return data.stats;
  },
};