import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, CreateEventDTO } from '../api/events';
import { getUserLocation } from '../utils/geolocation';
import { ErrorMessage } from '../components/ErrorMessage';
import './CreateEvent.css';

export function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateEventDTO>({
    title: '',
    description: '',
    location: {
      name: '',
      latitude: 0,
      longitude: 0,
    },
    date: '',
    maxParticipants: 1,
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'locationName') {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          name: value,
        },
      }));
    } else if (name === 'latitude' || name === 'longitude') {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: parseFloat(value) || 0,
        },
      }));
    } else if (name === 'maxParticipants') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value, 10) || 1,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      const position = await getUserLocation();
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      }));
      
      // Try to reverse geocode to get location name
      // For simplicity, we'll use a generic name
      if (!formData.location.name) {
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            name: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          },
        }));
      }
    } catch (err) {
      alert('Failed to get location: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createEvent(formData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Events
      </button>

      <div className="create-event-card">
        <h1>Create New Event</h1>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">
              Event Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Tech Meetup"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Describe your event..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationName">
              Location Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="locationName"
              name="locationName"
              value={formData.location.name}
              onChange={handleChange}
              required
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="location-coordinates">
            <div className="form-group">
              <label htmlFor="latitude">
                Latitude <span className="required">*</span>
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.location.latitude || ''}
                onChange={handleChange}
                required
                step="any"
                min="-90"
                max="90"
                placeholder="e.g., 37.7749"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">
                Longitude <span className="required">*</span>
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.location.longitude || ''}
                onChange={handleChange}
                required
                step="any"
                min="-180"
                max="180"
                placeholder="e.g., -122.4194"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="location-button"
            disabled={locationLoading}
          >
            {locationLoading ? 'Getting Location...' : '🌐 Use My Current Location'}
          </button>

          <div className="form-group">
            <label htmlFor="date">
              Date & Time <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxParticipants">
              Maximum Participants <span className="required">*</span>
            </label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g., 50"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

