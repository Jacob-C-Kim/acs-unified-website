import { PageHeader } from "../components/shared/PageHeader";
import InteractiveFrame22 from "../components/InteractiveFrame22";
import EventsSection from "../components/EventsSection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (page: string) => {
    if (page === 'calendar') {
      navigate('/acs-calendar');
    } else if (page === 'about-us') {
      navigate('/about-us');
    } else if (page === 'mentor-mentee') {
      navigate('/mentor-mentee');
    } else if (page === 'tinikling') {
      navigate('/tinikling');
    } else if (page === 'home') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <PageHeader />
      <InteractiveFrame22 />
      <EventsSection onNavigate={handleNavigation} />
      <Footer />
    </div>
  );
}

