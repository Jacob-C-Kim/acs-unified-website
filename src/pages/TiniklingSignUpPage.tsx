import { PageHeader } from "../components/shared/PageHeader";
import TiniklingSignup from "../components/TiniklingSignup";

export default function TiniklingSignUpPage() {
  return (
    <div className="min-h-screen bg-[#FFD1ED] relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgba(255, 255, 255, 1)" alwaysVisible={true} />
      <TiniklingSignup />
    </div>
  );
}

