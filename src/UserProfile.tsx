// src/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ botToken, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChat`, {
          params: {
            chat_id: userId,
          },
        });
        setUser(response.data.result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [botToken, userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={user.photo_url} alt="Profile" />
      <h1>{user.first_name} {user.last_name}</h1>
      <p>@{user.username}</p>
    </div>
  );
};

export default UserProfile;
