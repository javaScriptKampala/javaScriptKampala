export default function IntelCard() {
  return (
    <section>
      <div className="text-xs text-gray-500 font-mono mb-4 flex items-center gap-2">
        <Monitor size={12} />
        <span>{post.date}</span>
      </div>
      <h3 className="text-2xl font-black truncate text-white uppercase mb-4 group-hover:text-js-yellow transition-colors leading-tight">
        {post.title}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-3 font-light mb-8 leading-relaxed">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-js-yellow transition-colors">
        Read Brief{" "}
        <ArrowRight
          size={12}
          className="group-hover:translate-x-1 transition-transform"
        />
      </div>
    </section>
  );
}
// date, title, info, read brief
