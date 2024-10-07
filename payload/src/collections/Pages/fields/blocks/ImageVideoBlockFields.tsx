import type { Block } from 'payload/types';
import { reactGridLayoutFields } from './ReactGridLayoutBlockFields';
// import img from "./hero.png";

export const ImageVideoBlockFields: Block = {
  slug: 'ImageVideoBlock',
  // imageURL: `${img}`,
  // imageAltText: "Image Block Icon",
  labels: {
    plural: 'ImageVideo Blocks',
    singular: 'ImageVideo Block',
  },
  fields: [
    {
      name: 'size_sm',
      label: 'Size Sm',
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
      name: 'size_md',
      label: 'Size Md',
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
    // {
    //   name: "caption",
    //   label: "Caption (Optional)",
    //   type: "text",
    //   required: false,
    // },
    {
      name: 'videoUrl',
      label: 'Video URL',
      type: 'text',
      required: false,
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
      required: false,
    },
    {
      name: 'testFile',
      label: 'Test File',
      type: 'upload',
      relationTo: 'profileUploads',
      required: false,
    },
    {
      name: 'imageSize',
      label: 'Image Size',
      type: 'radio',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full', value: 'full' },
      ],
    },
    // {
    //   name: "images",
    //   type: "array",
    //   label: "Images",
    //   minRows: 0,
    //   maxRows: 10,
    //   required: false,
    //   labels: {
    //     singular: "Image",
    //     plural: "Images",
    //   },
    //   fields: [
    //     {
    //       name: "image",
    //       type: "upload",
    //       relationTo: "profileUploads",
    //       required: true,
    //     },
    //     {
    //       name: "alt",
    //       label: "Alt Text",
    //       type: "text",
    //       required: false,
    //     },
    //     {
    //       name: "link",
    //       label: "Link",
    //       type: "text",
    //       required: false,
    //     },
    //   ],
    // },
    ...reactGridLayoutFields,
  ],
};
