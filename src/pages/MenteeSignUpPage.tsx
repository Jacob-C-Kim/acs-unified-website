import { PageHeader } from "../components/shared/PageHeader";
import MenteeSignup from "../components/MenteeSignup";

export default function MenteeSignUpPage() {
  return (
    <div className="min-h-screen bg-[#69d7e5] relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgba(255, 255, 255, 1)" alwaysVisible={true} />
      <MenteeSignup />
    </div>
  );
}

