import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import CalendarPage from "./pages/CalendarPage";
import MentorMenteePage from "./pages/MentorMenteePage";
import TiniklingPage from "./pages/TiniklingPage";
import TiniklingSignUpPage from "./pages/TiniklingSignUpPage";
import MentorSignUpPage from "./pages/MentorSignUpPage";
import MenteeSignUpPage from "./pages/MenteeSignUpPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/acs-calendar" element={<CalendarPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/mentor-mentee" element={<MentorMenteePage />} />
        <Route path="/tinikling" element={<TiniklingPage />} />
        <Route path="/tinikling/sign-up" element={<TiniklingSignUpPage />} />
        <Route path="/mentor-mentee/mentor/sign-up" element={<MentorSignUpPage />} />
        <Route path="/mentor-mentee/mentee/sign-up" element={<MenteeSignUpPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

