import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Clock, Phone, Mail, ArrowLeft, Heart, Edit, Trash2 } from 'lucide-react'

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingEvent, setIsLoadingEvent] = useState(true)

  useEffect(() => {
    // Load event from localStorage
    const events = JSON.parse(localStorage.getItem('swiftMeetEvents') || '[]')
    const foundEvent = events.find(e => e.id === parseInt(id))
    
    if (foundEvent) {
      setEvent(foundEvent)
    } else {
      // If event not found, redirect to events page
      navigate('/events')
    }
    setIsLoadingEvent(false)
  }, [id, navigate])

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      // Update event in localStorage
      const events = JSON.parse(localStorage.getItem('swiftMeetEvents') || '[]')
      const updatedEvents = events.map(e => {
        if (e.id === parseInt(id)) {
          return { ...e, volunteers: e.volunteers + 1 }
        }
        return e
      })
      localStorage.setItem('swiftMeetEvents', JSON.stringify(updatedEvents))
      
      // Update local state
      setEvent(prev => ({ ...prev, volunteers: prev.volunteers + 1 }))
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
      // Update event in localStorage
      const events = JSON.parse(localStorage.getItem('swiftMeetEvents') || '[]')
      const updatedEvents = events.map(e => {
        if (e.id === parseInt(id)) {
          return { ...e, volunteers: Math.max(0, e.volunteers - 1) }
        }
        return e
      })
      localStorage.setItem('swiftMeetEvents', JSON.stringify(updatedEvents))
      
      // Update local state
      setEvent(prev => ({ ...prev, volunteers: Math.max(0, prev.volunteers - 1) }))
      setIsSignedUp(false)
      
      alert('Successfully cancelled your sign-up.')
    } catch (error) {
      alert('Failed to cancel sign-up. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEvent = () => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      const events = JSON.parse(localStorage.getItem('swiftMeetEvents') || '[]')
      const updatedEvents = events.filter(e => e.id !== parseInt(id))
      localStorage.setItem('swiftMeetEvents', JSON.stringify(updatedEvents))
      navigate('/events')
    }
  }

  if (isLoadingEvent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
        <Link to="/events" className="btn-primary">
          Back to Events
        </Link>
      </div>
    )
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
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
              <button 
                onClick={handleDeleteEvent}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete Event"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Event Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{event.startTime} - {event.endTime}</span>
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
              {event.longDescription && (
                <div className="whitespace-pre-line">{event.longDescription}</div>
              )}
            </div>
          </div>

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
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
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Event Coordinator</p>
                <p className="text-gray-600">{event.contactName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${event.contactEmail}`} className="text-blue-600 hover:text-blue-700">
                  {event.contactEmail}
                </a>
              </div>
              {event.contactPhone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a href={`tel:${event.contactPhone}`} className="text-blue-600 hover:text-blue-700">
                    {event.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          {event.address && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="space-y-2">
                <p className="text-gray-600">{event.address}</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          )}

          {/* Event Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{event.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Organization:</span>
                <span className="font-medium">{event.organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{new Date(event.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail 