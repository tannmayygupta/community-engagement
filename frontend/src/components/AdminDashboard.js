import { db } from "../services/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  PlusCircle,
  X,
  Search,
  Bell,
  ChevronRight,
  LogOut,
  Clock,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    link: "",
  });

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from Firestore on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort events by date
        eventsList.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, date, location, link } = eventDetails;
    const time = eventDetails.time;

    if (title && description && date && location && link) {
      try {
        const docRef = await addDoc(collection(db, "events"), {
          title,
          description,
          date,
          time,
          location,
          link,
          timestamp: new Date(), // for sorting later
        });

        // Add the new event to state with its ID
        const newEvent = {
          id: docRef.id,
          ...eventDetails,
          timestamp: new Date(),
        };

        setEvents((prev) =>
          [...prev, newEvent].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        );

        alert("Event added successfully!");
        setEventDetails({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          link: "",
        });
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error adding event: ", err);
        alert("Error adding event. Check console.");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleDelete = (id) => {
    const filtered = events.filter((event) => event.id !== id);
    setEvents(filtered);
    alert("Event Deleted!");
  };

  const navigateToEventDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-neutral-900 flex justify-center text-white relative overflow-hidden">
      {/* Background elements for more depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(120,50,180,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Logout Button in Top Right Corner */}
      <div className="absolute top-6 right-6 z-20">
        <motion.button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gray-800/70 hover:bg-gray-700/90 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </div>

      <main className="px-6 py-8 flex flex-col w-full max-w-5xl relative z-10">
        <div className="flex mb-10">
          <h1 className="text-3xl font-bold text-center text-gray-300">
            Events
          </h1>
        </div>

        <motion.button
          className="flex items-center space-x-2 bg-gray-800/70 hover:bg-gray-700/90 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700/50 mt-8 mx-auto"
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={18} />
          <span>Create New Event</span>
        </motion.button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>

            <motion.div
              className="space-y-6 min-w-4xl flex flex-col items-center
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => navigateToEventDetails(event.id)}
                  formatDate={formatDate}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-32 h-32 bg-gray-800/80 rounded-xl flex items-center justify-center mb-6 relative backdrop-blur-sm border border-gray-700/50">
              <div className="w-20 h-16 rounded-md bg-gray-700/90">
                <div className="w-10 h-2 bg-gray-600 rounded-sm m-2"></div>
                <div className="w-6 h-2 bg-gray-600 rounded-sm m-2"></div>
                <div className="flex justify-between m-2">
                  <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Upcoming Events</h2>
            <p className="text-gray-400 mb-6">
              You have no upcoming events. Why not host one?
            </p>
            <motion.button
              className="flex items-center space-x-2 bg-gray-800/70 hover:bg-gray-700/90 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700/50"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={18} />
              <span>Create Event</span>
            </motion.button>
          </div>
        )}
      </main>

      {/* Animated Glassmorphism Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop with blur effect */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            ></motion.div>

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-gray-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 15 }}
              >
                {/* Glassmorphism light effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <motion.h2
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Create New Event
                    </motion.h2>
                    <motion.button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-white/10"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-gray-300 mb-2">
                          Event Name
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={eventDetails.title}
                          onChange={handleChange}
                          className="w-full bg-white/5 text-white rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm"
                          placeholder="Enter event name"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={eventDetails.description}
                          onChange={handleChange}
                          className="w-full bg-white/5 text-white rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm h-24"
                          placeholder="Describe your event"
                          required
                        ></textarea>
                      </motion.div>

                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div>
                          <label className="block text-gray-300 mb-2">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>Date</span>
                            </div>
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={eventDetails.date}
                            onChange={handleChange}
                            className="w-full bg-white/5 text-white rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2">
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>Time</span>
                            </div>
                          </label>
                          <input
                            type="time"
                            name="time"
                            value={eventDetails.time}
                            onChange={handleChange}
                            className="w-full bg-white/5 text-white rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-gray-300 mb-2">
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span>Venue</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={eventDetails.location}
                          onChange={handleChange}
                          className="w-full bg-white/5 text-white rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm"
                          placeholder="Enter venue location"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-gray-300 mb-2">
                          <div className="flex items-center space-x-2">
                            <LinkIcon size={16} />
                            <span>Registration Link</span>
                          </div>
                        </label>
                        <input
                          type="url"
                          name="link"
                          value={eventDetails.link}
                          onChange={handleChange}
                          className="w-full bg-white/5 text-white rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm"
                          placeholder="Enter registration link"
                          required
                        />
                      </motion.div>

                      <motion.div
                        className="flex justify-end space-x-4 pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <motion.button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-6 py-2 rounded-lg border border-gray-600/50 text-gray-300 hover:bg-white/10"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white backdrop-blur-sm shadow-lg shadow-purple-500/20"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Create Event
                        </motion.button>
                      </motion.div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Event Card Component with Framer Motion animations
const EventCard = ({ event, onClick, formatDate }) => {
  // Truncate description to 3 lines max
  const truncateDescription = (text, maxLength = 120) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <motion.div
      className="min-w-4xl max-w-4xl bg-gray-800/40 backdrop-blur-sm border border-gray-500/50 rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card header with gradient overlay */}
      <div className="h-4 bg-gradient-to-r from-purple-600/80 to-indigo-600/80"></div>

      <div className="p-5">
        {/* Event date */}
        <div className="flex items-center space-x-2 text-purple-400 mb-2 text-sm">
          <Calendar size={14} />
          <span>
            {formatDate(event.date)} • {event.time}
          </span>
        </div>

        {/* Event title */}
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
          {event.title}
        </h3>

        {/* Venue */}
        <div className="flex items-center space-x-2 text-gray-400 mb-3 text-sm">
          <MapPin size={14} />
          <span>{event.location}</span>
        </div>

        {/* Description with truncation */}
        <p className="text-gray-300 mb-4 line-clamp-3">
          {truncateDescription(event.description)}
        </p>

        {/* View details button */}
        <div className="flex justify-end">
          <motion.div
            className="flex items-center text-sm text-purple-400 font-medium"
            whileHover={{ x: 5 }}
          >
            <span>View details</span>
            <ChevronRight size={16} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
