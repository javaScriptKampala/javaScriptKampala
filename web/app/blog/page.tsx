import Link from 'next/link';
import { Section, Badge } from '../../components/UI';
import { BLOG_POSTS } from '../../data';
import { ArrowRight } from 'lucide-react';

export default function BlogList() {
  return (
    <div className="min-h-screen bg-js-black">
      {/* Hero */}
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-js-yellow/5 skew-x-12 transform origin-top-right pointer-events-none"></div>
         <Section noPadding>
            <div className="max-w-4xl">
               <Badge color="yellow" className="mb-6">Intel</Badge>
               <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.85] tracking-tighter">
                  Engineering <br/><span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '1px white'}}>Insights</span>
               </h1>
            </div>
         </Section>
      </div>

      <div className="border-b border-gray-800 bg-[#080808]">
        <div className="max-w-7xl mx-auto border-x border-gray-800">
          <div className="grid md:grid-cols-2">
            {BLOG_POSTS.map((post, idx) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className={`group block bg-[#050505] hover:bg-[#0a0a0a] transition-colors relative overflow-hidden border-b border-gray-800 ${idx % 2 === 0 ? 'md:border-r' : ''}`}>
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowRight className="text-js-yellow" size={32} />
                </div>
                <div className="p-12 h-full flex flex-col">
                  <div className="flex gap-2 mb-6">
                    {post.tags.map(tag => <span key={tag} className="border border-gray-700 text-gray-400 text-[10px] px-2 py-1 uppercase font-bold tracking-widest">{tag}</span>)}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 uppercase leading-tight group-hover:text-js-yellow transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 font-light mb-8 text-lg flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-500 font-mono border-t border-gray-800 pt-6">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
