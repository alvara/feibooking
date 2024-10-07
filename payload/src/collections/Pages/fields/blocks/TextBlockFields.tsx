import type { Block } from 'payload/types';
import { reactGridLayoutFields } from './ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const TextBlockFields: Block = {
  slug: 'TextBlock',
  // imageURL: `${img}`,
  // imageAltText: "Text Block Icon",
  labels: {
    plural: 'Text Blocks',
    singular: 'Text Block',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      admin: {
        placeholder: 'Featured In',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'style',
      label: 'Style',
      type: 'radio',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Boxed', value: 'box' },
      ],

      required: true,
    },
    ...reactGridLayoutFields,
  ],
};
