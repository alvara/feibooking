/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * payload
 * A blank template to get started with Payload
 * OpenAPI spec version: 0.0.1
 */
import type { CommunitiesVersion } from './communitiesVersion';

export interface CommunitiesVersions {
  docs: CommunitiesVersion[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage?: number;
  page: number;
  pagingCounter: number;
  prevPage?: number;
  totalDocs: number;
  totalPages: number;
}
