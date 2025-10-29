// src/App.jsx
import { Routes, Route, Outlet } from 'react-router'
import { DarkModeProvider } from './contexts/DarkModeContext.jsx'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import MentorAI from './pages/MentorAI.jsx'
import Tutorials from './pages/Tutorials.jsx'
import RoadMap from './pages/RoadMap.jsx'
import Sheet from './pages/Sheet.jsx'
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Profile from './pages/Profile.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <DarkModeProvider>
    <ToastContainer />
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected/app routes */}
      <Route element={<Layout><Outlet /></Layout>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="mentor-ai" element={<MentorAI />} />
        <Route path="roadmap" element={<RoadMap />} />
        <Route path="sheet" element={<Sheet />} />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  </DarkModeProvider>
)

export default App
