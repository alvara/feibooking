import type { Block } from 'payload/types';
import { reactGridLayoutFields } from './ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const TitleBlockFields: Block = {
  slug: 'TitleBlock',
  // imageURL: `${img}`,
  // imageAltText: "Text Block Icon",
  labels: {
    plural: 'Title Blocks',
    singular: 'Title Block',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitlePosition',
      label: 'Subtitle Position',
      type: 'radio',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Middle', value: 'middle' },
      ],
      defaultValue: 'left',
      required: false,
    },
    ...reactGridLayoutFields,
  ],
};
