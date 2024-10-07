import type { Block } from 'payload/types';
import { reactGridLayoutFields } from '../blocks/ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const HeroBlockFields: Block = {
  slug: 'HeroBlock', // required
  // imageURL: `${img}`,
  // imageAltText: "A nice thumbnail image to show what this block looks like",
  // interfaceName: "HeroBlockInterface", // optional
  fields: [
    {
      name: 'heroTitle',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'heroDescription',
      label: 'Description',
      type: 'text',
      required: false,
    },
    {
      name: 'bgVideoUrl',
      label: 'Background Video URL',
      type: 'text',
      required: false,
    },
    // {
    //   name: "primaryButton",
    //   label: "Button",
    //   type: "relationship",
    //   relationTo: "links",
    //   hasMany: false,
    //   admin: {
    //     allowCreate: true,
    //   },
    // },
    {
      name: 'heroTheme',
      label: 'Theme',
      type: 'radio',
      options: [
        { label: 'Bubble', value: 'bubble' },
        { label: 'Space', value: 'space' },
      ],
      required: true,
    },
    ...reactGridLayoutFields,
  ],
};
