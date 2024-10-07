import type { Access } from 'payload/config';
import type { FieldAccess } from 'payload/types';

export const isPublic: Access | FieldAccess = () => {
  // allow public access
  return true;
};
