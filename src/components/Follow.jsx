import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Follow() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState(type === 'following' ? 'following' : 'followers');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let res;
        if (id) {
          res = await axios.get(`${BASE_URL}/user/profile/${id}`);
        } else {
          const token = localStorage.getItem('token');
          res = await axios.get(`${BASE_URL}/user/profile`, {
            headers: { Authorization: token },
          });
        }
        setProfile(res.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [id]);

  const list = activeTab === 'followers'
    ? (profile?.followers || [])
    : (profile?.following || []);

  return (
    <div className="flex justify-center">
      <div className="container w-sm lg:w-2xl my-10">
        <div className="flex gap-6 border-b mb-6">
          <button
            className={`pb-2 text-lg font-medium cursor-pointer ${activeTab === 'followers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('followers')}
          >
            Followers {profile ? `(${profile.followers?.length || 0})` : ''}
          </button>
          <button
            className={`pb-2 text-lg font-medium cursor-pointer ${activeTab === 'following' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('following')}
          >
            Following {profile ? `(${profile.following?.length || 0})` : ''}
          </button>
        </div>

        {list.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No {activeTab} yet.</p>
        ) : (
          list.map((user) => (
            <div
              key={user._id}
              className="container w-full my-4 p-3 flex items-center gap-4 shadow-lg rounded-lg hover:scale-102 transition-transform duration-300 cursor-pointer bg-white"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <img
                src={
                  user.profileImage ||
                  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                }
                alt={user.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <h4 className="text-md lg:text-xl">{user.name}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
