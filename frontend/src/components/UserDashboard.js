import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  MapPin,
  TrendingUp,
  Star,
  Clock,
  Menu,
  X,
} from "lucide-react";

function UserDashboard({ user }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  // Fetch events from Firestore
  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categorize events
  const popularEvents = [...events]
    .sort((a, b) => (b.attendees?.length || 0) - (a.attendees?.length || 0))
    .slice(0, 8);

  const upcomingEvents = [...events]
    .filter((event) => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8);

  const nearbyEvents = [...events]
    .filter(
      (event) => event.location?.includes("local") || event.virtual === false
    )
    .slice(0, 8);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const scrollCategory = (direction, id) => {
    const container = document.getElementById(id);
    const scrollAmount = direction === "left" ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Animation variants - defined at the component level scope
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-neutral-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.h1
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                EventHub
              </motion.h1>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <motion.div
                  className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="ml-2 bg-transparent outline-none w-64 text-gray-700 dark:text-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </motion.div>
              </div>

              {/* User Profile */}
              <div className="relative">
                <motion.div
                  className="flex items-center cursor-pointer space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full"
                  onClick={() => setShowDropdown(!showDropdown)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    {user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">
                    {user?.email?.split("@")[0]}
                  </span>
                </motion.div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="py-1">
                      <button
                        onClick={goToProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showMobileMenu ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 mb-3">
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="ml-2 bg-transparent outline-none w-full text-gray-700 dark:text-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={goToProfile}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <motion.div
          className="mb-8 bg-indigo-900 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-64 md:h-80 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 flex items-center">
            <div className="relative z-10 max-w-2xl">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Discover Amazing Events
              </motion.h2>
              <motion.p
                className="text-indigo-100 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Join events that match your interests and connect with
                like-minded people
              </motion.p>
            </div>
            <div className="absolute right-0 top-0 h-full w-full md:w-1/3 opacity-20">
              {/* Decorative pattern */}
              <svg viewBox="0 0 300 300" className="h-full w-full">
                <pattern
                  id="pattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="2" fill="white" />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#pattern)"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Search Results (if active) */}
        {searchQuery && (
          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Search Results
            </h2>
            {filteredEvents.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No events found matching "{searchQuery}"
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    itemVariants={itemVariants}
                    navigate={navigate}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Popular Events Section */}
        {!searchQuery && (
          <EventSection
            title="Popular Events"
            icon={<TrendingUp className="w-5 h-5 text-red-500" />}
            events={popularEvents}
            scrollId="popular-events"
            scrollCategory={scrollCategory}
            itemVariants={itemVariants}
            navigate={navigate}
            containerVariants={containerVariants}
          />
        )}

        {/* Upcoming Events Section */}
        {!searchQuery && (
          <EventSection
            title="Upcoming Events"
            icon={<Calendar className="w-5 h-5 text-green-500" />}
            events={upcomingEvents}
            scrollId="upcoming-events"
            scrollCategory={scrollCategory}
            itemVariants={itemVariants}
            navigate={navigate}
            containerVariants={containerVariants}
          />
        )}

        {/* Nearby Events Section */}
        {!searchQuery && (
          <EventSection
            title="Nearby Events"
            icon={<MapPin className="w-5 h-5 text-blue-500" />}
            events={nearbyEvents}
            scrollId="nearby-events"
            scrollCategory={scrollCategory}
            itemVariants={itemVariants}
            navigate={navigate}
            containerVariants={containerVariants}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">EventHub</h3>
              <p className="mb-4">
                Connecting people through memorable experiences. Discover,
                create, and share events that matter.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-400 hover:text-white">
                    Home
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white">
                    Browse Events
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white">
                    Create Event
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white">
                    My Tickets
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white">
                    Help Center
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
              <p className="mb-4">
                Stay updated with the latest events and offers
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 EventHub. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <button className="text-gray-400 hover:text-white">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Event Card Component
function EventCard({ event, itemVariants, navigate }) {
  // Calculate days remaining
  const daysRemaining = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <motion.div
      className="z-10 bg-white min-h-90 max-h-90 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-500 flex flex-col"
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        {/* Featured and Countdown tags */}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          {event.title}
        </h3>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{event.location}</span>
        </div>

        <motion.button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors duration-300 mt-auto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/event/${event.id}`)}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

// Event Section Component
function EventSection({
  title,
  icon,
  events,
  scrollId,
  scrollCategory,
  itemVariants,
  navigate,
  containerVariants,
}) {
  return (
    <motion.div
      className="mb-12 space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          {icon}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 ml-2">
            {title}
          </h2>
        </div>
        <div className="flex space-x-2">
          <motion.button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollCategory("left", scrollId)}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollCategory("right", scrollId)}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div
        id={scrollId}
        className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div
              key={event.id}
              className="min-w-[280px] max-w-[280px]"
              variants={itemVariants}
            >
              <EventCard
                event={event}
                itemVariants={itemVariants}
                navigate={navigate}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No events available
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default UserDashboard;
