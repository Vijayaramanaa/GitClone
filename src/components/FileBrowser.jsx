import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { BsFileEarmarkZipFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import "../App.css"

function FileBrowser() {
  const { username, repoName } = useParams();
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState('');
  const [profile,setProfile] = useState("")

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${path}`)
      .then(res => setFiles(res.data))
      .catch(err => console.error(err));
      axios.get(`https://api.github.com/users/${username}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [username, repoName, path]);

  const handleNavigation = (dir) => {
    setPath(prevPath => (prevPath ? `${prevPath}/${dir}` : dir));
  };

  const handleFileDownload = (file) => {
    axios.get(file.download_url, { responseType: 'blob' })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => console.error(err));
  };

  const handleDirectoryDownload = async () => {
    const zip = new JSZip();
    await addFilesToZip(zip, files, path);
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${repoName}.zip`);
    });
  };

  const addFilesToZip = async (zip, files, currentPath) => {
    for (const file of files) {
      if (file.type === 'dir') {
        const folder = zip.folder(file.name);
        const folderFiles = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${currentPath ? `${currentPath}/${file.name}` : file.name}`)
          .then(res => res.data)
          .catch(err => console.error(err));
        await addFilesToZip(folder, folderFiles, currentPath ? `${currentPath}/${file.name}` : file.name);
      } else {
        const fileContent = await axios.get(file.download_url, { responseType: 'blob' })
          .then(res => res.data)
          .catch(err => console.error(err));
        zip.file(file.name, fileContent);
      }
    }
  };

  return (
    <div className='container'>
      <div className='fileHead'>
      <div>
      <img src={profile.avatar_url} style={{width:"35px",height:"35px",borderRadius:"50%",marginRight:"10px"}}/>
      <h1>{repoName}</h1>
        </div>
      <button onClick={handleDirectoryDownload}>Download as <BsFileEarmarkZipFill/></button>
      </div>
      <div className='fileRepo' >
     {files.length == 0 ? <h1>Repo has no file</h1>: <ul>
        {files.map((file,index)=> (
          <li key={file.sha} className='liststyle' style={{animationDelay:`${index*0.3}s`}}>
            {file.type === 'dir' ? (
              <button onClick={() => handleNavigation(file.name)}>
                {file.name}
              </button>
            ) : (<div>
              <p>{file.name}</p>
              <button onClick={() => handleFileDownload(file)}>
              <FaFileAlt/>
              </button>
            </div>
            )}
          </li>
        ))}
      </ul>}
      </div>
    </div>
  );
}

export default FileBrowser;
