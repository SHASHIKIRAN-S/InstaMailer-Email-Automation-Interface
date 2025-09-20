// API Configuration - Hardcoded for immediate testing
const API_BASE_URL = 'https://ai-automation-agent-backend.onrender.com';

export const config = {
  apiBaseUrl: API_BASE_URL,
  endpoints: {
    emails: `${API_BASE_URL}/emails`,
    stats: `${API_BASE_URL}/stats`,
    generate: `${API_BASE_URL}/generate`,
    send: (id: number) => `${API_BASE_URL}/send/${id}`,
    delete: (id: number) => `${API_BASE_URL}/emails/${id}`,
    update: (id: number) => `${API_BASE_URL}/update_draft/${id}`,
    health: `${API_BASE_URL}/health`
  }
};