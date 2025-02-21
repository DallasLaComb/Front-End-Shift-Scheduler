// src/App.js
import { useAuthLogic } from './utils/auth';

function App() {
  const { auth, signOutRedirect } = useAuthLogic();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-semibold text-gray-800">
              Shift Scheduler
            </div>
            <div>
              {auth.isAuthenticated ? (
                <button
                  onClick={signOutRedirect}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => auth.signinRedirect()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {auth.isLoading && <div className="text-center">Loading...</div>}

        {auth.error && (
          <div className="text-center text-red-500">
            Encountering error... {auth.error.message}
          </div>
        )}

        {auth.isAuthenticated && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <pre className="text-gray-700">
              Hello: {auth.user?.profile.email}
            </pre>
            <pre className="text-gray-700">ID Token: {auth.user?.id_token}</pre>
            <pre className="text-gray-700">
              Access Token: {auth.user?.access_token}
            </pre>
            <pre className="text-gray-700">
              Refresh Token: {auth.user?.refresh_token}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
