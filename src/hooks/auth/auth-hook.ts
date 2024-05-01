export const useAuthState = () => {
    const isAuthenticated = localStorage.getItem('user');
    const setAuthenticated = (username) => localStorage.setItem('user', username);
    const logout = () => localStorage.removeItem('user');

    return {
        isAuthenticated,
        setAuthenticated,
        logout
    };
};