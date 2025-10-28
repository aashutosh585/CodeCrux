import React, { useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext.jsx";
import { useNavigate, useLocation } from "react-router";
import { Menu, X, Book, BarChart3, Settings, User, LogOut, Sparkles, Bot, Target, FileText, Brain } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: BarChart3, path: "/dashboard", color: "text-indigo-500" },
  { name: "AI Mentor", icon: Bot, path: "/mentor-ai", color: "text-purple-500" },
  { name: "RoadMap", icon: Book, path: "/RoadMap", color: "text-pink-500" },
  { name: "Tutorials", icon: Target, path: "/tutorials", color: "text-amber-500" },
  { name: "Sheet", icon: FileText, path: "/sheet", color: "text-cyan-500" },
];

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const activeClasses = isDarkMode ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" : "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 border border-green-200 shadow-lg";
  const inactiveClasses = isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  const renderButton = (item, extraClasses = "") => {
    const active = isActive(item.path);
    return (
      <button
        key={item.name}
        onClick={() => {
          navigate(item.path);
          setOpen(false);
        }}
        className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${active ? activeClasses : inactiveClasses} ${extraClasses}`}
      >
        <item.icon className={`w-5 h-5 mr-3 ${active ? "text-current" : `${item.color} group-hover:text-current`}`} />
        <span className="font-medium">{item.name}</span>
        {active && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
      </button>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} ${isDarkMode ? "bg-gray-800/95 border-gray-700/50" : "bg-white/95 border-gray-200/50"} backdrop-blur-xl border-r shadow-2xl`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>CodeCrux</h1>
              <p className="text-xs text-gray-400">AI Learning Platform</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => renderButton(item))}
        </nav>

        {/* User Section */}
        <div className={`p-4 border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-200/50"}`}>
          <div className="space-y-2">
            {renderButton({ name: "Profile", icon: User, path: "/profile" })}
            <button onClick={() => navigate("/settings")} className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-colors ${inactiveClasses}`}>
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium">Settings</span>
            </button>
            <button onClick={() => navigate("/")} className="w-full flex items-center px-4 py-3 text-left rounded-xl transition-colors text-green-400 hover:bg-green-50 hover:text-green-600">
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <header className={`backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between shadow-sm ${isDarkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-gray-200/50"}`}>
          <div className="flex items-center space-x-4">
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {navItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
              </h1>
              <p className="text-sm text-gray-500">Welcome back to your coding journey</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className={`p-2 rounded-xl transition-all duration-300 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-green-400" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}>
              <Sparkles className="w-5 h-5" />
            </button>
            <button onClick={() => navigate("/profile")} className={`p-2 rounded-xl transition-colors ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
              <User className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </header>
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
