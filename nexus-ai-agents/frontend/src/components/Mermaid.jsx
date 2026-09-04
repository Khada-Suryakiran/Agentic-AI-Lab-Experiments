import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#06b6d4',
    primaryTextColor: '#fff',
    primaryBorderColor: '#06b6d4',
    lineColor: '#8b5cf6',
    secondaryColor: '#1e1b4b',
    tertiaryColor: '#1e1b4b'
  }
});

const Mermaid = ({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart).then((result) => {
        containerRef.current.innerHTML = result.svg;
      }).catch((e) => {
        console.error(e);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="text-red-500 bg-red-900/20 p-4 border border-red-500 rounded">Error rendering chart: ${e.message}</div>`;
        }
      });
    }
  }, [chart]);

  return <div ref={containerRef} className="my-8 flex justify-center bg-black/40 border border-white/10 p-6 rounded-xl shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] overflow-x-auto" />;
};

export default Mermaid;
