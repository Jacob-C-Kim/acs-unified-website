import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ACSLogo from "./ACSLogo";

export function NavigationHeader({
  currentPage,
  onNavigate,
}: {
  currentPage?: string;
  onNavigate?: (page: string) => void;
} = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(currentPage || null);

  useEffect(() => {
    // Determine active section based on current route or currentPage prop
    if (currentPage) {
      setActiveSection(currentPage);
    } else {
      const path = location.pathname;
      if (path === "/" || path === "/home") {
        setActiveSection("home");
      } else if (path === "/about-us") {
        setActiveSection("about-us");
      } else if (path === "/acs-calendar" || path === "/calendar") {
        setActiveSection("calendar");
      } else if (path.startsWith("/mentor-mentee")) {
        setActiveSection("mentor-mentee");
      } else if (path.startsWith("/tinikling")) {
        setActiveSection("tinikling");
      }
    }
  }, [location, currentPage]);

  const linkCls = (key: string) =>
    `font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
      activeSection === key ? "text-blue-600" : "text-black"
    }`;

  const handleNavClick = (path: string, keyName: string) => {
    setActiveSection(keyName);
    if (onNavigate) {
      onNavigate(keyName);
    } else {
      navigate(path);
    }
  };

  const NavLink = ({
    to,
    keyName,
    labelDesktop,
    labelMobile,
  }: {
    to: string;
    keyName: string;
    labelDesktop: string;
    labelMobile?: string;
  }) => (
    <Link
      to={to}
      className={linkCls(keyName)}
      onClick={() => handleNavClick(to, keyName)}
    >
      <p className={`leading-[normal] whitespace-pre ${labelMobile ? "hidden sm:block" : ""}`}>
        {labelDesktop}
      </p>
      {labelMobile && (
        <p className="leading-[normal] whitespace-pre block sm:hidden">{labelMobile}</p>
      )}
    </Link>
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-8 px-2 md:px-6 relative">
      {/* Logo → home */}
      <Link
        to="/"
        className="md:hidden cursor-pointer"
        onClick={() => handleNavClick("/", "home")}
      >
        <ACSLogo size={48} />
      </Link>
      <Link
        to="/"
        className="hidden md:block cursor-pointer"
        onClick={() => handleNavClick("/", "home")}
      >
        <ACSLogo size={61} />
      </Link>

      {/* Navigation */}
      <div className="flex gap-2 md:gap-6 items-center">
        <NavLink to="/about-us" keyName="about-us" labelDesktop="About Us" />
        <NavLink to="/acs-calendar" keyName="calendar" labelDesktop="Calendar" />
        <NavLink
          to="/mentor-mentee"
          keyName="mentor-mentee"
          labelDesktop="Mentor/Mentee"
          labelMobile="Mentor"
        />
        <NavLink to="/tinikling" keyName="tinikling" labelDesktop="Tinikling" />
      </div>
    </div>
  );
}
