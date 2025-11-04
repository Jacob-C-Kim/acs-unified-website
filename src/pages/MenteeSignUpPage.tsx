import { useState, useEffect, useRef } from "react";
import { NavigationHeader } from "../components/shared/NavigationHeader";
import MenteeSignup from "../components/MenteeSignup";
import { useNavigate } from "react-router-dom";

export default function MenteeSignUpPage() {
  const [currentPage] = useState('mentee-signup');
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const normalHeaderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleNavigation = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'about-us') {
      navigate('/about-us');
    } else if (page === 'calendar') {
      navigate('/acs-calendar');
    } else if (page === 'mentor-mentee') {
      navigate('/mentor-mentee');
    } else if (page === 'tinikling') {
      navigate('/tinikling');
    }
  };

  // Use default height of 77px if header height hasn't been calculated yet
  const effectiveHeaderHeight = headerHeight || 77;
  
  // Calculate transition progress for header
  const triggerPoint = effectiveHeaderHeight / 2;
  const transitionDistance = effectiveHeaderHeight / 3;
  const progress = Math.min(Math.max((scrollY - triggerPoint) / transitionDistance, 0), 1);
  
  // Determine if header should be sticky
  const isSticky = scrollY > triggerPoint;
  
  // Calculate transform and opacity based on scroll progress
  const translateY = isSticky ? 0 : Math.max(-scrollY, -effectiveHeaderHeight);
  const stickyOpacity = Math.max(progress, 0.95); // Always keep header mostly visible on mentee signup
  const stickyScale = 0.98 + (progress * 0.02);

  return (
    <div className="min-h-screen bg-[#69d7e5] relative overflow-x-hidden w-full">
      {/* Header with smooth transition - same as homepage/calendar */}
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
          backgroundColor: `rgba(255, 255, 255, ${stickyOpacity})`,
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
      
      <MenteeSignup />
    </div>
  );
}
