import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../App.css"

function RepositoryPage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(res => setRepos(res.data))
      .catch(err => console.error(err));
  }, [username]);
  if (!profile) return <div className='container'><h1>
    Loading...
    </h1>
    </div>;
  return (
    <div className='container'>
      <div className='repoHead'>
      <img className='prfimg' src={profile.avatar_url} alt={profile.login} />
      <h1>{profile.name}</h1>
      </div>
      <div className='repoContainer'>
        <h2>Repositories</h2>
      {repos.length == 0 ? <h1>No Repository Found</h1>:<ul>
        {repos.map((repo,index) => (
          <li key={repo.id} className='liststyle' style={{animationDelay:`${index*0.4}s`}}>
            <img src={profile.avatar_url} style={{width:"15px",borderRadius:"50%",marginRight:"10px"}}/>
            <Link to={`/repositories/${username}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>}
        </div>
    </div>
  );
}

export default RepositoryPage;
