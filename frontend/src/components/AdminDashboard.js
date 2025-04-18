// src/components/AdminDashboard.js

import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // 🆕 CSS import

function AdminDashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    link: "",  // registration link added
  });

  const [events, setEvents] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { title, description, date, location, link } = formData;
  
    if (title && description && date && location && link) {
      try {
        await addDoc(collection(db, "events"), {
          title,
          description,
          date,
          location,
          link, // store registration link
          timestamp: new Date(), // for sorting later
        });
  
        alert("✅ Event added to Firestore!");
        setFormData({
          title: "",
          description: "",
          date: "",
          location: "",
          link: "",  // reset the link input field
        });
      } catch (err) {
        console.error("Error adding event: ", err);
        alert("❌ Error adding event. Check console.");
      }
    } else {
      alert("⚠️ Please fill all fields.");
    }
  };

  const handleDelete = (id) => {
    const filtered = events.filter((event) => event.id !== id);
    setEvents(filtered);
    alert("🗑️ Event Deleted!");
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <div className="header">
            <h1 className="heading">👑 Admin Dashboard</h1>
            <button onClick={handleLogout} className="logoutBtn">
              Logout
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="cardTitle">Add New Event</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="link"
              placeholder="Enter the Event Registration Link"
              value={formData.link}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="submitBtn">
              ➕ Add Event
            </button>
          </form>
        </div>

        {/* Optional Event List section (uncomment if needed later)
        {events.length > 0 && (
          <div className="card">
            <h2 className="cardTitle">📅 Event List</h2>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {events.map((event) => (
                <li key={event.id} className="eventItem">
                  <div>
                    <strong>{event.title}</strong> <br />
                    {event.description} <br />
                    <em>{event.date}</em> - {event.location}
                  </div>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(event.id)}
                  >
                    ❌ Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default AdminDashboard;
