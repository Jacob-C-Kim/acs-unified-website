import { PageHeader } from "../components/shared/PageHeader";
import AboutUsPageComponent from "../components/AboutUsPage";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgb(255, 255, 255)" />
      <AboutUsPageComponent />
    </div>
  );
}

