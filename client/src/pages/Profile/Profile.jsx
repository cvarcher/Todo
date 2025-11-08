import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { fetchUserProfile } from '../../api/Todos';
import Siderbar from '../../components/Siderbar';

const Profile = () => {
  const [userdata, setUserdata] = useState(null);
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const getUserData = async () => {
      try {
        const response = await fetchUserProfile(user.email);
        setUserdata(response);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    getUserData();
  }, [user]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>No user logged in</p>;
  if (!userdata) return <p>Loading profile...</p>;

  return (
    <div className="flex">
      <Siderbar />
      <div className="flex justify-center items-center w-full mt-10 text-gray-600">
        <div className="flex flex-col">
          <div className="p-4">
            <h1 className="font-semibold text-xl">Username: {userdata.username}</h1>
          </div>
          <div className="p-4">
            <h1 className="font-semibold text-xl">Email: {userdata.email}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
