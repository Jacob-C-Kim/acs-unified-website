import { PageHeader } from "../components/shared/PageHeader";
import MentorMenteePageComponent from "../components/MentorMenteePage";
import { useNavigate } from "react-router-dom";

export default function MentorMenteePage() {
  const navigate = useNavigate();

  const handleNavigation = (page: string) => {
    if (page === 'mentor-signup') {
      navigate('/mentor-mentee/mentor/sign-up');
    } else if (page === 'mentee-signup') {
      navigate('/mentor-mentee/mentee/sign-up');
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgb(255, 255, 255)" />
      <MentorMenteePageComponent onNavigate={handleNavigation} hideHeader={true} />
    </div>
  );
}

