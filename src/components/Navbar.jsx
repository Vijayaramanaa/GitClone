import React,{useState} from 'react';
import { FaGithub } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import "../App.css"

function Navbar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (username) {
        navigate(`/repositories/${username}`);
      }
    };
  return (
    <div >
        <div className='LNavbar'>
        <div>
            <FaGithub className='giticon'/>
            <h1>Dashboard</h1>
        </div>
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
  )
}

export default Navbar