import { Request, Response, NextFunction } from 'express';
import { CreateEventDTO } from '../types/event';
import { AppError } from './errorHandler';

/**
 * Validate event creation data
 */
export function validateCreateEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, location, date, maxParticipants } = req.body;

  // Check required fields
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    const error: AppError = new Error('Title is required and must be a non-empty string');
    error.statusCode = 400;
    return next(error);
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    const error: AppError = new Error('Description is required and must be a non-empty string');
    error.statusCode = 400;
    return next(error);
  }

  if (!location || typeof location !== 'object') {
    const error: AppError = new Error('Location is required and must be an object');
    error.statusCode = 400;
    return next(error);
  }

  if (!location.name || typeof location.name !== 'string' || location.name.trim().length === 0) {
    const error: AppError = new Error('Location name is required');
    error.statusCode = 400;
    return next(error);
  }

  if (typeof location.latitude !== 'number' || location.latitude < -90 || location.latitude > 90) {
    const error: AppError = new Error('Valid latitude (-90 to 90) is required');
    error.statusCode = 400;
    return next(error);
  }

  if (typeof location.longitude !== 'number' || location.longitude < -180 || location.longitude > 180) {
    const error: AppError = new Error('Valid longitude (-180 to 180) is required');
    error.statusCode = 400;
    return next(error);
  }

  if (!date || typeof date !== 'string') {
    const error: AppError = new Error('Date is required and must be a valid ISO 8601 string');
    error.statusCode = 400;
    return next(error);
  }

  // Validate date format
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    const error: AppError = new Error('Date must be a valid ISO 8601 date string');
    error.statusCode = 400;
    return next(error);
  }

  if (typeof maxParticipants !== 'number' || maxParticipants < 1) {
    const error: AppError = new Error('maxParticipants must be a number greater than 0');
    error.statusCode = 400;
    return next(error);
  }

  next();
}

