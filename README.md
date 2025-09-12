# 🚀 CodeCrux

<div align="center">

![CodeCrux Frontend](Video/frontendIMG.png)

*A comprehensive learning platform for developers*

</div>

**CodeCrux** is a comprehensive learning platform designed for developers to master coding skills through curated tutorials, practice sheets, and AI-powered mentorship. Built with modern web technologies, it provides an interactive and personalized coding education experience.

## 📸 Application Screenshots

### Frontend Interface
![CodeCrux Frontend Interface](Video/frontendIMG.png)
*Beautiful, responsive user interface with modern design*

### AI Mentor Feature
![AI Mentor Assistant](Video/MentorAI.png)
*Intelligent AI-powered coding assistant for personalized learning*

## ✨ Features

### 🎯 Core Features
- **📚 Curated Tutorials**: Access to expertly selected coding tutorials across multiple programming languages
- **📝 Practice Sheets**: Handpicked collection of coding problems and exercises 
- **🤖 AI Mentor**: Intelligent chat-based coding assistant powered by Google's Gemini AI
- **📊 Progress Tracking**: Monitor your learning journey with comprehensive progress analytics
- **🔐 Secure Authentication**: Google OAuth integration with secure session management

### 🎨 User Experience
- **🌙 Dark/Light Mode**: Toggle between themes for comfortable viewing
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Live chat interactions and instant progress updates
- **🔍 Advanced Search**: Smart filtering and search across tutorials and sheets
- **💾 Persistent Storage**: Cloud-based storage for chat history and progress

### 🛠 Technical Features
- **🔄 Real-time Chat**: Streaming AI responses with MongoDB persistence
- **🏗 Modular Architecture**: Clean, reusable component structure
- **🔒 JWT Authentication**: Secure token-based authentication system
- **📧 Email Integration**: Email verification and password reset functionality
- **🌐 REST API**: Well-structured API endpoints with proper error handling

## 🏗 Tech Stack

### Frontend
- **Framework**: React 19.1.0 with Vite
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router 7.7.1
- **Notifications**: React Toastify
- **Markdown**: React Markdown with rehype-raw and remark-gfm
- **AI Integration**: @google/genai

### Backend
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Google OAuth 2.0
- **Security**: bcryptjs, JWT, cookie-parser
- **Email**: Nodemailer
- **Development**: Nodemon for auto-reload

### DevOps & Tools
- **Development Server**: Vite dev server
- **Linting**: ESLint
- **Version Control**: Git
- **Environment**: dotenv for configuration

## 📁 Project Structure

<div align="center">

### 📸 Visual Project Overview

| Frontend Interface | AI Mentor Feature |
|:---:|:---:|
| ![Frontend Interface](Video/frontendIMG.png) | ![AI Mentor](Video/MentorAI.png) |
| *React + Vite Frontend* | *AI-Powered Learning Assistant* |

</div>

```
CodeCrux/
├── 📁 Video/               # Application screenshots
│   ├── 🖼️ frontendIMG.png   # Frontend application screenshot
│   └── 🖼️ MentorAI.png      # AI Mentor feature screenshot
├── 📁 client/             # React frontend application
│   ├── 📁 public/         # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/ # Reusable UI components
│   │   ├── 📁 contexts/   # React context providers
│   │   ├── 📁 data/       # Static data and configurations
│   │   ├── 📁 hooks/      # Custom React hooks
│   │   ├── 📁 pages/      # Page components
│   │   └── 📁 assets/     # Images, icons, and media
│   ├── 📄 package.json
│   └── ⚙️ vite.config.js
├── 📁 server/             # Express.js backend application
│   ├── 📁 config/        # Database and service configurations
│   ├── 📁 controllers/   # Request handlers and business logic
│   ├── 📁 middleware/    # Custom middleware functions
│   ├── 📁 models/        # MongoDB data models
│   ├── 📁 routes/        # API route definitions
│   ├── 🔐 .env          # Environment variables
│   ├── 📄 package.json
│   └── 🚀 server.js     # Main server entry point
└── 📖 README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Google OAuth Credentials** (for authentication)
- **Google Gemini API Key** (for AI features)

### 📋 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aashutosh585/CodeCrux.git
   cd CodeCrux
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### ⚙️ Configuration

#### Server Environment (.env)
Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/codecrux
# or for MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/codecrux

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# Email Configuration (NodeMailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=4000
```

#### Client Environment
Create a `.env` file in the `client` directory:

```env
# Backend API
VITE_BACKEND_URL=http://localhost:4000

# Google Gemini AI
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### 🏃‍♂️ Running the Application

#### Development Mode

<div align="center">

**Watch the complete setup process:**

| Frontend Development | Backend Development |
|:---:|:---:|
| ![Frontend Setup](Video/frontendVIDEO.mp4) | ![Backend Setup](Video/backendVIDEO.mp4) |

</div>

1. **Start the backend server**
   ```bash
   cd server
   npm run server
   ```
   Server runs on `http://localhost:4000`

2. **Start the frontend application**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

#### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/is-auth` - Check authentication status
- `POST /api/auth/send-verify-otp` - Send email verification OTP
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/send-reset-otp` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password

### User Endpoints
- `GET /api/user/data` - Get user profile and chat history
- `POST /api/user/chat/message` - Save individual chat message
- `POST /api/user/chat/history` - Bulk save chat history
- `DELETE /api/user/chat/history` - Clear user chat history

## 🎯 Key Components

### 🖥️ Frontend Components
<details>
<summary>Click to expand frontend component details</summary>

- **Dashboard**: Main application dashboard with statistics and analytics
- **MentorAI**: AI-powered chat interface with streaming responses
- **Tutorials**: Interactive video tutorials with progress tracking
- **Sheet**: Coding practice sheets and problem sets
- **Profile**: User profile management and learning analytics
- **Navigation**: Responsive navbar with theme switching
- **Search & Filter**: Advanced filtering across content types

*See the frontend in action:*
![Frontend Demo](Video/frontendVIDEO.mp4)

</details>

### 🔧 Backend Architecture
<details>
<summary>Click to expand backend architecture details</summary>

- **User Model**: Authentication, profile management, and chat history persistence
- **Secure Authentication**: JWT-based sessions with Google OAuth integration
- **Chat Persistence**: MongoDB storage for AI conversations and user progress
- **RESTful APIs**: Well-structured endpoints with comprehensive error handling
- **Middleware**: Custom authentication and request validation middleware

*See the backend architecture:*
![Backend Demo](Video/backendVIDEO.mp4)

</details>

## 🔧 Development

### Available Scripts

#### Client Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

#### Server Scripts
```bash
npm run server     # Start with nodemon (development)
npm start          # Start production server
```

### Code Style
- **ESLint** configuration for consistent code style
- **Modular components** with single responsibility principle
- **Custom hooks** for reusable logic
- **Context providers** for state management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Ashutosh Maurya**
- GitHub: [@aashutosh585](https://github.com/aashutosh585)

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the AI mentor functionality
- **MongoDB** for robust data persistence
- **React & Vite** for excellent development experience
- **Tailwind CSS** for beautiful, responsive design
- **Lucide React** for comprehensive icon library

## 🔮 Future Enhancements

- 📊 Advanced analytics dashboard
- 👥 Collaborative coding features
- 🏆 Gamification and achievement system
- 📱 Mobile application
- 🎪 Code playground integration
- 🤝 Community features and forums

---

<div align="center">

## 📸 Application Showcase

### Frontend User Experience
![Frontend Application](Video/frontendIMG.png)
*Beautiful, responsive interface with dark/light mode support*

### AI Mentor Experience
![AI Mentor Feature](Video/MentorAI.png)
*Intelligent AI-powered coding assistant for personalized learning*

### Key Features Gallery

| Frontend Interface | AI Learning Assistant |
|:---:|:---:|
| ![Frontend](Video/frontendIMG.png) | ![Mentor AI](Video/MentorAI.png) |
| Modern, responsive design | Smart AI-powered guidance |

**Built with ❤️ for the coding community**

[⭐ Star this repo](https://github.com/aashutosh585/CodeCrux) | [🐛 Report Bug](https://github.com/aashutosh585/CodeCrux/issues) | [💡 Request Feature](https://github.com/aashutosh585/CodeCrux/issues)

</div>
