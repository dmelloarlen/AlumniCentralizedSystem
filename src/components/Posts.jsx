import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Posts() {
  const [filterItem, setFilterItem] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts`);
        if (res.status === 200) {
          setPosts(res.data || []);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(filterItem.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(filterItem.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-medium text-center mt-10">Posts</h1>
      <div className="mx-10 sticky top-17 z-50">
        <form className="max-w-md mx-auto">
          <label
            htmlFor="search"
            className="block mb-2.5 text-sm font-medium text-heading sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-3 ps-9 text-sm rounded-base shadow-lg rounded-2xl focus:outline-none"
              placeholder="Search by title or author"
              onChange={(e) => setFilterItem(e.target.value)}
            />
            <button
              type="button"
              className="absolute end-1.5 bottom-1.5 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-lg font-medium rounded-4xl text-xs px-3 py-1.5"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <section className="mt-8 flex gap-6 flex-wrap justify-center">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg p-6 mb-4 hover:scale-105 transition-transform shadow-xl duration-300 w-80"
            >
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => navigate(`/profile/${post.author?._id}`)}
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt={post.author?.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-500 ms-2">
                  {post.author?.name}
                </span>
              </div>
              {post.image && (
                <img
                  src={`${BASE_URL}${post.image}`}
                  alt="post"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <button
                type="button"
                onClick={() => navigate(`/profile/${post.author?._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">No posts found.</p>
        )}
      </section>
    </div>
  );
}
