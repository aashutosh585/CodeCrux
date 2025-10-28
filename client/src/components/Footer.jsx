import React from 'react'
import { useNavigate } from 'react-router'
import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { 
  Code, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()

  return (
    <div>
      {/* Call to Action */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Ready to Start Your Coding Journey?
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            Join thousands of students who are already learning with CodeCrux. Start for free today!
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold text-lg flex items-center space-x-2 mx-auto group shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Crux</span>
                </span>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 max-w-md`}>
                Empowering the next generation of developers with AI-powered learning, interactive projects, and community support.
              </p>
              <div className="flex space-x-4">
                <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  <Github className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  <Twitter className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {['About Us', 'Courses', 'Pricing', 'Blog', 'Help Center'].map((link) => (
                  <li key={link}>
                    <button className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Contact
              </h3>
              <ul className="space-y-2">
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  support@codecrux.com
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  +1 (555) 123-4567
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              © 2025 CodeCrux. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} text-sm transition-colors duration-200`}>
                Privacy Policy
              </button>
              <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} text-sm transition-colors duration-200`}>
                Terms of Service
              </button>
              <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} text-sm transition-colors duration-200`}>
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
