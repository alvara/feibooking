/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * payload
 * A blank template to get started with Payload
 * OpenAPI spec version: 0.0.1
 */
import type { _EventsVersionVersionStatus } from './_eventsVersionVersionStatus';
import type { EventsVersionVersionAttendeesItem } from './eventsVersionVersionAttendeesItem';
import type { EventsVersionVersionEventBannerImagesItem } from './eventsVersionVersionEventBannerImagesItem';
import type { EventsVersionVersionHostItem } from './eventsVersionVersionHostItem';

export type EventsVersionVersion = {
  /** @nullable */
  _status?: _EventsVersionVersionStatus;
  /** @nullable */
  attendees?: EventsVersionVersionAttendeesItem[] | null;
  /** @nullable */
  eventBannerImages?: EventsVersionVersionEventBannerImagesItem[] | null;
  eventDescription: string;
  eventId: string;
  eventTitle: string;
  host: EventsVersionVersionHostItem[];
};
