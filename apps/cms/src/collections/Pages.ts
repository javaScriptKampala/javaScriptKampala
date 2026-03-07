import type { CollectionConfig } from 'payload';
import { generateSlug } from '../hooks/generateSlug';

// Blocks
import { HeroBlock } from '../blocks/Hero';
import { RichTextBlock } from '../blocks/RichText';
import { ImageBlock } from '../blocks/Image';
import { CTABlock } from '../blocks/CTA';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
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
      name: 'layoutBlocks',
      type: 'blocks',
      blocks: [HeroBlock, RichTextBlock, ImageBlock, CTABlock],
    },
  ],
};
