import type { CollectionConfig } from 'payload';
import { generateSlug } from '../hooks/generateSlug';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [generateSlug],
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'time',
      type: 'text',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'venue',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'speakers',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'topic',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'agenda',
      type: 'array',
      fields: [
        {
          name: 'time',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'speaker',
          type: 'text',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'registrationLink',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
