import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, Badge } from '../../../components/UI';
import { BLOG_POSTS } from '../../../data';
import { ArrowLeft, User, Calendar, Clock, Hash } from 'lucide-react';

// Simple markdown renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert prose-yellow max-w-none">
       {content.split('\n').map((line, i) => {
         if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-black mt-12 mb-6 text-white uppercase tracking-tight border-l-4 border-js-yellow pl-4">{line.replace('## ', '')}</h2>;
         if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-white uppercase tracking-wide">{line.replace('### ', '')}</h3>;
         if (line.trim() === '') return <br key={i}/>;
         return <p key={i} className="text-gray-300 mb-4 leading-loose text-lg font-light">{line}</p>;
       })}
    </div>
  );
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-js-black">
      <div className="bg-[#080808] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right pointer-events-none"></div>
         <Section noPadding>
            <div className="max-w-5xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-js-yellow mb-8 text-xs uppercase tracking-widest font-bold border border-gray-800 px-4 py-2 hover:border-js-yellow transition-colors bg-black">
                    <ArrowLeft size={16} className="mr-2" /> All Articles
                </Link>

                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                        <Badge key={tag} color="gray"><Hash size={10} className="mr-1 inline"/>{tag}</Badge>
                    ))}
                </div>

                <h1 className="text-4xl md:text-7xl font-black text-white mb-12 uppercase leading-[0.9] tracking-tighter">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 font-mono border-t border-gray-800 pt-8">
                    <div className="flex items-center gap-2">
                        <User size={14} className="text-js-yellow"/>
                        <span>By {post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-js-yellow"/>
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-js-yellow"/>
                        <span>{post.readingTime}</span>
                    </div>
                </div>
            </div>
         </Section>
      </div>

      <Section className="max-w-5xl mx-auto py-16">
         <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
                <MarkdownRenderer content={post.content} />
            </div>
            <div className="lg:col-span-4 hidden lg:block">
               <div className="sticky top-24 p-6 border border-gray-800 bg-[#0a0a0a]">
                  <div className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-gray-800 pb-2">Share Intel</div>
                  <div className="flex flex-col gap-2">
                     <button className="text-left text-gray-400 hover:text-js-yellow text-sm font-mono uppercase transition-colors">Twitter / X</button>
                     <button className="text-left text-gray-400 hover:text-js-yellow text-sm font-mono uppercase transition-colors">LinkedIn</button>
                     <button className="text-left text-gray-400 hover:text-js-yellow text-sm font-mono uppercase transition-colors">Copy Link</button>
                  </div>
               </div>
            </div>
         </div>
      </Section>
    </article>
  );
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}
