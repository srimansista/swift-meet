import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, MapPin, Calendar, Users, Heart } from 'lucide-react'

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const categories = [
    'all', 'Environment', 'Education', 'Hunger Relief', 'Healthcare', 
    'Animal Welfare', 'Community Development', 'Arts & Culture'
  ]

  const locations = [
    'all', 'Downtown', 'North Side', 'South Side', 'East Side', 'West Side'
  ]

  const events = [
    {
      id: 1,
      title: 'Community Garden Cleanup',
      organization: 'Green Earth Initiative',
      location: 'Central Park, Downtown',
      date: '2025-01-20',
      time: '9:00 AM - 12:00 PM',
      volunteers: 15,
      maxVolunteers: 25,
      category: 'Environment',
      description: 'Help maintain our community garden and learn about sustainable gardening practices.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Food Bank Distribution',
      organization: 'Local Food Bank',
      location: 'Community Center, North Side',
      date: '2025-01-22',
      time: '2:00 PM - 5:00 PM',
      volunteers: 8,
      maxVolunteers: 20,
      category: 'Hunger Relief',
      description: 'Assist with sorting and distributing food to families in need.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Senior Center Tech Help',
      organization: 'Digital Literacy Program',
      location: 'Golden Years Center, East Side',
      date: '2025-01-25',
      time: '10:00 AM - 2:00 PM',
      volunteers: 5,
      maxVolunteers: 10,
      category: 'Education',
      description: 'Help seniors learn to use smartphones, tablets, and computers.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Animal Shelter Care',
      organization: 'Paws & Hearts Shelter',
      location: 'Animal Shelter, West Side',
      date: '2025-01-23',
      time: '1:00 PM - 4:00 PM',
      volunteers: 12,
      maxVolunteers: 15,
      category: 'Animal Welfare',
      description: 'Help care for animals, clean facilities, and assist with adoptions.',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Hospital Volunteer Program',
      organization: 'City General Hospital',
      location: 'City General Hospital, South Side',
      date: '2025-01-24',
      time: '8:00 AM - 12:00 PM',
      volunteers: 3,
      maxVolunteers: 8,
      category: 'Healthcare',
      description: 'Assist with patient support, administrative tasks, and visitor guidance.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Community Art Workshop',
      organization: 'Creative Community Center',
      location: 'Art Center, Downtown',
      date: '2025-01-26',
      time: '3:00 PM - 6:00 PM',
      volunteers: 7,
      maxVolunteers: 12,
      category: 'Arts & Culture',
      description: 'Help facilitate art workshops for children and families.',
      image: 'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=400&h=250&fit=crop'
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesLocation = selectedLocation === 'all' || event.location.includes(selectedLocation)
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteering Events</h1>
        <p className="text-gray-600">Find opportunities to make a difference in your community</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input-field"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </p>
        <div className="flex items-center space-x-2 text-gray-500">
          <Filter className="h-4 w-4" />
          <span className="text-sm">Filtered by: {selectedCategory !== 'all' ? selectedCategory : 'All Categories'}</span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {event.category}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{event.volunteers}/{event.maxVolunteers}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900">
                {event.title}
              </h3>
              
              <p className="text-gray-600 text-sm">{event.organization}</p>
              
              <p className="text-gray-600 text-sm line-clamp-2">
                {event.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link 
                  to={`/events/${event.id}`}
                  className="btn-primary flex-1 text-center"
                >
                  Learn More
                </Link>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}

export default Events 