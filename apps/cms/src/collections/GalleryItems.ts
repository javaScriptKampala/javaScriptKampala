import type { CollectionConfig } from 'payload';

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'event', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      required: true,
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
