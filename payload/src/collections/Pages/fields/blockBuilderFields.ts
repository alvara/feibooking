import type { Field } from 'payload/types';
import { ImageVideoBlockFields } from './blocks/ImageVideoBlockFields';
import { TextBlockFields } from './blocks/TextBlockFields';
import { StatsBlockFields } from './blocks/StatsBlockFields';
import { TitleBlockFields } from './blocks/TitleBlockFields';
import { InfoBlockFields } from './blocks/InfoBlockFields';

export const blockBuilderFields: Field[] = [
  {
    name: 'customPageSections',
    label: 'Add sections to build your page',
    labels: {
      singular: 'Section',
      plural: 'Sections',
    },
    required: true,
    admin: {
      condition: (data) => data.pageType === 'blockBuilderPage',
    },
    type: 'array',
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: false,
      },
      {
        name: 'backgroundColor',
        label: 'Background Color',
        type: 'radio',
        options: [
          { label: 'Base 100', value: 'bgBase100' },
          { label: 'Base 200', value: 'bgBase200' },
          { label: 'Primary', value: 'bgPrimary' },
          { label: 'Secondary', value: 'bgSecondary' },
          { label: 'Accent', value: 'bgAccent' },
        ],
        required: false,
        defaultValue: 'base100',
      },
      {
        name: 'sectionType',
        label: 'Section Type',
        type: 'radio',
        options: [
          { label: 'Advance Block Section', value: 'advanceBlockSection' },
          { label: 'Teams Section', value: 'teamsSection' },
          { label: 'Events Section', value: 'eventsSection' },
          { label: 'Stats Section', value: 'statsSection' },
        ],
        required: false,
        defaultValue: 'advanceBlockSection',
      },
      {
        name: 'blocks',
        label: 'Blocks',
        type: 'blocks',
        blocks: [
          ImageVideoBlockFields,
          TextBlockFields,
          StatsBlockFields,
          TitleBlockFields,
          InfoBlockFields,
        ],
      },
    ],
  },
];
