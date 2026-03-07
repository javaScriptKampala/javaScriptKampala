import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass';
  href?: string;
  className?: string;
  icon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', href, className = '', icon: Icon, ...props
}) => {
  // FLAT UI: No rounding, uppercase font, tracking wider - JavaScript branding
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 font-bold text-sm transition-all duration-200 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-js-yellow focus:ring-offset-2 focus:ring-offset-black border-2 active:scale-95";

  const variants = {
    // Primary: JS Yellow on Black
    primary: "bg-js-yellow text-black border-js-yellow hover:bg-white hover:border-white hover:text-black",
    // Secondary: White on Black
    secondary: "bg-white text-black border-white hover:bg-js-yellow hover:border-js-yellow",
    // Outline: Yellow border
    outline: "bg-transparent border-js-yellow text-js-yellow hover:bg-js-yellow hover:text-black",
    // Ghost: Minimal
    ghost: "bg-transparent border-transparent text-white hover:text-js-yellow hover:bg-white/5",
    // Glass: White border
    glass: "bg-transparent border-white text-white hover:border-js-yellow hover:text-js-yellow"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon size={18} className="mr-3" />}
      {children}
    </>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string; noPadding?: boolean }> = ({ children, className = '', id, noPadding = false }) => (
  <section id={id} className={`relative ${noPadding ? '' : 'py-20 md:py-32'} ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {children}
    </div>
  </section>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'yellow' | 'green' | 'gray' | 'blue'; className?: string }> = ({ children, color = 'gray', className = '' }) => {
  // Flat badges: Solid background or strong border
  const colors = {
    yellow: "bg-js-yellow text-black border-js-yellow",
    green: "bg-green-600 text-white border-green-600",
    blue: "bg-blue-600 text-white border-blue-600",
    gray: "bg-gray-800 text-gray-300 border-gray-800"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 border text-[10px] font-bold uppercase tracking-widest ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean; noBorder?: boolean }> = ({ children, className = '', hover = true, noBorder = false }) => (
  <div className={`
    bg-[#111]
    ${noBorder ? '' : 'border border-gray-800'} 
    ${hover ? 'transition-colors duration-200 hover:border-js-yellow group' : ''} 
    ${className}
  `}>
    {children}
  </div>
);

export const Heading: React.FC<{ children: React.ReactNode; level?: 1 | 2 | 3; className?: string }> = ({ children, level = 2, className = '' }) => {
  const Tag = `h${level}` as React.ElementType;
  const sizes = {
    1: "text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase",
    2: "text-3xl md:text-5xl font-bold tracking-tight uppercase",
    3: "text-xl md:text-2xl font-bold tracking-tight uppercase"
  };
  return <Tag className={`${sizes[level]} text-white ${className}`}>{children}</Tag>;
};
