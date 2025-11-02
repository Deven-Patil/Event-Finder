import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../api/events';
import { Event } from '../types/event';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { getUserLocation } from '../utils/geolocation';
import './EventDetail.css';

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const eventData = await getEventById(
          id,
          userLocation?.lat,
          userLocation?.lng
        );
        setEvent(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, userLocation]);

  const handleGetLocation = async () => {
    try {
      const position = await getUserLocation();
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (err) {
      alert('Failed to get location: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !event) {
    return (
      <div className="event-detail-page">
        <ErrorMessage
          message={error || 'Event not found'}
          onRetry={() => navigate('/')}
        />
      </div>
    );
  }

  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="event-detail-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Events
      </button>

      <div className="event-detail-card">
        <div className="event-header">
          <h1>{event.title}</h1>
          {event.distance !== undefined && (
            <div className="distance-info">
              📍 {event.distance} km away
            </div>
          )}
        </div>

        <div className="event-description-full">
          <h3>Description</h3>
          <p>{event.description}</p>
        </div>

        <div className="event-info-grid">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div className="info-content">
              <strong>Location</strong>
              <p>{event.location.name}</p>
              {!userLocation && (
                <button
                  onClick={handleGetLocation}
                  className="small-location-button"
                >
                  Calculate Distance
                </button>
              )}
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">📅</span>
            <div className="info-content">
              <strong>Date & Time</strong>
              <p>{formatDate(event.date)}</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">👥</span>
            <div className="info-content">
              <strong>Participants</strong>
              <p>
                {event.currentParticipants} / {event.maxParticipants}
              </p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${participationPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-metadata">
          <p>Event ID: {event.id}</p>
          <p>Created: {new Date(event.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

