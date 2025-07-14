import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Calendar, Clock, Award, Settings, Edit } from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'Downtown, City',
    interests: ['Environment', 'Education', 'Community Development'],
    joinDate: '2024-06-15'
  })

  const [formData, setFormData] = useState(userData)

  const volunteerHistory = [
    {
      id: 1,
      eventTitle: 'Community Garden Cleanup',
      organization: 'Green Earth Initiative',
      date: '2025-01-15',
      hours: 3,
      status: 'completed'
    },
    {
      id: 2,
      eventTitle: 'Food Bank Distribution',
      organization: 'Local Food Bank',
      date: '2025-01-10',
      hours: 4,
      status: 'completed'
    },
    {
      id: 3,
      eventTitle: 'Senior Center Tech Help',
      organization: 'Digital Literacy Program',
      date: '2025-01-25',
      hours: 4,
      status: 'upcoming'
    }
  ]

  const stats = [
    { label: 'Events Completed', value: '12', icon: Calendar },
    { label: 'Total Hours', value: '48', icon: Clock },
    { label: 'Organizations Helped', value: '8', icon: Award },
    { label: 'Member Since', value: 'June 2024', icon: User }
  ]

  const handleSave = () => {
    setUserData(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(userData)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your volunteering history</p>
        </div>
        <button className="btn-secondary flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div className="flex justify-center mb-3">
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button onClick={handleSave} className="btn-primary">
                    Save Changes
                  </button>
                  <button onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Name</p>
                      <p className="text-gray-900">{userData.firstName} {userData.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-gray-900">{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-gray-900">{userData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-gray-900">{userData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Areas of Interest</h2>
            <div className="flex flex-wrap gap-2">
              {userData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Volunteer History */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Volunteer History</h2>
            <div className="space-y-4">
              {volunteerHistory.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{event.eventTitle}</h3>
                      <p className="text-sm text-gray-600">{event.organization}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.hours} hours</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/events" className="text-blue-600 hover:text-blue-700 font-medium">
                Find more events →
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/events" className="block w-full btn-primary text-center">
                Find Events
              </Link>
              <button className="w-full btn-secondary">
                Download Certificate
              </button>
              <button className="w-full btn-secondary">
                Share Profile
              </button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
            <p className="text-gray-600 text-sm mb-4">
              Based on your interests and past events, here are some opportunities you might enjoy:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">Animal Shelter Care</h4>
                <p className="text-xs text-gray-600">Paws & Hearts Shelter</p>
                <p className="text-xs text-gray-500">Jan 23 • 3 hours</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">Community Art Workshop</h4>
                <p className="text-xs text-gray-600">Creative Community Center</p>
                <p className="text-xs text-gray-500">Jan 26 • 3 hours</p>
              </div>
            </div>
            <Link to="/events" className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all recommendations →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 