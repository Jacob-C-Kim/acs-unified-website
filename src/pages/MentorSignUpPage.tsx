import { PageHeader } from "../components/shared/PageHeader";
import MentorSignup from "../components/MentorSignup";

export default function MentorSignUpPage() {
  return (
    <div className="min-h-screen bg-[#FFD1ED] relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgba(255, 255, 255, 1)" alwaysVisible={true} />
      <MentorSignup />
    </div>
  );
}

