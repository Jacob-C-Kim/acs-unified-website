import { useState } from "react";
import ACSLogo from "./ACSLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function NavigationHeader({ 
  currentPage = 'home', 
  onNavigate 
}: { 
  currentPage?: string, 
  onNavigate?: (page: string) => void 
} = {}) {
  const [activeSection, setActiveSection] = useState<string | null>(currentPage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Map internal section keys to CampusGroups slugs.
  const sectionToSlug = (section: string) => {
    switch (section) {
      case "home":
        return "";
      case "mentor":            // Mentor/Mentee -> /mm
        return "mm";
      default:
        return section;
    }
  };

  // Helper: navigate to CampusGroups page (break out of iframe if embedded)
  const goToCampusGroups = (section: string) => {
    const base = "https://campusgroups.rit.edu/ACS";
    const slug = sectionToSlug(section);
    const url = slug ? `${base}/${encodeURIComponent(slug)}` : base;

    try {
      if (window.top) window.top.location.href = url;
      else window.location.href = url;
    } catch {
      window.location.href = url;
    }
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    onNavigate?.(section);
    goToCampusGroups(section);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-8 px-2 md:px-6 relative">
      {/* Logo positioned center-left - smaller on mobile */}
      <ACSLogo 
        size={48}
        className="md:hidden cursor-pointer" // Small logo for mobile
        onClick={() => handleNavClick('home')}
      />
      <ACSLogo 
        size={61}
        className="hidden md:block cursor-pointer" // Regular logo for desktop
        onClick={() => handleNavClick('home')}
      />
      
      {/* Navigation items to the right of logo - responsive */}
      <div className="flex gap-2 md:gap-6 items-center">
        <div 
          className={`font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
            activeSection === 'about' ? 'text-blue-600' : 'text-black'
          }`}
          onClick={() => handleNavClick('about')}
        >
          <p className="leading-[normal] whitespace-pre">About Us</p>
        </div>

        <div 
          className={`font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
            activeSection === 'calendar' ? 'text-blue-600' : 'text-black'
          }`}
          onClick={() => handleNavClick('calendar')}
        >
          <p className="leading-[normal] whitespace-pre">Calendar</p>
        </div>

        <div 
          className={`font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
            activeSection === 'mentor' ? 'text-blue-600' : 'text-black'
          }`}
          onClick={() => handleNavClick('mentor')}
        >
          <p className="leading-[normal] whitespace-pre hidden sm:block">Mentor/Mentee</p>
          <p className="leading-[normal] whitespace-pre block sm:hidden">Mentor</p>
        </div>

        <div 
          className={`font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
            activeSection === 'tinikling' ? 'text-blue-600' : 'text-black'
          }`}
          onClick={() => handleNavClick('tinikling')}
        >
          <p className="leading-[normal] whitespace-pre">Tinikling</p>
        </div>

        <div 
          className={`font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
            activeSection === 'eboard' ? 'text-blue-600' : 'text-black'
          }`}
          onClick={() => handleNavClick('eboard')}
        >
          <p className="leading-[normal] whitespace-pre hidden sm:block">Our EBoard</p>
          <p className="leading-[normal] whitespace-pre block sm:hidden">EBoard</p>
        </div>

        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div 
              className={`font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 flex items-center gap-1 ${
                activeSection === 'apply' ? 'text-blue-600' : 'text-black'
              }`}
            >
              <p className="leading-[normal] whitespace-pre hidden sm:block">Apply For EBoard</p>
              <p className="leading-[normal] whitespace-pre block sm:hidden">Apply</p>
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ease-in-out origin-center ${isDropdownOpen ? '-rotate-180' : 'rotate-0'}`} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent 
            align="end" 
            className="min-w-[160px] bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg"
          >
            <DropdownMenuItem 
              className="font-['Lexend:Regular',_sans-serif] text-[12px] cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
              onClick={() => handleNavClick('executive-assistant')}
            >
              Executive Assistant
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="font-['Lexend:Regular',_sans-serif] text-[12px] cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
              onClick={() => handleNavClick('eboard')}
            >
              Executive Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

/**
 * Reusable Hero/Welcome Section Component
 */
export function HeroSection({ 
  title = "asian culture society",
  subtitle = "welcome to", 
  description = "RIT's largest Asian club, bringing students together to celebrate, learn, and share the rich history, culture, and art of Asian countries",
  includeHeaderSpace = true,
  headerSpaceHeight = "61px",
  topPadding = "50px",
  bottomPadding = "150px",
  fullScreen = false
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  includeHeaderSpace?: boolean;
  headerSpaceHeight?: string;
  topPadding?: string;
  bottomPadding?: string;
  fullScreen?: boolean;
} = {}) {
  return (
    <div 
      className={`box-border content-stretch flex flex-col gap-[72px] items-center justify-start px-0 relative bg-white z-10 ${
        fullScreen ? 'min-h-screen w-full' : 'size-full'
      }`}
      style={{ 
        paddingTop: includeHeaderSpace ? `calc(${topPadding} + ${headerSpaceHeight})` : topPadding,
        paddingBottom: bottomPadding 
      }}
    >
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 flex-1">
        <div className="content-stretch flex flex-col items-center justify-start leading-[0] relative shrink-0 text-black">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] md:text-[18px] text-center">
            <p className="leading-[normal]">{subtitle}</p>
          </div>
          <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] font-bold not-italic relative shrink-0 text-[28px] md:text-[40px] text-center">
            <p className="leading-[normal] font-bold px-4">{title}</p>
          </div>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-center max-w-[600px] px-4 w-full">
          <p className="leading-[normal]">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Keep the original component for backward compatibility
export default function InteractiveFrame22() {
  return (
    <HeroSection 
      includeHeaderSpace={true}
      headerSpaceHeight="61px"
      topPadding="50px"
      bottomPadding="150px"
      fullScreen={false}
    />
  );
}
