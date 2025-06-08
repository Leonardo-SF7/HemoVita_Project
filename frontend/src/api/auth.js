import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export async function login(email, senha) {
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  return response.data; // Deve retornar { token, ... }
}