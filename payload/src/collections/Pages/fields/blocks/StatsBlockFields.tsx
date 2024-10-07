import type { Block } from 'payload/types';
import { reactGridLayoutFields } from './ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const StatsBlockFields: Block = {
  slug: 'statsBlock',
  // imageURL: `${img}`,
  // imageAltText: "Image Block Icon",
  labels: {
    plural: 'Stats Blocks',
    singular: 'Stats Block',
  },
  fields: [
    {
      name: 'stats', // required
      type: 'array', // required
      label: 'Stats',
      labels: {
        singular: 'Stat',
        plural: 'Stats',
      },
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'data',
          label: 'Data',
          type: 'text',
          required: true,
        },
      ],
    },
    ...reactGridLayoutFields,
  ],
};
