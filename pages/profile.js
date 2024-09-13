/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/profileData';
import { useAuth } from '../utils/context/authContext';
import ProfileCard from '../components/cards/ProfileCard';

function ProfilePage() {
  // TODO: Set a state for Profile
  const [profile, setProfile] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheProfiles = () => {
    getProfile(user.uid).then(setProfile);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheProfiles();
  }, []);

  return (
    <div className="text-center my-4">

      <div className="d-flex flex-wrap">
        {profile.map((profiles) => (
          <ProfileCard key={profile.firebaseKey} profileObj={profiles} onUpdate={getAllTheProfiles} />
        ))}
      </div>

    </div>
  );
}

export default ProfilePage;
