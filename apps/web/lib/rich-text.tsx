'use client';

import React from 'react';

/**
 * Renders Payload CMS Lexical rich text JSON to React elements.
 *
 * Lexical stores content as a tree with `root > children[]` where each
 * child has a `type`, optional `children`, and type-specific fields.
 *
 * This is a lightweight renderer — extend it as needed for custom nodes.
 */

interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  url?: string;
  listType?: string;
  value?: unknown;
  version?: number;
  [key: string]: unknown;
}

interface RichTextProps {
  content: unknown;
  className?: string;
}

export function RichText({ content, className }: RichTextProps): React.ReactElement | null {
  if (!content || typeof content !== 'object') return null;

  const root = (content as { root?: LexicalNode }).root;
  if (!root?.children) return null;

  return (
    <div className={className ?? 'prose prose-invert prose-yellow max-w-none'}>
      {root.children.map((node, i) => (
        <RenderNode key={i} node={node} />
      ))}
    </div>
  );
}

function RenderNode({ node }: { node: LexicalNode }): React.ReactElement | null {
  switch (node.type) {
    case 'paragraph':
      return (
        <p className="text-gray-300 mb-4 leading-loose text-lg font-light">
          {renderChildren(node.children)}
        </p>
      );

    case 'heading': {
      const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';
      const headingClasses: Record<string, string> = {
        h1: 'text-4xl font-black mt-12 mb-6 text-white uppercase tracking-tight',
        h2: 'text-3xl font-black mt-12 mb-6 text-white uppercase tracking-tight border-l-4 border-js-yellow pl-4',
        h3: 'text-xl font-bold mt-8 mb-4 text-white uppercase tracking-wide',
        h4: 'text-lg font-bold mt-6 mb-3 text-white',
        h5: 'text-base font-bold mt-4 mb-2 text-white',
        h6: 'text-sm font-bold mt-4 mb-2 text-gray-300',
      };
      return (
        <Tag className={headingClasses[Tag] ?? headingClasses.h2}>
          {renderChildren(node.children)}
        </Tag>
      );
    }

    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <ListTag className="text-gray-300 mb-4 pl-6 space-y-2 list-disc">
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </ListTag>
      );
    }

    case 'listitem':
      return (
        <li className="text-gray-300 text-lg font-light">
          {renderChildren(node.children)}
        </li>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-js-yellow pl-6 my-6 text-gray-400 italic text-lg">
          {renderChildren(node.children)}
        </blockquote>
      );

    case 'link':
      return (
        <a
          href={node.url as string}
          className="text-js-yellow underline hover:text-white transition-colors"
          target={node.url?.toString().startsWith('http') ? '_blank' : undefined}
          rel={node.url?.toString().startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {renderChildren(node.children)}
        </a>
      );

    case 'text':
      return <FormatText node={node} />;

    case 'linebreak':
      return <br />;

    default:
      // Fallback: try to render children
      if (node.children) {
        return <>{node.children.map((child, i) => <RenderNode key={i} node={child} />)}</>;
      }
      return null;
  }
}

function renderChildren(children?: LexicalNode[]): React.ReactNode {
  if (!children) return null;
  return children.map((child, i) => <RenderNode key={i} node={child} />);
}

// Lexical format flags (bitfield)
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;

function FormatText({ node }: { node: LexicalNode }): React.ReactElement {
  let text: React.ReactNode = node.text ?? '';
  const format = node.format ?? 0;

  if (format & IS_CODE) {
    text = <code className="bg-gray-800 px-1.5 py-0.5 text-js-yellow text-sm font-mono">{text}</code>;
  }
  if (format & IS_BOLD) {
    text = <strong className="font-bold text-white">{text}</strong>;
  }
  if (format & IS_ITALIC) {
    text = <em>{text}</em>;
  }
  if (format & IS_UNDERLINE) {
    text = <u>{text}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    text = <s>{text}</s>;
  }

  return <>{text}</>;
}
