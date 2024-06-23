import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
  const { id, albumId  } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editPhotoTitle, setEditPhotoTitle] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, [albumId]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = async () => {
    const newPhoto = {
      albumId: albumId,
      title: newPhotoTitle,
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952'
    };
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPhoto),
      });
      const data = await response.json();
      setPhotos([...photos, data]);
      setNewPhotoTitle('');
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const deletePhoto = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        method: 'DELETE',
      });
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const updatePhoto = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${editPhotoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editPhotoTitle }),
      });
      const updatedPhoto = await response.json();
      setPhotos(photos.map(photo => (photo.id === editPhotoId ? updatedPhoto : photo)));
      setEditPhotoId(null);
      setEditPhotoTitle('');
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  return (
    <div>
      <h3>Photos</h3>
      <button disabled={loading} onClick={fetchPhotos}>
        {loading ? 'Loading...' : 'Refresh Photos'}
      </button>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            {editPhotoId === photo.id ? (
              <div>
                <input
                  type="text"
                  value={editPhotoTitle}
                  onChange={(e) => setEditPhotoTitle(e.target.value)}
                />
                <button onClick={updatePhoto}>Save</button>
                <button onClick={() => {
                  setEditPhotoId(null);
                  setEditPhotoTitle('');
                }}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{photo.title}</p>
                <button onClick={() => {
                  setEditPhotoId(photo.id);
                  setEditPhotoTitle(photo.title);
                }}>Edit</button>
                <button onClick={() => deletePhoto(photo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter photo title"
          value={newPhotoTitle}
          onChange={(e) => setNewPhotoTitle(e.target.value)}
        />
        <button onClick={addPhoto}>Add Photo</button>
      </div>
    </div>
  );
};

export default Photos;
