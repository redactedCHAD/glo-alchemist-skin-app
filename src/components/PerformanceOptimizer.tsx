import { useEffect } from 'react';

// Performance optimization component
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://thegloalchemist.com/book';
    preloadLink.as = 'document';
    document.head.appendChild(preloadLink);

    // Cleanup
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  return null;
};

// Skip to main content for screen readers
export const SkipToMain = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50"
  >
    Skip to main content
  </a>
);