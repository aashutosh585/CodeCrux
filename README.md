# 🚀 CodeCrux

<div align="center">

### *Your Ultimate DSA Learning Platform*

![CodeCrux](img/img.png)

[🚀 Live Demo](https://codecrux.vercel.app) • [📚 Documentation](#getting-started) • [🤝 Contributing](#contributing) • [🔧 Admin Dashboard](#admin-features)

</div>

---

## 🌟 About

CodeCrux is a **full-stack DSA learning platform** designed for coding interview preparation. It features **AI-powered mentorship**, **dynamic content management**, **progress tracking**, and **admin-controlled data**. Built with modern MERN stack architecture and Google Gemini AI integration.

## ✨ Features

**🎯 Dynamic Content Management**
- **Admin Dashboard** - Full CRUD operations for sheets and tutorials
- **Database-Driven** - All content stored in MongoDB with real-time updates
- **Progress Tracking** - ObjectId relationships for user completion status
- **Role-Based Access** - Admin-only content management (ashutoshmaurya585@gmail.com)

**📚 Learning Resources**
- **Popular DSA Sheets** - Striver's SDE, Love Babbar 450, NeetCode 150, Blind 75, etc.
- **Video Tutorials** - Curated programming tutorials with metadata
- **6-Stage Roadmap** - Structured learning path from basics to advanced
- **Search & Filter** - Advanced filtering by category, difficulty, and tags

**🤖 AI-Powered Mentorship**
- **Google Gemini AI** - 24/7 intelligent coding mentor
- **Persistent Chat History** - Conversations saved to user profile
- **Context-Aware** - AI understands your learning progress
- **Real-time Streaming** - Live AI responses with typing indicators

**📊 User Progress & Analytics**
- **Completion Tracking** - Mark sheets/tutorials as completed
- **Personal Dashboard** - Real-time progress statistics
- **Profile Management** - User data with completion history
- **Admin Access Button** - Quick admin panel access for authorized users

**🎨 Modern User Experience**
- **Dark/Light Themes** - Persistent theme preference
- **Responsive Design** - Mobile-first approach for all devices
- **Real-time Notifications** - Toast messages for user actions
- **Fast Performance** - Optimized bundle size and clean architecture

## 🏗️ Architecture & Tech Stack

**🎨 Frontend (React SPA)**

- **⚛️ React 19.1.0**: Modern React with hooks and context API
- **⚡ Vite**: Lightning-fast development server and optimized builds  
- **🎨 Tailwind CSS**: Utility-first responsive design
- **🧭 React Router DOM**: Client-side routing with protected routes
- **🔔 React Toastify**: Toast notifications for user feedback
- **🎯 Lucide React**: Consistent icon library
- **🌐 Axios**: HTTP client with cookie support
- **🤖 Google GenAI**: Direct Gemini AI chat integration

**🔧 Backend (Node.js API)**

- **🚀 Express.js 5.1.0**: RESTful API server with middleware
- **🗄️ MongoDB + Mongoose**: Document database with schema validation
- **� JWT Authentication**: Secure token-based auth with cookies
- **🔐 bcryptjs**: Password hashing and security
- **📧 Nodemailer**: Email verification and password reset
- **🍪 Cookie Parser**: HTTP cookie handling
- **🌐 CORS**: Cross-origin resource sharing
- **🔧 Nodemon**: Development auto-reload

**🗄️ Database Schema**

- **� User Model**: Profile, auth, progress tracking with ObjectId refs
- **📋 Sheet Model**: DSA sheets with metadata, tags, and ratings
- **🎥 Tutorial Model**: Video tutorials with instructor and duration info
- **� Chat History**: Persistent AI conversations per user

**🛡️ Security & Performance**

- **🔐 Role-Based Access**: Admin-only routes and operations
- **🔑 JWT + HTTP-Only Cookies**: Secure authentication flow
- **📧 Email Verification**: OTP-based account verification
- **⚡ Optimized Bundle**: Tree-shaking and code splitting
- **� Clean Architecture**: Separation of concerns and DRY principles

## 📁 Project Structure

```
CodeCrux/
├── client/                     # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI Components (14 files)
│   │   │   ├── ChatInput.jsx       # AI chat input interface
│   │   │   ├── ChatMessages.jsx    # AI chat message display
│   │   │   ├── Dashboard.jsx       # User progress dashboard
│   │   │   ├── SheetCard.jsx       # Practice sheet cards
│   │   │   ├── TutorialCard.jsx    # Video tutorial cards
│   │   │   └── ...                 # Navigation, search, etc.
│   │   ├── pages/              # Main Application Pages (11 files)
│   │   │   ├── AdminDashboard.jsx  # Content management interface
│   │   │   ├── MentorAI.jsx        # AI chat page
│   │   │   ├── Sheet.jsx           # Practice sheets listing
│   │   │   ├── Tutorials.jsx       # Video tutorials listing
│   │   │   ├── Profile.jsx         # User profile & progress
│   │   │   └── ...                 # Auth, home, roadmap pages
│   │   ├── contexts/           # React Context Providers (2 files)
│   │   │   ├── AppContext.jsx      # Global state & API calls
│   │   │   └── DarkModeContext.jsx # Theme management
│   │   ├── hooks/              # Custom React Hooks (1 file)
│   │   │   └── useAIMentor.js      # AI chat functionality
│   │   ├── data/               # Static Data (1 file)
│   │   │   └── RoadmapData.jsx     # Learning roadmap structure
│   │   └── assets/             # Images, icons, utilities (10 files)
│   └── package.json
├── server/                     # Express Backend API
│   ├── controllers/            # Business Logic Controllers (4 files)
│   │   ├── authController.js       # Authentication logic
│   │   ├── userController.js       # User data management
│   │   ├── adminController.js      # Admin CRUD operations
│   │   └── publicController.js     # Public data endpoints
│   ├── models/                 # MongoDB Schemas (3 files)
│   │   ├── userModel.js           # User schema with progress refs
│   │   ├── sheetModel.js          # Practice sheet schema
│   │   └── tutorialModel.js       # Tutorial video schema
│   ├── routes/                 # API Route Definitions (4 files)
│   │   ├── authRoutes.js          # Authentication endpoints
│   │   ├── userRoutes.js          # User data endpoints
│   │   ├── adminRoutes.js         # Admin-only endpoints
│   │   └── publicRoutes.js        # Public data endpoints
│   ├── middleware/             # Custom Middleware (1 file)
│   │   └── userAuth.js            # JWT authentication middleware
│   ├── config/                 # Configuration Files (2 files)
│   │   ├── mongodb.js             # Database connection
│   │   └── nodemailer.js          # Email service config
│   ├── server.js               # Express server entry point
│   ├── package.json
│   └── API_DOCUMENTATION.md    # Complete API reference
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+) - JavaScript runtime
- **MongoDB** (local installation or MongoDB Atlas cloud)
- **Google Gemini API Key** - For AI chat functionality
- **Email Service** - Gmail SMTP or similar for auth emails

### Quick Start

1. **Clone & Setup**
```bash
git clone https://github.com/aashutosh585/CodeCrux.git
cd CodeCrux

# Install all dependencies
npm run install:all   # or install manually below
```

2. **Manual Installation**
```bash
# Backend dependencies
cd server && npm install

# Frontend dependencies  
cd ../client && npm install
```

3. **Environment Configuration**

**Backend Environment** (`server/.env`):
```env
# Database
MONGODB_URI=mongodb://localhost:27017/codecrux

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Email Service (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Server Configuration
PORT=4000
NODE_ENV=development
```

**Frontend Environment** (`client/.env`):
```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:4000

# Google Gemini AI API Key
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

4. **Database Setup**
```bash
# Start MongoDB service (if local)
# Windows: net start MongoDB
# macOS: brew services start mongodb
# Linux: sudo systemctl start mongod

# MongoDB will automatically create collections on first run
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend API (Port 4000)
cd server && npm start

# Terminal 2 - Frontend React App (Port 5173)  
cd client && npm run dev
```

6. **Access Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Documentation**: server/API_DOCUMENTATION.md

## � API Reference

### 🔐 Authentication Routes (`/api/auth`)
```
POST   /register          # User registration with email verification
POST   /login             # User login with JWT token
POST   /logout            # User logout and token cleanup
GET    /is-auth           # Check current authentication status
POST   /send-verify-otp   # Send email verification OTP
POST   /verify-otp        # Verify email with OTP code
POST   /send-reset-otp    # Send password reset OTP
POST   /reset-password    # Reset password with OTP
```

### 👤 User Routes (`/api/user`) - *Requires Authentication*
```
GET    /data              # Get user profile and progress data
POST   /chat/message      # Save individual AI chat message
POST   /chat/history      # Bulk save chat conversation
DELETE /chat/history      # Clear user's chat history
POST   /toggle-sheet      # Toggle sheet completion status
POST   /toggle-tutorial   # Toggle tutorial completion status
```

### 🛡️ Admin Routes (`/api/admin`) - *Admin Only*
```
POST   /check             # Verify admin access permissions
GET    /sheets            # Get all sheets (admin view)
POST   /sheets            # Create new practice sheet
PUT    /sheets/:id        # Update existing sheet
DELETE /sheets/:id        # Delete practice sheet
GET    /tutorials         # Get all tutorials (admin view)
POST   /tutorials         # Create new tutorial
PUT    /tutorials/:id     # Update existing tutorial
DELETE /tutorials/:id     # Delete tutorial
```

### 🌐 Public Routes (`/api/public`) - *No Authentication*
```
GET    /sheets            # Get all published practice sheets
GET    /tutorials         # Get all published video tutorials
```

> **📋 Complete API Documentation**: See `server/API_DOCUMENTATION.md` for detailed request/response schemas

## 🎯 Core Features & Implementation

### 🔧 Admin Features
**Admin Dashboard** (`AdminDashboard.jsx`)
- **Content Management**: Full CRUD operations for sheets and tutorials
- **Role-Based Access**: Only `ashutoshmaurya585@gmail.com` can access admin panel
- **Real-time Updates**: Changes reflect immediately across the platform
- **Data Validation**: Form validation with error handling and success notifications

**Access Method**: 
- Login with admin email → Go to Profile → Click "Admin Dashboard" button

### 🤖 AI Integration
**AI Mentor System** (`MentorAI.jsx` + `useAIMentor.js`)
- **Google Gemini AI**: Real-time chat with streaming responses
- **Persistent History**: All conversations saved to user profile
- **Context Awareness**: AI understands your learning progress and completed items
- **Error Handling**: Graceful fallbacks and retry mechanisms

### 📊 Progress System
**User Progress Tracking**
- **ObjectId Relationships**: MongoDB references between users and completed content
- **Real-time Updates**: Instant progress reflection across dashboard and profile
- **Toggle Completion**: Mark sheets/tutorials as done with one click
- **Analytics**: Dashboard shows completed items, chat history count, and total progress

### 🗄️ Database Architecture
**Dynamic Content Management**
- **Sheet Model**: Title, description, author, difficulty, problems count, rating, tags, etc.
- **Tutorial Model**: Instructor, duration, thumbnail, URL, student count, level, etc.
- **User Model**: Profile data with ObjectId arrays referencing completed sheets/tutorials
- **Populated Queries**: Efficient data fetching with MongoDB population

## 🔧 Development Scripts

**Frontend (Client)**
```bash
npm run dev        # Start Vite development server (http://localhost:5173)
npm run build      # Build optimized production bundle
npm run preview    # Preview production build locally
npm run lint       # Run ESLint code analysis
```

**Backend (Server)**
```bash
npm start          # Start production server
npm run dev        # Start with nodemon auto-reload
```

**Root Scripts**
```bash
npm run install:all    # Install dependencies for both client and server
npm run dev:full      # Start both frontend and backend concurrently
npm run build:all     # Build both applications for production
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment (Railway/Render/Heroku)
```bash
cd server  
# Set environment variables in hosting platform
# Deploy with Node.js runtime
```

### Environment Variables for Production
```env
# Backend Production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codecrux
JWT_SECRET=your-production-jwt-secret-32-chars-minimum
EMAIL_USER=your-production-email@domain.com
EMAIL_PASS=your-production-email-password
PORT=4000
NODE_ENV=production

# Frontend Production  
VITE_BACKEND_URL=https://your-backend-domain.com
VITE_GEMINI_API_KEY=your-production-gemini-key
```

## 🛠️ Development Workflow

### Code Quality Standards
- **ESLint Configuration**: Consistent code formatting and error detection
- **Component Structure**: Functional components with hooks pattern
- **Clean Architecture**: Separation of concerns (controllers, models, routes)
- **Error Handling**: Comprehensive try-catch blocks with user-friendly messages

### Database Development
```bash
# Access MongoDB shell (if using local MongoDB)
mongo codecrux

# Useful queries for development
db.users.find().pretty()           # View all users
db.sheets.find().pretty()          # View all practice sheets  
db.tutorials.find().pretty()       # View all tutorials
db.users.findOne({email: "admin@example.com"}) # Find specific user
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
```bash
git clone https://github.com/your-username/CodeCrux.git
cd CodeCrux
```

2. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
# Examples: feature/admin-bulk-import, feature/progress-analytics
```

3. **Development Setup**
```bash
npm run install:all    # Install dependencies
npm run dev:full       # Start both servers
```

4. **Make Changes & Test**
- Follow existing code patterns
- Test both frontend and backend changes
- Ensure admin functionality works
- Verify AI chat integration

5. **Commit & Push**
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

6. **Create Pull Request**
- Describe your changes clearly
- Include screenshots if UI changes
- Reference any related issues

### Contribution Areas
- 🎨 **UI/UX Improvements**: Better responsive design, animations
- 🤖 **AI Features**: Enhanced chat capabilities, smart recommendations  
- 📊 **Analytics**: Advanced progress tracking, learning insights
- 🔧 **Admin Tools**: Bulk operations, content moderation
- 📚 **Content**: More DSA sheets, tutorial curation
- 🐛 **Bug Fixes**: Performance optimizations, error handling

## 👨‍💻 Author & Maintainer

**Ashutosh Maurya**
- 🌐 GitHub: [@aashutosh585](https://github.com/aashutosh585)
- 📧 Email: ashutoshmaurya585@gmail.com  
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/aashutosh585)
- 🐦 Twitter: [@aashutosh585](https://twitter.com/aashutosh585)

## 🎉 Acknowledgments & Credits

- **🤖 Google Gemini AI** - Powering the intelligent mentorship system
- **🗄️ MongoDB** - Flexible document database for dynamic content
- **⚛️ React Team** - Amazing frontend library and ecosystem
- **⚡ Vite** - Lightning-fast development experience
- **🎨 Tailwind CSS** - Beautiful utility-first styling
- **🚀 Open Source Community** - Inspiration and continuous learning

## 📈 Project Stats & Future Roadmap  

**Current Status**: ✅ **Production Ready**
- 🎯 **11 Pages** - Complete user journey from auth to admin
- 🧩 **14 Components** - Reusable, optimized UI components  
- 🔗 **19 API Endpoints** - Full CRUD operations with security
- 📊 **3 Database Models** - Efficient data relationships
- 🤖 **AI Integration** - Real-time chat with conversation history

**Upcoming Features** (v2.0):
- 📱 **Mobile App** - React Native version
- 🎮 **Gamification** - Points, badges, leaderboards
- 👥 **Community Features** - Discussion forums, peer learning
- 📈 **Advanced Analytics** - Learning patterns, recommendations
- 🔌 **API Integrations** - LeetCode sync, GitHub portfolio
- 🎨 **Themes** - Custom color schemes, personalization

<div align="center">

---

**🚀 Built with passion for the coding community**

[⭐ Star this repo](https://github.com/aashutosh585/CodeCrux) • [🐛 Report Issues](https://github.com/aashutosh585/CodeCrux/issues) • [💡 Request Features](https://github.com/aashutosh585/CodeCrux/issues) • [📖 Documentation](server/API_DOCUMENTATION.md)

**Made with ❤️ in India 🇮🇳**

</div>
</content>
</invoke>