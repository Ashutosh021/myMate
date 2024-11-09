import React, { useEffect, useState } from 'react';
import './PostFeed.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');

  // Fetch posts from the backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts/feed');
        const data = await response.json();
        console.log("Fetched posts data:", data); // Debugging line
        // Check if data is an array or an object containing posts array
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Unexpected data format:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = () => {
    console.log("Posted content:", postContent);
    setPostContent('');
  };

  return (
    <div className="post-feed">
      {/* New Post Input */}
      <div className="new-post">
        <img src="/user-avatar.png" alt="User Avatar" className="new-post-avatar" />
        <input
          type="text"
          placeholder="Write a post..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="new-post-input"
        />
        <button onClick={handlePostSubmit} className="new-post-button">Post</button>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            {/* Post Header */}
            <div className="post-header">
              <img src="/user-avatar.png" alt="Author" className="post-avatar" />
              <div>
                <p className="post-author">Author Name</p> {/* Replace with actual author data if available */}
                <p className="post-created-at">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="post-content">{post.content}</p>

            {/* Post Media */}
            {post.media && post.media.length > 0 && (
              <img src={post.media[0]} alt="Post Media" className="post-media" />
            )}

            {/* Post Actions */}
            <div className="post-actions">
              <span>
                <i className="icon-heart">❤️</i> {post.likes.length} Likes
              </span>
              <span>
                <i className="icon-share">🔄</i> {post.shares.length} Shares
              </span>
              <span>
                <i className="icon-save">🔖</i> {post.savedBy.length} Saves
              </span>
            </div>

            {/* Comments Section */}
            <div className="post-comments">
              <h4>Comments</h4>
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p><strong>User:</strong> {comment.text}</p>
                    <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;
