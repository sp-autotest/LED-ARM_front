export default {
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    token_expired: 0,
}