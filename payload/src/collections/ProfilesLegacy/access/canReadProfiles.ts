import type { AccessResult } from 'payload/config';
import type { Access } from 'payload/types';

export const canReadProfiles: Access = ({ req }): AccessResult => {
  console.log('canReadProfiles called');
  console.log('User:', req.user);
  console.log('Original URL:', req.originalUrl);

  // Check if it's an admin panel request
  const isAdminRequest = req.originalUrl?.includes('/admin');

  // For non-admin panel requests (API), allow public read access
  if (!isAdminRequest) {
    console.log('API request, allowing public access');
    return true;
  }

  // For admin panel requests
  if (req.user) {
    if (req.user.role === 'admin') {
      console.log('User is admin, allowing full access');
      return true;
    }

    if (req.user.role === 'user') {
      console.log('User role is "user", restricting access to owned/managed profiles');
      return {
        or: [
          {
            owner: {
              equals: req.user.id,
            },
          },
          {
            managers: {
              contains: req.user.id,
            },
          },
        ],
      };
    }
  }

  console.log('Access denied');
  return false;
};
