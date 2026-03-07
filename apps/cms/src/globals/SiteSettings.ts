import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'JavaScript Kampala',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: 'The JavaScript Community in Kampala, Uganda',
    },
    {
      name: 'siteUrl',
      type: 'text',
      defaultValue: 'https://jskla.dev',
    },
    {
      name: 'defaultSEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'JavaScript Kampala',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'The JavaScript Community in Kampala, Uganda',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'newsletterEndpoint',
      type: 'text',
      admin: {
        description: 'URL for newsletter signup submissions',
      },
    },
  ],
};
