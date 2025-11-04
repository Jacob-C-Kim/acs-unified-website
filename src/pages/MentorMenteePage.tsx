import { useState, useEffect, useRef } from "react";
import { NavigationHeader } from "../components/shared/NavigationHeader";
import MentorMenteePageComponent from "../components/MentorMenteePage";
import { useNavigate } from "react-router-dom";

export default function MentorMenteePage() {
  const [currentPage] = useState('mentor-mentee');
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const normalHeaderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    if (normalHeaderRef.current) {
      setHeaderHeight(normalHeaderRef.current.offsetHeight);
    }

    checkMobile();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (normalHeaderRef.current) {
        setHeaderHeight(normalHeaderRef.current.offsetHeight);
      }
      checkMobile();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (page: string) => {
    if (page === 'mentor-signup') {
      navigate('/mentor-mentee/mentor/sign-up');
    } else if (page === 'mentee-signup') {
      navigate('/mentor-mentee/mentee/sign-up');
    }
  };

  // Calculate transition progress for header
  const triggerPoint = headerHeight / 2;
  const transitionDistance = headerHeight / 3;
  const progress = Math.min(Math.max((scrollY - triggerPoint) / transitionDistance, 0), 1);
  
  // Determine if header should be sticky
  const isSticky = scrollY > triggerPoint;
  
  // Calculate transform and opacity based on scroll progress
  const translateY = isSticky ? 0 : Math.max(-scrollY, -headerHeight);
  const stickyOpacity = progress;
  const stickyScale = 0.98 + (progress * 0.02);

  return (
    <div className="min-h-screen relative overflow-x-hidden w-full">
      {/* Header with smooth transition for Mentor/Mentee page */}
      <div 
        ref={normalHeaderRef}
        className="w-full relative z-50 bg-white"
        style={{
          paddingTop: isMobile ? '8px' : '12px',
          paddingBottom: isMobile ? '8px' : '12px',
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: isSticky ? '0' : 'auto',
          right: isSticky ? '0' : 'auto',
          transform: isSticky ? `translateY(${translateY}px) scale(${stickyScale})` : 'none',
          backgroundColor: isSticky ? `rgba(255, 255, 255, ${stickyOpacity})` : 'rgb(255, 255, 255)',
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
        <div style={{ height: `${headerHeight}px` }} />
      )}
      
      <MentorMenteePageComponent onNavigate={handleNavigation} hideHeader={true} />
    </div>
  );
}
