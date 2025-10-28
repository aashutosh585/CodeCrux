import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../contexts/AppContext';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { backendUrl, isLoggedIn, userData } = useContext(AppContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sheets, setSheets] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [activeTab, setActiveTab] = useState('sheets');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      checkAdminAccess();
    }
  }, [isLoggedIn]);

  const checkAdminAccess = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/check`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData._id
        })
      });
      const data = await response.json();
      if (data.success && data.isAdmin) {
        setIsAdmin(true);
        loadData();
      } else {
        toast.error('Access denied. Admin only.');
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      toast.error('Error checking admin access');
    }
  };

  const loadData = async () => {
    try {
      // Load sheets
      const sheetsResponse = await fetch(`${backendUrl}/api/admin/sheets`, {
        credentials: 'include'
      });
      const sheetsData = await sheetsResponse.json();
      if (sheetsData.success) {
        setSheets(sheetsData.sheets);
      }

      // Load tutorials
      const tutorialsResponse = await fetch(`${backendUrl}/api/admin/tutorials`, {
        credentials: 'include'
      });
      const tutorialsData = await tutorialsResponse.json();
      if (tutorialsData.success) {
        setTutorials(tutorialsData.tutorials);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error loading data');
    }
  };

  const handleAdd = () => {
    setFormData({});
    setEditingItem(null);
    setShowAddForm(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item._id);
    setShowAddForm(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const endpoint = type === 'sheet' ? 'sheets' : 'tutorials';
      const response = await fetch(`${backendUrl}/api/admin/${endpoint}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success(`${type} deleted successfully`);
        loadData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Error deleting ${type}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = activeTab === 'sheets' ? 'sheets' : 'tutorials';
      const isEdit = editingItem !== null;
      const url = isEdit 
        ? `${backendUrl}/api/admin/${endpoint}/${editingItem}`
        : `${backendUrl}/api/admin/${endpoint}`;
      
      // Include userId in the request body
      const requestData = {
        ...formData,
        userId: userData._id
      };
      
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success(`${activeTab.slice(0, -1)} ${isEdit ? 'updated' : 'added'} successfully`);
        setShowAddForm(false);
        loadData();
        setFormData({}); // Clear form data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access admin dashboard</h2>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('sheets')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'sheets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sheets ({sheets.length})
            </button>
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'tutorials'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tutorials ({tutorials.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Add Button */}
      <div className="mb-6">
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeTab === 'sheets' ? 'Sheet' : 'Tutorial'}</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author/Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeTab === 'sheets' ? sheets : tutorials).map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {activeTab === 'sheets' ? item.author : item.instructor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, activeTab.slice(0, -1))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {editingItem ? 'Edit' : 'Add'} {activeTab === 'sheets' ? 'Sheet' : 'Tutorial'}
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    rows="3"
                  />
                </div>
                
                {activeTab === 'sheets' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Author</label>
                      <input
                        type="text"
                        required
                        value={formData.author || ''}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                      <select
                        required
                        value={formData.difficulty || ''}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Mixed">Mixed</option>
                        <option value="Beginner to Advanced">Beginner to Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Problems</label>
                      <input
                        type="number"
                        required
                        value={formData.problems || ''}
                        onChange={(e) => setFormData({...formData, problems: parseInt(e.target.value)})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 2-3 months, 30 days"
                        value={formData.estimatedTime || ''}
                        onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Users Count</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 150000"
                        value={formData.users || ''}
                        onChange={(e) => setFormData({...formData, users: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Color</label>
                      <input
                        type="color"
                        required
                        value={formData.color || '#FF6B6B'}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Icon</label>
                      <select
                        required
                        value={formData.icon || ''}
                        onChange={(e) => setFormData({...formData, icon: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="">Select Icon</option>
                        <option value="🚀">🚀 Rocket</option>
                        <option value="❤️">❤️ Heart</option>
                        <option value="🎯">🎯 Target</option>
                        <option value="🔥">🔥 Fire</option>
                        <option value="📚">📚 Books</option>
                        <option value="⚡">⚡ Lightning</option>
                        <option value="💎">💎 Diamond</option>
                        <option value="🌟">🌟 Star</option>
                        <option value="🎪">🎪 Circus</option>
                        <option value="🏆">🏆 Trophy</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Link</label>
                      <input
                        type="url"
                        required
                        value={formData.link || ''}
                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g., DSA, Interview, Arrays"
                        value={formData.tags ? formData.tags.join(', ') : ''}
                        onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="popular"
                        checked={formData.popular || false}
                        onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                        className="mr-2"
                      />
                      <label htmlFor="popular" className="text-sm font-medium text-gray-700">Mark as Popular</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Instructor</label>
                      <input
                        type="text"
                        required
                        value={formData.instructor || ''}
                        onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        required
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Video URL</label>
                      <input
                        type="url"
                        required
                        value={formData.url || ''}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? 'Update' : 'Add'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;