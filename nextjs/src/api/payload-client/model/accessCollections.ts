/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * payload
 * A blank template to get started with Payload
 * OpenAPI spec version: 0.0.1
 */
import type { AccessCollectionsCreate } from './accessCollectionsCreate';
import type { AccessCollectionsDelete } from './accessCollectionsDelete';
import type { AccessCollectionsFields } from './accessCollectionsFields';
import type { AccessCollectionsRead } from './accessCollectionsRead';
import type { AccessCollectionsUpdate } from './accessCollectionsUpdate';

export type AccessCollections = {
  [key: string]: {
    create: AccessCollectionsCreate;
    delete: AccessCollectionsDelete;
    fields: AccessCollectionsFields;
    read: AccessCollectionsRead;
    update: AccessCollectionsUpdate;
  };
};
