import type { Field } from 'payload/types';

export const reactGridLayoutFields: Field[] = [
  {
    label: 'RGL Layouts',
    type: 'collapsible',
    admin: {
      initCollapsed: false,
      condition: (data) => data.pageType === 'blockBuilderPage',
    },
    fields: [
      {
        name: 'md',
        type: 'group',
        fields: [
          { name: 'i', type: 'text', required: true },
          { name: 'x', type: 'number', required: true },
          { name: 'y', type: 'number', required: true },
          { name: 'w', type: 'number', required: true },
          { name: 'h', type: 'number', required: true },
          { name: 'maxH', type: 'number', required: true },
        ],
      },
      {
        name: 'sm',
        type: 'group',
        fields: [
          { name: 'i', type: 'text', required: true },
          { name: 'x', type: 'number', required: true },
          { name: 'y', type: 'number', required: true },
          { name: 'w', type: 'number', required: true },
          { name: 'h', type: 'number', required: true },
          { name: 'maxH', type: 'number', required: true },
        ],
      },
    ],
  },
  {
    name: 'blockWrapperBgColor',
    label: 'Block Wrapper Background Color',
    type: 'radio',
    options: [
      { label: 'Base 1', value: 'base100' },
      { label: 'Base 2', value: 'base200' },
      { label: 'Base 3', value: 'base300' },
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Accent', value: 'accent' },
      { label: 'Transparent', value: 'transparent' },
      { label: 'Glass', value: 'glass' },
    ],
  },
  {
    name: 'blockBorder',
    label: 'Block Border',
    type: 'radio',
    options: [
      { label: 'card', value: 'card' },
      { label: 'shadow', value: 'shadow' },
      { label: 'none', value: 'none' },
    ],
  },
  {
    name: 'blockUrlLink',
    label: 'Block URL Link',
    type: 'text',
    required: false,
  },
];
