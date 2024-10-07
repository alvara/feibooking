import type { User } from 'payload/auth';
import type { PayloadRequest } from 'payload/types';

type AdminOperationArgs = {
  req: PayloadRequest;
};

export const canAdminProfiles = () => {
  return async ({ req }: AdminOperationArgs): Promise<boolean> => {
    const user = req.user as User | undefined;

    // Allow full access for admin users
    if (user?.role === 'admin') {
      return true;
    }

    // For non-admin users, check if they are the owner or a manager of any profile
    if (user) {
      const { payload } = req;
      const count = await payload.find({
        collection: 'profiles',
        where: {
          or: [{ owner: { equals: user.id } }, { managers: { contains: user.id } }],
        },
        limit: 1,
      });

      // Allow access if the user owns or manages at least one profile
      return count.totalDocs > 0;
    }

    // Deny access for unauthenticated users
    return false;
  };
};
