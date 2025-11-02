export interface Event {
  id: string;
  title: string;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  createdAt: string;
  distance?: number;
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

