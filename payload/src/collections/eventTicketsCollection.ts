import { CollectionConfig } from 'payload/types';

export const EventTickets: CollectionConfig = {
  slug: 'eventTickets',
  admin: {
    useAsTitle: 'ticketName',
    defaultColumns: ['ticketName', 'event', 'status', 'price', 'availableQuantity'],
  },
  fields: [
    {
      name: 'ticketName',
      type: 'text',
      required: true,
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Available', value: 'available' },
        { label: 'Sold Out', value: 'soldOut' },
        { label: 'Waitlist Open', value: 'waitlistOpen' },
        { label: 'Waitlist Closed', value: 'waitlistClosed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'availableQuantity',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'maxWaitlistSize',
      type: 'number',
      required: false,
      min: 0,
    },
    {
      name: 'currentWaitlistSize',
      type: 'number',
      required: false,
      min: 0,
      admin: {
        readOnly: true,
      },
    },
    // ... other fields ...
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (data.availableQuantity === 0 && data.status === 'available') {
            data.status = 'waitlistOpen';
          }
          if (data.currentWaitlistSize >= data.maxWaitlistSize && data.status === 'waitlistOpen') {
            data.status = 'waitlistClosed';
          }
        }
        return data;
      },
    ],
  },
};
