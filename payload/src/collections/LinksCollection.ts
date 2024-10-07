import type { CollectionConfig } from 'payload/types';

export const Links: CollectionConfig = {
  slug: 'links',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Link',
    plural: 'Links',
  },
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      localized: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      // The hook is triggered before a change (create or update) operation is performed on a profile
      ({ req, operation, data }) => {
        // Check if the operation is a 'create' operation
        if (operation === 'create') {
          // If the request has a user (i.e., the user is authenticated)
          if (req.user) {
            // Set the 'createdBy' field of the profile to the ID of the authenticated user
            data.owner = req.user.id;
            // Return the modified data
            return data;
          }
        }
      },
    ],
  },
};
