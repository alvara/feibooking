import type { Block } from 'payload/types';
import { reactGridLayoutFields } from './ReactGridLayoutBlockFields';

export const InfoBlockFields: Block = {
  slug: 'InfoBlock',
  labels: {
    plural: 'Info Blocks',
    singular: 'Info Block',
  },
  fields: [
    // MEDIA FIELDS
    {
      name: 'mediaType',
      label: 'Media Type',
      type: 'radio',
      required: false,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Animation', value: 'animation' },
      ],
    },
    {
      name: 'mediaImageUpload',
      label: 'Image Upload',
      type: 'upload',
      relationTo: 'profileUploads',
      required: false,
    },

    {
      name: 'mediaAnchor',
      label: 'Media Anchor',
      type: 'radio',
      required: false,
      defaultValue: 'center',
      options: [
        { label: 'Top Left', value: 'topLeft' },
        { label: 'Bottom Left', value: 'bottomLeft' },
        { label: 'Bottom Center', value: 'bottomCenter' },
        { label: 'Bottom Right', value: 'bottomRight' },
        { label: 'Center', value: 'center' },
        { label: 'Top Right', value: 'topRight' },
        { label: 'Top Center', value: 'topCenter' },
      ],
    },
    {
      name: 'mediaWidth',
      label: 'Media Width',
      type: 'number',
      required: false,
      // size in percentage
      defaultValue: 100,
    },
    {
      name: 'mediaHeight',
      label: 'Media Height',
      type: 'number',
      required: false,
      // size in percentage
      defaultValue: 100,
    },
    // positioning is for image positioning
    {
      name: 'mediaYPosition',
      label: 'Media Y Position',
      type: 'number',
      required: false,
      defaultValue: 0,
    },
    {
      name: 'mediaXPosition',
      label: 'Media X Position',
      type: 'number',
      required: false,
      defaultValue: 0,
    },
    // coordinates is for image positioning
    {
      name: 'mediaYCoordinate',
      label: 'Media Y Coordinate',
      type: 'number',
      required: false,
      defaultValue: 0,
    },
    {
      name: 'mediaXCoordinate',
      label: 'Media X Coordinate',
      type: 'number',
      required: false,
      defaultValue: 0,
    },
    // control the scale of the image
    {
      name: 'mediaScale',
      label: 'Media Scale',
      type: 'number',
      required: false,
      defaultValue: 1,
    },

    {
      name: 'mediaPadding',
      label: 'Media Pading',
      type: 'radio',
      required: false,
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'mediaRatio',
      label: 'Media Ratio',
      type: 'radio',
      required: false,
      defaultValue: '1/2',
      options: [
        { label: '1/2', value: '1/2' },
        { label: '2/3', value: '2/3' },
        { label: '3/4', value: '3/4' },
        { label: 'banner', value: 'banner' },
      ],
    },
    {
      name: 'mediaFlow',
      label: 'Media Flow',
      type: 'radio',
      required: false,
      defaultValue: 'row',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
        { label: 'Row Reverse', value: 'rowReverse' },
        { label: 'Column Reverse', value: 'columnReverse' },
        { label: 'Center', value: 'center' },
        { label: 'Between', value: 'between' },
      ],
    },
    {
      name: 'mediaFit',
      label: 'Media Fit',
      type: 'radio',
      required: false,
      defaultValue: 'contain',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
      ],
    },

    // {
    //   name: "mediaFitSm",
    //   label: "Media Fit Sm",
    //   type: "radio",
    //   required: false,
    //   defaultValue: "contain",
    //   options: [
    //     { label: "Cover", value: "cover" },
    //     { label: "Contain", value: "contain" },
    //   ],
    // },
    // (GROUP)
    {
      name: 'groupPositioning',
      label: 'Group Positioning',
      type: 'radio',
      required: false,
      defaultValue: 'bottomLeft',
      options: [
        { label: 'Top Left', value: 'TopLeft' },
        { label: 'Bottom Left', value: 'bottomLeft' },
        { label: 'Center', value: 'center' },
        { label: 'Between', value: 'between' },
      ],
    },
    {
      name: 'groupPadding',
      label: 'Group Padding',
      type: 'radio',
      required: false,
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'groupAlignment',
      label: 'Group Alignment',
      type: 'radio',
      required: false,
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    // GROUP (EYEBROW HEADING)
    {
      name: 'eyebrowHeadingText',
      label: 'Eyebrow Heading',
      type: 'text',
      required: false,
    },
    {
      name: 'headingText',
      label: 'Heading Text',
      type: 'text',
      required: false,
    },
    {
      name: 'headingSize',
      label: 'Heading Size',
      type: 'radio',
      options: [
        { label: 'XS', value: 'text-xs' },
        { label: 'SM', value: 'text-sm' },
        { label: 'Base', value: 'text-base' },
        { label: 'LG', value: 'text-lg' },
        { label: 'XL', value: 'text-xl' },
        { label: '2XL', value: 'text-2xl' },
        { label: '3XL', value: 'text-3xl' },
        { label: '4XL', value: 'text-4xl' },
        { label: '5XL', value: 'text-5xl' },
        { label: '6XL', value: 'text-6xl' },
        { label: '7XL', value: 'text-7xl' },
        { label: '8XL', value: 'text-8xl' },
        { label: '9XL', value: 'text-9xl' },
      ],
      required: false,
      defaultValue: 'text-3xl',
    },
    // GROUP (DESCRIPTION)
    {
      name: 'descriptionText',
      label: 'Description Text',
      type: 'text',
      required: false,
    },
    {
      name: 'descriptionSize',
      label: 'Description Size',
      type: 'radio',
      options: [
        { label: 'XS', value: 'text-xs' },
        { label: 'SM', value: 'text-sm' },
        { label: 'Base', value: 'text-base' },
        { label: 'LG', value: 'text-lg' },
        { label: 'XL', value: 'text-xl' },
        { label: '2XL', value: 'text-2xl' },
        { label: '3XL', value: 'text-3xl' },
        { label: '4XL', value: 'text-4xl' },
        { label: '5XL', value: 'text-5xl' },
        { label: '6XL', value: 'text-6xl' },
        { label: '7XL', value: 'text-7xl' },
        { label: '8XL', value: 'text-8xl' },
        { label: '9XL', value: 'text-9xl' },
      ],
      required: false,
      defaultValue: 'text-base',
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      required: false,
    },

    // BLOCK FIELDS
    // predefined sizes for this block.
    {
      name: 'sizeSm',
      label: 'Size Options (sm)',
      type: 'radio',
      options: [
        { label: 'Small Square', value: 'small_square' },
        { label: 'Large Square', value: 'large_square' },
        { label: 'Tall Rectangle', value: 'tall_rectangle' },
        { label: 'Wide Rectangle', value: 'wide_rectangle' },
        { label: 'Banner', value: 'banner' },
      ],
      required: true,
    },
    {
      name: 'sizeMd',
      label: 'Size Options (md)',
      type: 'radio',
      options: [
        { label: 'Small Square', value: 'small_square' },
        { label: 'Large Square', value: 'large_square' },
        { label: 'Tall Rectangle', value: 'tall_rectangle' },
        { label: 'Wide Rectangle', value: 'wide_rectangle' },
        { label: 'Banner', value: 'banner' },
      ],
      required: true,
    },
    ...reactGridLayoutFields,
  ],
};
