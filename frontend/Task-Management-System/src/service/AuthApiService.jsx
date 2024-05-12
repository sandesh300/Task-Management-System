import axios from "axios";

const authApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
});

// Combine username and password into a single object for loginApi
const loginCredentials = (username, password) => ({ username, password });

export const registerApi = (user) => authApiClient.post('/register', user);

export const loginApi = (username, password) =>
  authApiClient.post('/login', loginCredentials(username, password));

export const saveLoggedUser = (userId, username, role) => {
  sessionStorage.setItem('activeUserId', userId);
  sessionStorage.setItem('authenticatedUser', username);
  sessionStorage.setItem('role', role);
};

export const storeBasicAuth = (basicAuth) => localStorage.setItem('auth', basicAuth);
export const getBasicAuth = () => localStorage.getItem('auth');

export const isUserLoggedIn = () => !!sessionStorage.getItem('authenticatedUser'); // Leverage double negation for concise check

export const getLoggedInUserId = () => sessionStorage.getItem('activeUserId');
export const getLoggedInUser = () => sessionStorage.getItem('authenticatedUser');

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isAdminUser = () => sessionStorage.getItem('role') === 'ROLE_ADMIN'; // Strict comparison for role check
