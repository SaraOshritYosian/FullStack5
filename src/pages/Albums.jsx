import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Albums = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch albums from the JSONPlaceholder API when the component mounts
    fetch(`http://localhost:3000/albums?userId=${id}`)
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Error fetching albums:', error));
  }, [id]);

  const addAlbum = async (title) => {
    const newAlbum = {
      title,
      userId: parseInt(id, 10)
    };
    try {
      const response = await fetch('http://localhost:3000/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlbum),
      });
      const data = await response.json();
      setAlbums([...albums, data]);
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await fetch(`http://localhost:3000/albums/${id}`, {
        method: 'DELETE',
      });
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const updateAlbum = async (id, newTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/albums/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();
      setAlbums(albums.map(album => (album.id === id ? data : album)));
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const filteredAlbums = albums.filter(album => {
    if (searchTerm) {
      return album.id === parseInt(searchTerm) ||
        album.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const showPhotos = (album) => {
    navigate(`/users/${id}/albums/${album.id}/photos`);
  };

  return (
    <div>
      <h2>Albums</h2>
      <input
        type="text"
        placeholder="Search albums"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredAlbums.map(album => (
          <li key={album.id}>
            {album.id}. {album.title}
            <button onClick={() => showPhotos(album)}>View Photos</button>
            <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            <button onClick={() => {
              const newTitle = prompt('Enter new title', album.title);
              if (newTitle) updateAlbum(album.id, newTitle);
            }}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const title = prompt('Enter album title');
        if (title) addAlbum(title);
      }}>Add Album</button>
    </div>
  );
};

export default Albums;
