import type { GlobalConfig } from 'payload';
import { HeroBlock } from '../blocks/Hero';
import { CTABlock } from '../blocks/CTA';

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'subheading',
          type: 'textarea',
        },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        {
          name: 'backgroundVideo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featuredProjectsHeading',
      type: 'text',
      defaultValue: 'Community Projects',
    },
    {
      name: 'sponsorsHeading',
      type: 'text',
      defaultValue: 'Our Sponsors',
    },
    {
      name: 'blogHeading',
      type: 'text',
      defaultValue: 'Latest from the Blog',
    },
  ],
};
