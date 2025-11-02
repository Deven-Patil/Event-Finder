import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventsRouter from './routes/events';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { eventStore } from './utils/eventStore';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/events', eventsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Seed some sample events for demo
if (process.env.NODE_ENV !== 'production') {
  eventStore.create({
    title: 'Tech Meetup',
    description: 'Join us for an evening of networking and tech talks',
    location: {
      name: 'San Francisco, CA',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    maxParticipants: 50,
  });

  eventStore.create({
    title: 'Music Festival',
    description: 'A weekend of amazing music and food',
    location: {
      name: 'Los Angeles, CA',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    maxParticipants: 500,
  });

  eventStore.create({
    title: 'Coding Workshop',
    description: 'Learn React and TypeScript from scratch',
    location: {
      name: 'New York, NY',
      latitude: 40.7128,
      longitude: -74.006,
    },
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    maxParticipants: 30,
  });

  console.log('Sample events seeded');
}

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api/events`);
});

