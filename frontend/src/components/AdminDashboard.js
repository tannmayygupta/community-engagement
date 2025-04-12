// src/components/AdminDashboard.js
import React, { useState } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, date, location } = formData;

    if (title && description && date && location) {
      const newEvent = {
        id: Date.now(),
        title,
        description,
        date,
        location,
      };

      setEvents((prev) => [...prev, newEvent]);
      alert("✅ Event Added!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
      });
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
    <div style={styles.page}>
      <div style={styles.container}>
      <div style={styles.card}>
      <div style={styles.header}>
        <h1 style={styles.heading}>👑 Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Add New Event</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.submitBtn}>
              ➕ Add Event
            </button>
          </form>
        </div>

        {/* {events.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📅 Event List</h2>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {events.map((event) => (
                <li key={event.id} style={styles.eventItem}>
                  <div>
                    <strong>{event.title}</strong> <br />
                    {event.description} <br />
                    <em>{event.date}</em> - {event.location}
                  </div>
                  <button
                    style={styles.deleteBtn}
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

const styles = {
  page: {
    background: "linear-gradient(135deg, #688af1, #d1d7de)",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "28px",
    margin: 0,
    color: "#333",
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  cardTitle: {
    marginBottom: "20px",
    color: "#007bff",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  submitBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  eventItem: {
    backgroundColor: "#f1f1f1",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
