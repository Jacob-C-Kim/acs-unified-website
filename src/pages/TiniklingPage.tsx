import { PageHeader } from "../components/shared/PageHeader";
import TinklingPageComponent from "../components/TinklingPage";

export default function TiniklingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgb(255, 255, 255)" />
      <TinklingPageComponent />
    </div>
  );
}

