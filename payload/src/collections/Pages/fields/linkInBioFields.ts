import type { Field } from 'payload/types';

export const linkInBioFields: Field[] = [
  {
    name: 'bioImage',
    label: 'Select a profile image or video',
    type: 'upload',
    relationTo: 'profileUploads',
    required: true,
    admin: {
      description: 'Upload an image that will be used as your profile picture in your bio.',
      condition: (data) => data.pageType === 'linkInBio',
    },
  },
  {
    name: 'bioName',
    label: 'Name',
    type: 'text',
    required: true,
    admin: {
      description:
        'Enter the name that will be displayed in your bio. Note that this is different from the username/handle, which is set in your profile settings.',
      condition: (data) => data.pageType === 'linkInBio',
    },
  },
  {
    name: 'bioTitle',
    label: 'Title',
    type: 'text',
    required: true,
    admin: {
      description: 'Enter the title or position that will be displayed in your bio.',
      condition: (data) => data.pageType === 'linkInBio',
    },
  },
  {
    name: 'bioLinks',
    label: 'Links',
    type: 'relationship',
    relationTo: 'links',
    required: true,
    admin: {
      description: 'Add the links that you want to share in your bio.',
      condition: (data) => data.pageType === 'linkInBio',
    },
  },
  {
    name: 'bioStyle',
    label: 'Select a style',
    type: 'radio',
    options: [
      { label: 'Style 1', value: 'style1' },
      { label: 'Style 2', value: 'style2' },
      { label: 'Style 3', value: 'style3' },
    ],
    required: true,
    admin: {
      description:
        'Choose a style for your bio page. Note that the overall brand (colors, font, logos, etc.) can be changed later from your profile settings.',
      condition: (data) => data.pageType === 'linkInBio',
    },
  },
];
