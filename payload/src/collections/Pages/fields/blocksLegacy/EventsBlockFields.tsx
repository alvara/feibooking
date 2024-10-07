import type { Block } from 'payload/types';
// import img from "./hero.png";
// TODO: test lint error again here when fixing eslint
// import { MiniAppField } from "../../customFields/MiniAppField";

export const EventsBlockFields: Block = {
  slug: 'EventsBlock',
  // imageURL: `${img}`,
  // imageAltText: "Event Block Icon",
  labels: {
    plural: 'Events Blocks',
    singular: 'Event Block',
  },

  fields: [
    {
      name: 'style',
      label: 'Style',
      type: 'radio',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
        { label: 'Panel', value: 'panel' },
      ],

      admin: {
        components: {
          // Field: MiniAppField,
        },
      },
      required: true,
    },
  ],
};
