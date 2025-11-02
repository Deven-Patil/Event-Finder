import { Router, Request, Response } from 'express';
import { eventStore } from '../utils/eventStore';
import { calculateDistance } from '../utils/distance';
import { validateCreateEvent } from '../middleware/validator';
import { CreateEventDTO, EventQueryParams, EventWithDistance } from '../types/event';
import { AppError } from '../middleware/errorHandler';

const router = Router();

/**
 * POST /api/events
 * Create a new event
 */
router.post('/', validateCreateEvent, (req: Request, res: Response, next) => {
  try {
    const eventData: CreateEventDTO = {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      location: {
        name: req.body.location.name.trim(),
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      date: req.body.date,
      maxParticipants: req.body.maxParticipants,
    };

    const event = eventStore.create(eventData);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/events
 * Get all events with optional filters
 */
router.get('/', (req: Request, res: Response, next) => {
  try {
    const query = req.query as EventQueryParams;
    let events = eventStore.getAll({
      location: query.location,
      search: query.search,
    });

    // If user coordinates provided, calculate distances and sort by distance
    if (query.userLat && query.userLng) {
      const userLat = parseFloat(query.userLat);
      const userLng = parseFloat(query.userLng);

      if (!isNaN(userLat) && !isNaN(userLng)) {
        const eventsWithDistance: EventWithDistance[] = events.map((event) => ({
          ...event,
          distance: calculateDistance(
            userLat,
            userLng,
            event.location.latitude,
            event.location.longitude
          ),
        }));

        // Sort by distance (closest first)
        eventsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        res.json({
          success: true,
          data: eventsWithDistance,
          count: eventsWithDistance.length,
        });
        return;
      }
    }

    res.json({
      success: true,
      data: events,
      count: events.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/events/:id
 * Get event details by ID
 */
router.get('/:id', (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const event = eventStore.getById(id);

    if (!event) {
      const error: AppError = new Error(`Event with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    // Calculate distance if user coordinates provided
    const query = req.query as { userLat?: string; userLng?: string };
    let eventWithDistance: EventWithDistance = { ...event };

    if (query.userLat && query.userLng) {
      const userLat = parseFloat(query.userLat);
      const userLng = parseFloat(query.userLng);

      if (!isNaN(userLat) && !isNaN(userLng)) {
        eventWithDistance = {
          ...eventWithDistance,
          distance: calculateDistance(
            userLat,
            userLng,
            event.location.latitude,
            event.location.longitude
          ),
        };
      }
    }

    res.json({
      success: true,
      data: eventWithDistance,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

