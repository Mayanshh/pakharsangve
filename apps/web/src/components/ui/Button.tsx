import React from "react";

interface ButtonProps {
  text?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export default function CapsuleButton({ 
  text = "Explore Work", 
  href, 
  onClick 
}: ButtonProps) {
  const Component = href ? "a" : "button";

  return (
    <>
      <style>{`
        @keyframes auraPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.8;
          }
        }
        .animate-aura {
          animation: auraPulse 4s cubic-bezier(0.37, 0, 0.63, 1) infinite;
        }
      `}</style>

      <Component
        href={href}
        onClick={onClick}
        className="group relative inline-flex items-center justify-center p-0.5 rounded-full cursor-pointer focus:outline-none"
      >
        {/* Soft Glowing Background Aura */}
        <div className="absolute -inset-1 rounded-full bg-linear-to-r from-lime-400 via-emerald-400 to-lime-300 opacity-40 blur-md transition-opacity duration-500 group-hover:opacity-100 animate-aura pointer-events-none" />

        {/* Button Core Container */}
        <div className="relative inline-flex items-center gap-4 px-8 py-4 bg-neutral-950 text-white rounded-full overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02] active:scale-[0.98]">
          
          {/* Subtle Shimmer Sweep Overlay on Hover */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full pointer-events-none" />

          {/* Button Text */}
          <span className="relative z-10 text-sm font-medium tracking-[0.15em] uppercase text-neutral-200 transition-colors duration-300 group-hover:text-white">
            {text}
          </span>

          {/* Animated Arrow Icon Container */}
          <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-lime-300 group-hover:border-lime-300 group-hover:text-neutral-950 group-hover:translate-x-1">
            <svg
              className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </Component>
    </>
  );
}