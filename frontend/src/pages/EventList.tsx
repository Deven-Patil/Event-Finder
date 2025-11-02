import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, GetEventsParams } from '../api/events';
import { Event } from '../types/event';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { getUserLocation } from '../utils/geolocation';
import './EventList.css';

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: GetEventsParams = {};
      
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }
      
      if (locationFilter.trim()) {
        params.location = locationFilter.trim();
      }
      
      if (userLocation) {
        params.userLat = userLocation.lat;
        params.userLng = userLocation.lng;
      }

      const data = await getEvents(params);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchTerm, locationFilter, userLocation]);

  const handleGetLocation = async () => {
    try {
      setLocationError(null);
      const position = await getUserLocation();
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get location';
      setLocationError(message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && events.length === 0) {
    return <Loading />;
  }

  return (
    <div className="event-list-page">
      <header className="page-header">
        <h1>🎉 Event Finder</h1>
        <Link to="/events/new" className="create-button">
          + Create Event
        </Link>
      </header>

      <div className="filters-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">📍</span>
        </div>

        <div className="location-section">
          <button
            onClick={handleGetLocation}
            className="location-button"
            disabled={!!userLocation}
          >
            {userLocation ? '📍 Location Enabled' : '🌐 Use My Location'}
          </button>
          {userLocation && (
            <button
              onClick={() => setUserLocation(null)}
              className="clear-location-button"
            >
              Clear
            </button>
          )}
          {locationError && (
            <span className="location-error">{locationError}</span>
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchEvents} />}

      {!error && (
        <>
          {loading && <div className="loading-overlay">Refreshing...</div>}
          
          {events.length === 0 ? (
            <div className="empty-state">
              <p>No events found. Try adjusting your search filters.</p>
              <Link to="/events/new" className="create-link">
                Create the first event!
              </Link>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="event-card"
                >
                  <div className="event-card-header">
                    <h2>{event.title}</h2>
                    {event.distance !== undefined && (
                      <span className="distance-badge">
                        📍 {event.distance} km away
                      </span>
                    )}
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-details">
                    <div className="event-detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{event.location.name}</span>
                    </div>
                    <div className="event-detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="event-detail-item">
                      <span className="detail-icon">👥</span>
                      <span>
                        {event.currentParticipants} / {event.maxParticipants} participants
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

