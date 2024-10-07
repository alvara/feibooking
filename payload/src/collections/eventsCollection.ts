import { CollectionConfig } from 'payload/types';
import slugify from 'slugify';

export const Events: CollectionConfig = {
  slug: 'events',

  // Enable versions, draft and restore
  versions: {
    maxPerDoc: 100,
    drafts: {
      autosave: false,
    },
  },

  admin: {
    group: 'DASHBOARD',
    useAsTitle: 'eventTitle',
    defaultColumns: ['eventTitle', 'date', 'location', 'host'],
    hideAPIURL: true,
  },
  access: {
    create: ({ req: { user } }) => {
      return Boolean(user);
    },
    read: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (user.roles.includes('systemAdmin')) return true;
      return false;
    },
    delete: function ({ req }) {
      if (!req.user) return false;
      if (req.user.roles.includes('systemAdmin')) return true;
      return false;
    },
  },
  fields: [
    {
      name: 'eventId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
        description: 'This will be used in the URL for this event',
      },
    },
    {
      name: 'eventBannerImages',
      type: 'array',
      maxRows: 5,
      labels: {
        singular: 'Event Banner Image',
        plural: 'Event Banner Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'imageUploads',
          required: true,
        },
      ],
    },
    {
      name: 'eventTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    // {
    //   name: 'eventDate',
    //   type: 'date',
    //   required: true,
    // },
    // {
    //   name: 'eventLocation',
    //   type: 'text',
    //   required: false,
    // },
    {
      name: 'eventDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'host',
      type: 'relationship',
      relationTo: 'communities',
      required: true,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'attendees',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data }) => {
        if (operation === 'create') {
          // data.host = req.user.id;

          if (!data.eventId) {
            data.eventId = await createEventId(data.eventTitle);
          }
        }
        return data;
      },
    ],
  },
};

async function createEventId(eventTitle: string): Promise<string> {
  const baseSlug = slugify(eventTitle, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  const { nanoid } = await import('nanoid/non-secure');
  const uniqueId = nanoid(12);
  return `${baseSlug}-${uniqueId}`;
}
