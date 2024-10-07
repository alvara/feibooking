import type { Access } from 'payload/config';

export const isAdminOrOwnerOrManagerOrPublished: Access = ({ req: { user } }) => {
  //  Check if user has the 'admin' role
  if (user && user.role === 'admin') {
    return true;
  }

  return false;
};
