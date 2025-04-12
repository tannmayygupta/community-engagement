import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched eventId: ", eventId); // Check eventId
        const event = data.find((e) => e.id === parseInt(eventId)); 
        console.log("Found event: ", event); 
        if (event) {
          setEventDetails(event); 
        } else {
          console.log("Event not found");
        }
      })
      .catch((err) => console.error("Error fetching event details:", err));
  }, [eventId]);

  if (!eventDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>{eventDetails.name}</h1>
      <p>{eventDetails.venue}</p>
      <p>{eventDetails.time}</p>
      <p>Entry Fee: {eventDetails.entryFee}</p>
      <p>Type: {eventDetails.type}</p>
    </div>
  );
}

export default EventDetails;


