import { useState, useEffect, useRef } from "react";
import { NavigationHeader } from "./NavigationHeader";

interface PageHeaderProps {
  backgroundColor?: string;
  alwaysVisible?: boolean;
}

export function PageHeader({ backgroundColor = "rgba(255, 255, 255, 1)", alwaysVisible = false }: PageHeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const normalHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const updateHeaderHeight = () => {
      if (normalHeaderRef.current) {
        setHeaderHeight(normalHeaderRef.current.offsetHeight);
      }
    };

    checkMobile();
    const timeoutId = setTimeout(updateHeaderHeight, 100);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      updateHeaderHeight();
      checkMobile();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const effectiveHeaderHeight = headerHeight || 77;
  const triggerPoint = effectiveHeaderHeight / 2;
  const transitionDistance = effectiveHeaderHeight / 3;
  const progress = Math.min(Math.max((scrollY - triggerPoint) / transitionDistance, 0), 1);
  const isSticky = scrollY > triggerPoint;
  const translateY = isSticky ? 0 : Math.max(-scrollY, -effectiveHeaderHeight);
  const stickyOpacity = alwaysVisible ? Math.max(progress, 0.95) : progress;
  const stickyScale = 0.98 + (progress * 0.02);

  return (
    <>
      <div 
        ref={normalHeaderRef}
        className="w-full relative z-50"
        style={{
          paddingTop: isMobile ? '8px' : '12px',
          paddingBottom: isMobile ? '8px' : '12px',
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: isSticky ? '0' : 'auto',
          right: isSticky ? '0' : 'auto',
          transform: isSticky ? `translateY(${translateY}px) scale(${stickyScale})` : 'none',
          backgroundColor: isSticky ? `rgba(255, 255, 255, ${stickyOpacity})` : backgroundColor,
          borderBottom: `1px solid rgba(229, 231, 235, ${Math.max(stickyOpacity, 0.1)})`,
          boxShadow: `0 2px 8px -2px rgba(0, 0, 0, ${0.1 * Math.max(stickyOpacity, 0.1)})`,
          backdropFilter: stickyOpacity > 0 ? 'blur(8px)' : 'none',
          transition: isSticky ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, background-color, border-color, box-shadow'
        }}
      >
        <NavigationHeader />
      </div>
      
      {/* Spacer to prevent content jump when header becomes fixed */}
      {isSticky && (
        <div style={{ height: `${effectiveHeaderHeight}px` }} />
      )}
    </>
  );
}

