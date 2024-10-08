/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * payload
 * A blank template to get started with Payload
 * OpenAPI spec version: 0.0.1
 */
import type { _EventsStatus } from './_eventsStatus';
import type { EventsAttendeesItem } from './eventsAttendeesItem';
import type { EventsEventBannerImagesItem } from './eventsEventBannerImagesItem';
import type { EventsHostItem } from './eventsHostItem';

export interface Events {
  /** @nullable */
  _status?: _EventsStatus;
  /** @nullable */
  attendees?: EventsAttendeesItem[] | null;
  createdAt: string;
  /** @nullable */
  eventBannerImages?: EventsEventBannerImagesItem[] | null;
  eventDescription: string;
  eventId: string;
  eventTitle: string;
  host: EventsHostItem[];
  updatedAt: string;
}
