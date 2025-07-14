import { Link } from 'react-router-dom'
import { Heart, Users, MapPin, Calendar, ArrowRight } from 'lucide-react'

const Home = () => {
  const featuredEvents = [
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
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Food Bank Distribution',
      organization: 'Local Food Bank',
      location: 'Community Center',
      date: '2025-01-22',
      time: '2:00 PM - 5:00 PM',
      volunteers: 8,
      maxVolunteers: 20,
      category: 'Hunger Relief',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Senior Center Tech Help',
      organization: 'Digital Literacy Program',
      location: 'Golden Years Center',
      date: '2025-01-25',
      time: '10:00 AM - 2:00 PM',
      volunteers: 5,
      maxVolunteers: 10,
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop'
    }
  ]

  const stats = [
    { label: 'Active Volunteers', value: '2,847', icon: Users },
    { label: 'Events Completed', value: '156', icon: Calendar },
    { label: 'Organizations', value: '89', icon: Heart },
    { label: 'Cities Served', value: '12', icon: MapPin }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Local Volunteering Opportunities
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with your community through meaningful volunteer work. 
            Discover opportunities that match your interests and make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="btn-primary text-lg px-8 py-3">
              Browse Events
            </Link>
            <Link to="/register" className="btn-secondary text-lg px-8 py-3">
              Join Swift Meet
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
          <Link 
            to="/events" 
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
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
                  <span className="text-sm text-gray-500">
                    {event.volunteers}/{event.maxVolunteers} volunteers
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm">{event.organization}</p>
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
                <Link 
                  to={`/events/${event.id}`}
                  className="btn-primary w-full text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of volunteers who are already making an impact in their communities.
        </p>
        <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
          Get Started Today
        </Link>
      </section>
    </div>
  )
}

export default Home 