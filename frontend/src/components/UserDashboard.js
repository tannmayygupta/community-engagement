import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase"; // ✅ import db
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "./UserDashboard.css";

function UserDashboard({ user }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // ✅ Real-time Firestore Fetch
  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("timestamp", "desc")); // sort latest first

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe(); // Clean-up listener
  }, []);

  // ✅ Filtered Events
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h2 className="upcoming-events">Upcoming Events</h2>

        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search for an event..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* ✅ Show User Info with Dropdown */}
        <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
          {user ? (
            <>
              <span>{user.email}</span>
              <span className="profile-icon">👤</span>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={goToProfile}>👀 View Profile</button>
                  <button onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* ✅ Event Cards */}
      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>📍 {event.location}</p>
              <p>📅 Date: {event.date}</p>
              <button
                className="register-btn"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                Event Details
              </button>
            </div>
          ))
        ) : (
          <p>No events found!</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
