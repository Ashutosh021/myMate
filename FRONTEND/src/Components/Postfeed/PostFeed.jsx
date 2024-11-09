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
        const authToken = localStorage.getItem("authToken");
        const response = await fetch('http://localhost:5000/api/posts/feed',{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        // console.log("Fetched posts data:", data); // Debugging line

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

  // Handle new post submission
  const handlePostSubmit = async () => {
    console.log("Posted content:", postContent);
    if (!postContent.trim()) return; // Prevent empty posts

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ content: postContent }),
      });
      const newPost = await response.json();
      setPosts([newPost, ...posts]); // Add the new post to the front of the list
      setPostContent('');
    } catch (error) {
      console.error('Error posting content:', error);
    }
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
              <img src={post.author.profilePic} alt="Author" className="post-avatar" />
              <div>
                <p className="post-author">
                  {post.author.name || "Unknown Author"} {/* Replace with actual author name */}
                </p>
                <p className="post-created-at">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="post-content">{post.content}</p>

            {/* Post Media */}
            {post.media?.length > 0 && (
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
