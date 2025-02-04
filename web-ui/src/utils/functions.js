export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const isAuthenticated = () => {
  const token = getCookie('token');
  if (token) {
    try {
      if (token) {
        return true;
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  return false;
};