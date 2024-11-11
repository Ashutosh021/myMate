import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostForm.css";

function PostForm({ userId, onPostCreated }) {
  const [user, setUser] = useState({
    profilePhoto: "defaultProfilePhotoUrl.jpg",
    name: "Anonymous",
  });
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null); // Single file, not an array
  const [mediaPreview, setMediaPreview] = useState(null); // Single preview
  const [loading, setLoading] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser({
          profilePhoto: response.data.user.profilePic,
          name: response.data.user.name,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false when request is done
      }
    };
    fetchUser();
  }, [userId]);

  // Handle content change
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle media upload (only one file)
  const handleMediaChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setMedia(file); // Store the file in state

    // Generate media preview
    const preview = URL.createObjectURL(file);
    setMediaPreview(preview); // Update preview for a single file
  };

  // Reset form fields
  const resetForm = () => {
    setPostContent('');
    setMedia(null); // Reset the media
    if (mediaPreview) URL.revokeObjectURL(mediaPreview); // Release memory for preview
    setMediaPreview(null); // Reset preview
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    if (media) formData.append("post-pic", media); // Attach the single file

    setLoading(true);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);

      // Call the onPostCreated callback with the new post data
      if (onPostCreated) {
        onPostCreated(data);
      }

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false); // Reset loading state after request is finished
    }
  };

  return (
    <div className="main-container">
      <div className="post-form-container">
        {loading && <p>Loading...</p>} {/* Show loading text when fetching user or posting */}

        <div className="post-author">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="profile-photo"
          />
          <h3>{user.name}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={handleContentChange}
            className="post-content"
            required
          ></textarea>

          <label className="media-upload">
            <input
              type="file"
              accept="image/*,video/*"
              name="post-pic"
              onChange={handleMediaChange}
            />
            <span>Upload Media</span>
          </label>

          {mediaPreview && (
            <div className="media-preview">
              <img src={mediaPreview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="discard-button"
          >
            Discard
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
