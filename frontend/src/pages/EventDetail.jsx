import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Users, Clock, Phone, Mail, ArrowLeft, Heart } from 'lucide-react'

const EventDetail = () => {
  const { id } = useParams()
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock event data - in real app this would come from API
  const event = {
    id: parseInt(id),
    title: 'Community Garden Cleanup',
    organization: 'Green Earth Initiative',
    location: 'Central Park, Downtown',
    address: '123 Main Street, Downtown, City, State 12345',
    date: '2025-01-20',
    time: '9:00 AM - 12:00 PM',
    volunteers: 15,
    maxVolunteers: 25,
    category: 'Environment',
    description: 'Join us for a morning of community service at our local garden! We\'ll be cleaning up the garden area, planting new flowers, and maintaining the existing plants. This is a great opportunity to learn about sustainable gardening practices while making a positive impact on our community.',
    longDescription: `Our community garden is a vital green space that provides fresh produce for local families and serves as an educational hub for sustainable gardening practices. 

During this event, volunteers will:
• Remove weeds and debris from garden beds
• Plant seasonal flowers and vegetables
• Prune existing plants and trees
• Clean and organize garden tools
• Learn about composting and organic gardening

No gardening experience is required! Our experienced gardeners will provide guidance and training. Please wear comfortable clothing and closed-toe shoes. We\'ll provide all necessary tools and equipment.

This event is perfect for individuals, families, and groups looking to make a positive environmental impact while learning new skills.`,
    requirements: [
      'Comfortable clothing and closed-toe shoes',
      'No gardening experience required',
      'All tools and equipment provided',
      'Water and snacks will be available'
    ],
    contact: {
      name: 'Sarah Johnson',
      email: 'sarah@greenearth.org',
      phone: '(555) 123-4567'
    },
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop'
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      // TODO: Integrate with backend API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSignedUp(true)
      alert('Successfully signed up for the event!')
    } catch (error) {
      alert('Failed to sign up. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSignUp = async () => {
    setIsLoading(true)
    try {
      // TODO: Integrate with backend API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSignedUp(false)
      alert('Successfully cancelled your sign-up.')
    } catch (error) {
      alert('Failed to cancel sign-up. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link 
        to="/events" 
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Events</span>
      </Link>

      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {event.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{event.title}</h1>
              <p className="text-lg text-gray-600 mt-1">{event.organization}</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
          </div>

          {/* Event Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{event.volunteers}/{event.maxVolunteers} volunteers</span>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="border-t pt-6">
            {isSignedUp ? (
              <div className="flex items-center justify-between">
                <div className="text-green-600 font-medium">
                  ✓ You're signed up for this event
                </div>
                <button
                  onClick={handleCancelSignUp}
                  disabled={isLoading}
                  className="btn-secondary"
                >
                  {isLoading ? 'Cancelling...' : 'Cancel Sign-up'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignUp}
                disabled={isLoading || event.volunteers >= event.maxVolunteers}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing up...' : 
                 event.volunteers >= event.maxVolunteers ? 'Event Full' : 'Sign Up for Event'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
            <div className="prose text-gray-600">
              <p className="mb-4">{event.description}</p>
              <div className="whitespace-pre-line">{event.longDescription}</div>
            </div>
          </div>

          {/* Requirements */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-2">
              {event.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Event Coordinator</p>
                <p className="text-gray-600">{event.contact.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${event.contact.email}`} className="text-blue-600 hover:text-blue-700">
                  {event.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href={`tel:${event.contact.phone}`} className="text-blue-600 hover:text-blue-700">
                  {event.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="space-y-2">
              <p className="text-gray-600">{event.address}</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Get Directions
              </button>
            </div>
          </div>

          {/* Similar Events */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Events</h3>
            <p className="text-gray-600 text-sm">
              Check out other {event.category.toLowerCase()} events in your area.
            </p>
            <Link 
              to="/events" 
              className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse all events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail 