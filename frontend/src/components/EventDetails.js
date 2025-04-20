import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Info, 
  AlertCircle, 
  Instagram, 
  Linkedin,
  ArrowLeft,
  Share2,
  Star 
} from 'lucide-react';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent(docSnap.data());
        } else {
          alert("Event not found");
          navigate("/user-dashboard");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Error loading event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading event details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/user-dashboard")}
              className="text-lg font-bold cursor-pointer"
            >
              EventHub
            </motion.div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate("/user-dashboard")}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Calendar size={18} className="mr-2" />
                Events
              </button>
              <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Users size={18} className="mr-2" />
                My Events
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span className="hidden md:inline">Back</span>
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium"
            >
              Create Event
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            {/* Host Club Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl text-center shadow-lg"
            >
              <div className="mb-6">
                <span className="text-2xl">~ {event.host || "Developers"}</span>
                <div className="text-4xl font-bold">Club</div>
              </div>
              
              <div className="text-gray-300 mb-8">{event.title || "Tour 2024 -- City"}</div>

              <div className="border-t border-purple-700 pt-6">
                <div className="text-xs text-gray-400">HOSTED BY</div>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-purple-600/30 p-1 rounded-full">
                      <div className="h-8 w-8 flex items-center justify-center">
                        <span className="text-lg">
                          {event.host ? event.host[0].toUpperCase() : "D"}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold">{event.host}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div variants={itemVariants} className="flex space-x-4 justify-center">
              <motion.a 
                whileHover={{ y: -3, color: "#C13584" }}
                href="#" 
                className="text-gray-400 hover:text-white transition-all"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#0077B5" }}
                href="#" 
                className="text-gray-400 hover:text-white transition-all"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </motion.div>

            {/* Contact Links */}
            <motion.div variants={itemVariants} className="space-y-4 mt-6">
              <div className="rounded-xl bg-gray-900 p-5 border border-gray-800">
                <div className="space-y-3">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="text-blue-400 cursor-pointer flex items-center"
                  >
                    <Info size={16} className="mr-2" />
                    Contact the Host
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="text-blue-400 cursor-pointer flex items-center"
                  >
                    <AlertCircle size={16} className="mr-2" />
                    Report Event
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="text-blue-400 cursor-pointer flex items-center"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share Event
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-start">
              <motion.div variants={itemVariants} className="inline-flex items-center bg-purple-800/60 px-3 py-1 rounded-lg text-sm">
                <span className="text-orange-400 mr-2">Featured in</span>
                <span>{event.city || "Your City"}</span>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md"
              >
                <Star size={16} />
                <span className="text-xs">Favorite</span>
              </motion.button>
            </div>

            <motion.h1 variants={itemVariants} className="text-4xl font-bold">
              {event.title}
            </motion.h1>

            {/* Date and Time Section */}
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 text-orange-400">
                <Calendar size={24} />
              </div>
              <div>
                <div className="font-medium text-lg">{event.date || "Date TBD"}</div>
                <div className="text-gray-300">
                  {event.time || "Time not provided"}
                </div>
              </div>
            </motion.div>

            {/* Location Section */}
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 text-orange-400">
                <MapPin size={24} />
              </div>
              <div>
                <div className="font-medium flex items-center">
                  <span>{event.location || "Location not provided"}</span>
                  <ExternalLink className="ml-1" size={16} />
                </div>
                <div className="text-gray-300">{event.address || event.location}</div>
              </div>
            </motion.div>

            {/* Registration Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700/50"
            >
              <h3 className="font-medium text-xl mb-4">Registration</h3>
              <div className="flex items-start space-x-3 pb-4 border-b border-gray-700">
                <AlertCircle className="text-orange-400 mt-1" size={20} />
                <div>
                  <div className="font-medium">Approval Required</div>
                  <div className="text-gray-300 text-sm">Your registration is subject to approval by the host.</div>
                </div>
              </div>

              <div className="pt-4 pb-6">
                <p>Welcome! To join the event, please register below.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-lg"
                onClick={() =>
                  event.link
                    ? (window.location.href = event.link)
                    : alert("No registration link provided")
                }
              >
                Register Now
              </motion.button>
            </motion.div>

            {/* About Event */}
            <motion.div variants={itemVariants} className="space-y-4 bg-gray-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-medium flex items-center">
                <Info size={18} className="mr-2 text-orange-400" />
                About Event
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {event.description || "No description provided."}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}