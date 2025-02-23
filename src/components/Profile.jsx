// src/components/Profile.jsx
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const loginEndpoint = `${apiUrl}/login`;
          const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.uid }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();

          // Transform the data: Extract the actual values from DynamoDB response
          const transformedData = Object.keys(data).reduce((acc, key) => {
            acc[key] = data[key].S; // Extract the string value
            return acc;
          }, {});

          setUserData(transformedData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {userData ? (
        <div className="space-y-2">
          <p>
            <strong>User ID:</strong> {userData.userId}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>First Name:</strong> {userData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.lastName}
          </p>
          <p>
            <strong>Role:</strong> {userData.role}
          </p>
          <p>
            <strong>Company:</strong> {userData.company}
          </p>
          {userData.managerId && (
            <p>
              <strong>Manager ID:</strong> {userData.managerId}
            </p>
          )}
          <p>
            <strong>Created At:</strong> {userData.createdAt}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
