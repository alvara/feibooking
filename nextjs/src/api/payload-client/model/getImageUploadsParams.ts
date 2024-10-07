/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * payload
 * A blank template to get started with Payload
 * OpenAPI spec version: 0.0.1
 */
import type { Where } from './where';

export type GetImageUploadsParams = {
  /**
   * number of levels to automatically populate relationships and uploads
   */
  depth?: number;
  /**
   * retrieves document(s) in a specific locale
   */
  locale?: string;
  /**
   * specifies a fallback locale if no locale value exists
   */
  'fallback-locale'?: string;
  /**
   * sort by field
   */
  sort?: string;
  /**
   * pass a where query to constrain returned documents (complex type, see documentation)
   */
  where?: Where;
  /**
   * limit the returned documents to a certain number
   */
  limit?: number;
  /**
   * get a specific page of documents
   */
  page?: number;
};
