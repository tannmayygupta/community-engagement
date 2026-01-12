# EveCon 

**A Full-Stack College Event Management Platform**

EveCon is a modern web application designed to streamline event discovery and registration across college campuses. Built with React.js and Firebase, it solves the problem of fragmented event information by providing a centralized platform with role-based access control and regional filtering.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-vercel-url.vercel.app)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.23.0-orange)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Features

### For Students (Users)
- 🔍 **Event Discovery** - Browse and search events across campus with real-time updates
- 📅 **Smart Filtering** - Filter events by date, location, and category
- ⭐ **Favorites & Bookmarks** - Save events you're interested in
- 🎫 **Quick Registration** - One-click event registration with external links
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- 🔔 **Live Updates** - Real-time event changes using Firestore listeners
- 🗺️ **Regional Filtering** - Find events in your area or campus

### For Event Organizers (Admins)
- ➕ **Event Creation** - Intuitive interface for creating events with all details
- 📊 **Event Management Dashboard** - View, edit, and delete events in real-time
- 🎯 **Role-Based Access Control** - Secure admin dashboard with protected routes
- 🔔 **Real-time Updates** - Live event updates using Firestore
- 📝 **Event Details Management** - Add title, description, date, time, location, and registration links
- 🗑️ **Event Deletion** - Remove outdated or cancelled events

### Technical Highlights
- 🔐 **Dual Authentication** - Email/Password and Google OAuth integration
- 🗄️ **Cloud Database** - Firebase Firestore for real-time data synchronization
- 🎨 **Modern UI/UX** - Framer Motion animations with Tailwind CSS styling
- ⚡ **Fast Performance** - Optimized builds and lazy loading
- 🌐 **Production Ready** - Deployed on Vercel with CI/CD integration
- 🛡️ **Secure** - Firebase security rules and authentication middleware
- 📦 **Modular Architecture** - Clean component-based structure

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI Framework |
| React Router DOM | 7.4.1 | Client-side routing |
| Tailwind CSS | 4.1.4 | Styling framework |
| Framer Motion | 12.7.4 | Animations |
| Lucide React | 0.501.0 | Icon library |
| Axios | 1.13.2 | HTTP client |

### Backend & Services
| Service | Purpose |
|---------|---------|
| Firebase Authentication | User authentication (Email/Password, Google OAuth) |
| Cloud Firestore | NoSQL real-time database |
| Firebase Hosting | Static file hosting |

### Development Tools
- **Build Tool:** Create React App (React Scripts 5.0.0)
- **Version Control:** Git & GitHub
- **Deployment:** Vercel
- **Package Manager:** npm

---

## 📸 Screenshots

> *Add screenshots here once you have them*

### Landing Page
*Modern authentication interface with email/password and Google sign-in options*

### User Dashboard
*Browse events with smart filtering, search capabilities, and categorized sections*

### Admin Dashboard
*Create and manage events with an intuitive glassmorphic interface*

### Event Details Page
*Detailed event information with registration links and host details*

### User Profile
*Manage user account information and preferences*

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Firebase Account** - [Sign up](https://firebase.google.com/)
- **Code Editor** - VS Code recommended

### Installation

Follow these steps to set up the project locally:

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/community-engagement.git
cd community-engagement
