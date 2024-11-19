import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserPost.css'; // Assuming you have this CSS file for styling

const UserPostPage = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [posts, setPosts] = useState([]); // Store posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/feed`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (response.ok && data) {
          // Filter posts by userId
          const userPosts = await data.filter(post => post.author._id === userId);
          setPosts(userPosts);
        } else {
          setError('Failed to load posts');
        }
      } catch (error) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  // Loading or error state
  if (loading) {
    return <p className="pf-loading">Loading posts...</p>;
  }

  if (error) {
    return <p className="pf-error">{error}</p>;
  }

  // Handle edit post
  const handleEdit = (postId) => {
    // Logic for editing the post, e.g., open a modal or redirect to an edit page
    console.log(`Edit post with ID: ${postId}`);
  };

  // Handle delete post
  const handleDelete = (postId) => {
    // Logic for deleting the post, e.g., show confirmation dialog
    console.log(`Delete post with ID: ${postId}`);
  };

  return (
    <div className="pf-user-posts">
      <h2 className="pf-h2">Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="pf-post">
            <div className="pf-post-content">
              <p>{post.content}</p>
              {post.media[0] && (
                <img src={post.media[0]} alt="post media" className="pf-post-image" />
              )}
            </div>
            <div className="pf-post-buttons">
              <button onClick={() => handleEdit(post._id)} className="pf-edit-btn">Edit</button>
              <button onClick={() => handleDelete(post._id)} className="pf-delete-btn">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default UserPostPage;
