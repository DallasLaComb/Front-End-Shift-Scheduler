// src/utils/auth.js
import { useAuth } from 'react-oidc-context';

export const useAuthLogic = () => {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

    // Clear local session
    auth.removeUser();
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to Cognito logout endpoint
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return {
    auth,
    signOutRedirect,
  };
};
