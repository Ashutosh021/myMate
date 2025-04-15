import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Education = () => {
  const { userId: profileUserId } = useParams();
  const loggedInUserId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");

  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    duration: "",
    grade: "",
    skills: "",
  });

  const isEditable = profileUserId === loggedInUserId || !profileUserId;

  const fetchEducation = async () => {
    try {
      const targetUserId = profileUserId || loggedInUserId;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/get-education/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setEducation(response.data.education || []);
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, [profileUserId]);

  const handleEditClick = (edu) => {
    setEditingId(edu?._id || "new"); // Use "new" for new education
    setForm({
      institution: edu?.institution || "",
      degree: edu?.degree || "",
      duration: edu?.duration || "",
      grade: edu?.grade || "",
      skills: edu?.skills ? edu.skills.join(", ") : "",
    });
  };

  const handleSave = async (id) => {
    const payload = {
      ...form,
      skills: form.skills.split(",").map((skill) => skill.trim()),
    };

    try {
      if (id === "new") {
        // Create new education
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/update-education/null`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } else {
        // Update existing education
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/update-education/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }

      setEditingId(null);
      fetchEducation();
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  if (loading) return <p className="pf-loading">Loading education...</p>;

  return (
    <div className="pf-user-posts">
      <h2 className="pf-h2">Education Details</h2>

      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu._id} className="pf-post">
            {editingId === edu._id ? (
              <div className="pf-post-content">
                <EducationForm form={form} setForm={setForm} handleSave={() => handleSave(edu._id)} />
              </div>
            ) : (
              <div className="pf-post-content">
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Course:</strong> {edu.degree}</p>
                <p><strong>Duration:</strong> {edu.duration}</p>
                <p><strong>Grade:</strong> {edu.grade}</p>
                <p><strong>Skills:</strong> {edu.skills?.join(", ")}</p>
                {isEditable && (
                  <button onClick={() => handleEditClick(edu)} className="pf-delete-btn">
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>
          <p>No education details available.</p>
          {isEditable && (
            <button onClick={() => handleEditClick(null)} className="pf-delete-btn">
              Add Education
            </button>
          )}
        </div>
      )}

      {editingId === "new" && (
        <div className="pf-post">
          <EducationForm form={form} setForm={setForm} handleSave={() => handleSave("new")} />
        </div>
      )}
    </div>
  );
};

const EducationForm = ({ form, setForm, handleSave }) => (
  <div className="pf-post-content">
    <input
      type="text"
      value={form.institution}
      onChange={(e) => setForm({ ...form, institution: e.target.value })}
      placeholder="Institution"
    />
    <input
      type="text"
      value={form.degree}
      onChange={(e) => setForm({ ...form, degree: e.target.value })}
      placeholder="Degree"
    />
    <input
      type="text"
      value={form.duration}
      onChange={(e) => setForm({ ...form, duration: e.target.value })}
      placeholder="Duration"
    />
    <input
      type="text"
      value={form.grade}
      onChange={(e) => setForm({ ...form, grade: e.target.value })}
      placeholder="Grade"
    />
    <input
      type="text"
      value={form.skills}
      onChange={(e) => setForm({ ...form, skills: e.target.value })}
      placeholder="Skills (comma-separated)"
    />
    <button onClick={handleSave} className="pf-delete-btn">
      Save
    </button>
  </div>
);

export default Education;
