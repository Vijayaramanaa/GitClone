import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HistoryPage() {
  const { username, repoName } = useParams();
  const [commits, setCommits] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${username}/${repoName}/commits?page=${page}`)
      .then(res => setCommits(res.data))
      .catch(err => console.error(err));
  }, [username, repoName, page]);

  return (
    <div className='container'>
      <h1>Commit History</h1>
      <ul>
        {commits.map(commit => (
          <li key={commit.sha}>
            {commit.commit.message}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  );
}

export default HistoryPage;
