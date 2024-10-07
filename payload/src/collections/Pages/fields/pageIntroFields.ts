import type { Page } from 'payload/generated-types';
import type { Field } from 'payload/types';

export const pageIntroFields: Field[] = [
  {
    type: 'group',
    name: 'pageIntro',
    label: 'Page Intro',
    admin: {
      condition: (data: Page) =>
        data.pageType === 'blockBuilderPage' ||
        // data.pageType === 'linkInBio' ||
        data.pageType === 'landingPage',
    },
    fields: [
      {
        name: 'topMenuLinks',
        label: 'Menu Links',
        type: 'relationship',
        relationTo: 'links',
        hasMany: true,
        required: false,
      },
      {
        name: 'pageIntroStyle',
        label: 'Style',
        type: 'radio',
        defaultValue: 'bubble',
        options: [{ label: 'Bubble', value: 'bubble' }],
        required: true,
      },
      {
        name: 'pageIntroTextPositioning',
        label: 'Text Positioning',
        type: 'radio',
        defaultValue: 'center',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Center', value: 'center' },
        ],
      },
      {
        name: 'pageIntroTextWidth',
        label: 'Text Width',
        type: 'radio',
        defaultValue: 'max-w-6xl',
        options: [
          { label: 'Extra Small', value: 'max-w-xs' },
          { label: 'Small', value: 'max-w-sm' },
          { label: 'Medium', value: 'max-w-md' },
          { label: 'Large', value: 'max-w-lg' },
          { label: 'Extra Large', value: 'max-w-xl' },
          { label: '2XL', value: 'max-w-2xl' },
          { label: '3XL', value: 'max-w-3xl' },
          { label: '4XL', value: 'max-w-4xl' },
          { label: '5XL', value: 'max-w-5xl' },
          { label: '6XL', value: 'max-w-6xl' },
          { label: '7XL', value: 'max-w-7xl' },
        ],
      },
      // TITLE
      {
        name: 'pageIntroTitle',
        label: 'Page Title',
        type: 'richText',
        required: true,
        localized: true,
      },
      // {
      //   name: 'pageIntroTitleSize',
      //   label: 'Title Size',
      //   type: 'radio',
      //   defaultValue: 'text-xl',
      //   options: [
      //     { label: 'Extra Large', value: 'text-xl' },
      //     { label: '2XL', value: 'text-2xl' },
      //     { label: '3XL', value: 'text-3xl' },
      //     { label: '4XL', value: 'text-4xl' },
      //     { label: '5XL', value: 'text-5xl' },
      //     { label: '6XL', value: 'text-6xl' },
      //     { label: '7XL', value: 'text-7xl' },
      //     { label: '8XL', value: 'text-8xl' },
      //     { label: '9XL', value: 'text-9xl' },
      //   ],
      // },
      // SUBTITLE
      {
        name: 'pageIntroSubtitle',
        label: 'Page Subtitle',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'pageIntroSubtitleSize',
        label: 'Title Size',
        type: 'radio',
        defaultValue: 'text-lg',
        options: [
          { label: 'Small', value: 'text-sm' },
          { label: 'Base', value: 'text-base' },
          { label: 'Large', value: 'text-lg' },
          { label: 'Extra Large', value: 'text-xl' },
        ],
      },
      // VISUAL
      {
        name: 'pageIntroBgVideoUrl',
        label: 'Background Video URL',
        type: 'text',
        required: false,
        localized: true,
      },
      // SOCIAL PROOF
      {
        name: 'socialProofFeaturedIn',
        label: 'Featured In',
        type: 'array',
        fields: [
          {
            name: 'featuredInLogo',
            label: 'Logo',
            type: 'upload',
            relationTo: 'profileUploads',
            required: true,
            localized: true,
          },
          {
            name: 'featuredInName',
            label: 'Name',
            type: 'text',
            required: true,
            localized: true,
          },
          {
            name: 'featuredInLink',
            label: 'Link',
            type: 'text',
            required: false,
          },
        ],
      },
      // CTA BUTTON
      {
        name: 'pageIntroCtaText',
        label: 'CTA Text',
        type: 'text',
        required: false,
      },
      {
        name: 'pageIntroCtaUrl',
        label: 'CTA URL',
        type: 'text',
        required: false,
      },
      // {
      //   name: "ctaButton",
      //   label: "CTA Button",
      //   type: "relationship",
      //   relationTo: "links",
      //   hasMany: false,
      //   admin: {
      //     allowCreate: true,
      //   },
      // },
      // CREDIT
      // new field to give credit to the producer of video or image
      {
        name: 'pageIntroCredit',
        label: 'Page Intro Credit',
        type: 'text',
        required: false,
      },
    ],
  },
];
