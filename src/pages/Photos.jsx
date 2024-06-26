import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Photos = () => {
  const { id, albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editPhotoTitle, setEditPhotoTitle] = useState('');
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchPhotos();
  }, [albumId]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/photos?albumId=${albumId}&_limit=${limit}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLimit(limit + 5);
      console.log(limit);
      setLoading(false);
    }
  };

  const addPhoto = async () => {
    if (!newPhotoUrl || !newPhotoTitle) return;

    const newPhoto = {
      albumId: albumId,
      title: newPhotoTitle,
      url: newPhotoUrl,
      thumbnailUrl: newPhotoUrl,
    };
    try {
      const response = await fetch('http://localhost:3000/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPhoto),
      });
      const data = await response.json();
      setPhotos([...photos, data]);
      setNewPhotoTitle('');
      setNewPhotoUrl('');
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const deletePhoto = async (id) => {
    try {
      await fetch(`http://localhost:3000/photos/${id}`, {
        method: 'DELETE',
      });
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const updatePhoto = async () => {
    try {
      const response = await fetch(`https://localhost:3000/photos/${editPhotoId}`, {
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
      <div className="photos-container">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
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
                <div className="photo-actions">
                  <button class="edit-delete" onClick={() => {
                    setEditPhotoId(photo.id);
                    setEditPhotoTitle(photo.title);
                  }}>Edit</button>
                  <button class="edit-delete" onClick={() => deletePhoto(photo.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button disabled={loading} onClick={fetchPhotos}>
        {loading ? 'Loading...' : 'More Photos'}
      </button>
      <div>
        <input
          type="text"
          placeholder="Enter photo title"
          value={newPhotoTitle}
          onChange={(e) => setNewPhotoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter photo url"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
        />
        <button onClick={addPhoto}>Add Photo</button>
      </div>
    </div>
  );
};

export default Photos;
