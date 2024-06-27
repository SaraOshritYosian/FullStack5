import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Albums = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
      // Fetch photos related to the album
      const photosResponse = await fetch(`http:///localhost:3000/photos?albumId=${id}`);
      const photos = await photosResponse.json();

      // Delete each comment
        photos.map(async photo => {
            await fetch(`http://localhost:3000/photos/${photo.id}`, {
            method: 'DELETE',
          })}
        );
      
        // Delete the album
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

  const showPhotos = (album) => {
    navigate(`/users/${id}/albums/${album.id}/photos`);
  };

  const albumItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const buttonStyle = {
    marginLeft: '10px',
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
        {albums.map(album => (
          <li key={album.id} style={albumItemStyle}>
            <div>
              {album.title}
            </div>
            <div>
              <button style={buttonStyle} onClick={() => showPhotos(album)}>View</button>
              <button style={buttonStyle} onClick={() => deleteAlbum(album.id)}>Delete</button>
              <button style={buttonStyle} onClick={() => {
                const newTitle = prompt('Enter new title', album.title);
                if (newTitle) updateAlbum(album.id, newTitle);
              }}>Edit</button>
            </div>
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
