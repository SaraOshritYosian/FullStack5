import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Posts = () => {
    const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch posts from the JSONPlaceholder API when the component mounts
    fetch(`http://localhost:3000/posts?userId=${id}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [id]);

  const addPost = async (title, body) => {
    const newPost = {
      title,
      body,
      userId: id
    };
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const updatePost = async (id, newTitle, newBody) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, body: newBody }),
      });
      const data = await response.json();
      setPosts(posts.map(post => (post.id === id ? data : post)));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (postId, body) => {
    const user= json.parse(localStorage.getItem('currentUser'));
    const newComment = {
      postId,
      name: user.name,
      email: user.email,
      body,
      userId: id, 
    };
    try {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      setComments([...comments, data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE',
      });
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const updateComment = async (id, newBody) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: newBody }),
      });
      const data = await response.json();
      setComments(comments.map(comment => (comment.id === id ? data : comment)));
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (searchTerm) {
      return post.id === parseInt(searchTerm) ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="text"
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            {post.id}. {post.title}
            <button onClick={() => {
              setSelectedPost(post);
              fetchComments(post.id);
            }}>View</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <button onClick={() => {
              const newTitle = prompt('Enter new title', post.title);
              const newBody = prompt('Enter new content', post.body);
              if (newTitle && newBody) updatePost(post.id, newTitle, newBody);
            }}>Edit</button>
            {selectedPost&& selectedPost.id===post.id && (
            <div>
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.body}</p>
              <h4>Comments</h4>
              <ul>
                {comments.map(comment => (
                  <li key={comment.id}>
                    {comment.body}
                    {comment.userId === id && (
                        <div>
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                    <button onClick={() => {
                      const newBody = prompt('Enter new comment', comment.body);
                      if (newBody) updateComment(comment.id, newBody);
                    }}>Edit</button>
                    </div>)}
                  </li>
                ))}
              </ul>
              <button onClick={() => {
                const body = prompt('Enter comment');
                if (body) addComment(selectedPost.id, body);
              }}>Add Comment</button>
              <button onClick={() => setSelectedPost(null)}>Close</button>
            </div>
          )}
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const title = prompt('Enter post title');
        const body = prompt('Enter post content');
        if (title && body) addPost(title, body);
      }}>Add Post</button>
    </div>
  );
};

export default Posts;