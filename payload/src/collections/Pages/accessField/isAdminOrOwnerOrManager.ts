import type { Access } from 'payload/config';
import type { FieldAccess } from 'payload/types';

export const isAdminOrCreatedByOrManager: Access | FieldAccess = ({ req: { user } }) => {
  // Scenario #1 - admin can access
  if (user && user.role === 'admin') {
    return true;
  }

  // Scenario #2 - only users who are the owner or manager of the document can access
  if (user) {
    return {
      or: [
        {
          owner: {
            equals: user.id,
          },
        },
        {
          managers: {
            contains: user.id,
          },
        },
      ],
    };
  }

  // Scenario #3 - Disallow all others
  return false;
};
