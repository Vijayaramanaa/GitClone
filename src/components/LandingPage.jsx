import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

import "../App.css"

function LandingPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      navigate(`/repositories/${username}`);
    }
  };

  return (
    <div className='container'>
            <div className='LMainView'>
        <h1>Landing Page</h1>
        <h2>Explore more using Search in Nav bar</h2>
        <p>Type UserName  to Find repository or profile</p>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder='Enter Username to view'
          onChange={(e) => setUsername(e.target.value)}
          />
        <button type="submit"><IoMdSearch/>Search</button>
      </form>
      </div>
    </div>
  );
}

export default LandingPage;
