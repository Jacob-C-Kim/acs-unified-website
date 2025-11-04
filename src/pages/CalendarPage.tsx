import { PageHeader } from "../components/shared/PageHeader";
import CalendarPageComponent from "../components/CalendarPage";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <PageHeader backgroundColor="rgb(255, 255, 255)" />
      <CalendarPageComponent />
    </div>
  );
}

