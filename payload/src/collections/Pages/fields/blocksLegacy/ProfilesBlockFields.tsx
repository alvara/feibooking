import type { Block } from 'payload/types';
import { reactGridLayoutFields } from '../blocks/ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const ProfilesBlockFields: Block = {
  slug: 'profilesBlock',
  // imageURL: `${img}`,
  // imageAltText: "Image Block Icon",
  labels: {
    plural: 'Profiles Blocks',
    singular: 'Profile Block',
  },
  fields: [
    {
      name: 'title',
      label: 'Title (Optional)',
      admin: {
        placeholder: 'Featured In',
      },
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      label: 'Description (Optional)',
      type: 'text',
      required: false,
    },
    {
      name: 'textAlignment',
      label: 'Text Alignment',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'radio',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Slider', value: 'slider' },
      ],
      required: true,
    },
    {
      name: 'profiles', // required
      type: 'relationship', // required
      relationTo: 'profiles',
      hasMany: true,
    },
    ...reactGridLayoutFields,
  ],
};
