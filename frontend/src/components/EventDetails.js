import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        alert("Event not found");
        navigate("/user-dashboard");
      }
    };

    fetchEvent();
  }, [id, navigate]);

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={() => navigate("/user-dashboard")}>⬅ Back</button>
      <h2>{event.title}</h2>
      <p><strong>📍 Location:</strong> {event.location}</p>
      <p><strong>📅 Date:</strong> {event.date}</p>
      <p><strong>📝 Description:</strong> {event.description || "No description provided"}</p>

      <button
        className="register-now"
        onClick={() =>
          event.link
            ? window.location.href = event.link
            : alert("No registration link provided")
        }
      >
        Register Now
      </button>
    </div>
  );
};

export default EventDetails;
