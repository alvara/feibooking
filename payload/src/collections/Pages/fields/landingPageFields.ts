import type { Field } from 'payload/types';
import { ulid } from 'ulid';

export const landingPageFields: Field[] = [
  {
    name: 'landingPage',
    label: 'Unique Identifier for Agency Page',
    type: 'text',
    required: false,
    admin: {
      description: 'Automatically generated unique identifier for each agency page',
      readOnly: true,
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [
        ({ operation }) => {
          if (operation === 'create') {
            return ulid();
          }
        },
      ],
    },
  },
];
