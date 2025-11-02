export interface Event {
  id: string;
  title: string;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  date: string; // ISO 8601 format
  maxParticipants: number;
  currentParticipants: number;
  createdAt: string;
}

export interface CreateEventDTO {
  title: string;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  date: string;
  maxParticipants: number;
}

export interface EventQueryParams {
  location?: string;
  search?: string;
  userLat?: string;
  userLng?: string;
}

export interface EventWithDistance extends Event {
  distance?: number;
}

