import type { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24, // 24 hours in seconds
  },
  hooks: {
    beforeChange: [
      function validateUserRoles(args) {
        if (args.operation === 'create') {
          const roles = args.data.roles || [];
          const allowedRoles = ['member', 'communityOrganizer', 'coach', 'sponsor'];
          const validRoles = roles.every((role) => allowedRoles.includes(role));

          if (!validRoles) {
            throw new Error(
              'Invalid role assignment. Only member, communityOrganizer, coach, or sponsor roles are allowed during registration.',
            );
          }
        }
        return args.data;
      },
    ],
  },
  access: {
    read: ({ req }) => {
      const admin = req.headers.referer && req.headers.referer.includes('/admin');

      if (admin) {
        // allow system admins to see all user records
        if (req.user.roles.includes('systemAdmin')) return true;

        // no access for anyone else in the admin panel
        return {
          id: {
            equals: req.user.id,
          },
        };
      }

      // For non-admin requests (OpenAPI), allow read access to all users
      return true;
    },
    create: ({ req }) => {
      const admin = req.headers.referer && req.headers.referer.includes('/admin');

      if (admin) {
        if (req.user.roles.includes('systemAdmin')) return true;

        // prevent user creation in payload admin panel
        return false;
      }

      // allow user creation in other contexts, such as API.
      // logic in beforeChange hook should prevent invalid roles
      return true;
    },
    delete: ({ req: { user } }) => {
      if (!user) return false;
      if (user.roles.includes('systemAdmin')) return true;
      return false;
    },
  },
  admin: {
    group: 'ADMIN',
    useAsTitle: 'email',
    components: {
      views: {},
    },
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Super Admin',
          value: 'superAdmin',
        },
        { label: 'system Admin', value: 'systemAdmin' },
        { label: 'Community Organizer', value: 'communityOrganizer' },
        { label: 'Coach', value: 'coach' },
        { label: 'Sponsor', value: 'sponsor' },
        { label: 'Member', value: 'member' },
      ],
      required: true,
      admin: {
        description: 'Select one or more roles for this user',
      },
      access: {
        read: ({ req }) => {
          const admin = req.headers.referer && req.headers.referer.includes('/admin');

          // only allow system admins to see all roles
          if (admin) {
            if (req.user.roles.includes('systemAdmin')) return true;
          }

          //
          return false;
        },

        update: ({ req: { user } }) => {
          if (!user) return false;
          if (user.roles.includes('systemAdmin')) return true;
          return false;
        },
      },
      defaultValue: ['member'],
    },
  ],
};
