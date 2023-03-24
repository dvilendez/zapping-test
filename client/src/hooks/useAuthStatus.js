import { useState, useEffect } from 'react';
import { status } from '../services/login'

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchAuthStatus = async () => {
    try {
      const response = await status()
      const { ok } = response;
      setIsAuthenticated(ok);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  return isAuthenticated;
};

export default useAuthStatus;