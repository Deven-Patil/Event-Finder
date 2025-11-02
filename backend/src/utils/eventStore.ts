import { Event, CreateEventDTO } from '../types/event';

/**
 * In-memory event store
 * In a production app, this would be replaced with a database
 */
class EventStore {
  private events: Event[] = [];
  private nextId = 1;

  /**
   * Create a new event
   */
  create(eventData: CreateEventDTO): Event {
    const event: Event = {
      id: (this.nextId++).toString(),
      ...eventData,
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
    };

    this.events.push(event);
    return event;
  }

  /**
   * Get all events, optionally filtered
   */
  getAll(query?: { location?: string; search?: string }): Event[] {
    let filtered = [...this.events];

    // Filter by location name (case-insensitive)
    if (query?.location) {
      const locationLower = query.location.toLowerCase();
      filtered = filtered.filter((event) =>
        event.location.name.toLowerCase().includes(locationLower)
      );
    }

    // Filter by search term (searches title and description)
    if (query?.search) {
      const searchLower = query.search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }

  /**
   * Get event by ID
   */
  getById(id: string): Event | undefined {
    return this.events.find((event) => event.id === id);
  }

  /**
   * Update event (for joining events, etc.)
   */
  update(id: string, updates: Partial<Event>): Event | undefined {
    const index = this.events.findIndex((event) => event.id === id);
    if (index === -1) return undefined;

    this.events[index] = { ...this.events[index], ...updates };
    return this.events[index];
  }
}

// Export singleton instance
export const eventStore = new EventStore();

