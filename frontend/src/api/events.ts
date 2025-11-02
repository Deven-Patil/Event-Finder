import axios from 'axios';
import { Event, CreateEventDTO } from '../types/event';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GetEventsParams {
  location?: string;
  search?: string;
  userLat?: number;
  userLng?: number;
}

/**
 * Get all events with optional filters
 */
export async function getEvents(params?: GetEventsParams): Promise<Event[]> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.location) {
      queryParams.append('location', params.location);
    }
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    if (params?.userLat !== undefined && params?.userLng !== undefined) {
      queryParams.append('userLat', params.userLat.toString());
      queryParams.append('userLng', params.userLng.toString());
    }

    const response = await api.get<{ success: boolean; data: Event[] }>(
      `/events?${queryParams.toString()}`
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch events');
    }
    throw error;
  }
}

/**
 * Get event by ID
 */
export async function getEventById(
  id: string,
  userLat?: number,
  userLng?: number
): Promise<Event> {
  try {
    const queryParams = new URLSearchParams();
    
    if (userLat !== undefined && userLng !== undefined) {
      queryParams.append('userLat', userLat.toString());
      queryParams.append('userLng', userLng.toString());
    }

    const response = await api.get<{ success: boolean; data: Event }>(
      `/events/${id}?${queryParams.toString()}`
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch event');
    }
    throw error;
  }
}

/**
 * Create a new event
 */
export async function createEvent(eventData: CreateEventDTO): Promise<Event> {
  try {
    const response = await api.post<{ success: boolean; data: Event }>(
      '/events',
      eventData
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to create event');
    }
    throw error;
  }
}

