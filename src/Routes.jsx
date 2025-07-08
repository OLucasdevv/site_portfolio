import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomeLandingPage from "pages/home-landing-page";
import Contact from "pages/contact";
import AboutMe from "pages/about-me";
import ProjectsPortfolio from "pages/projects-portfolio";
import ProjectDetailModal from "pages/project-detail-modal";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/projects-portfolio" element={<ProjectsPortfolio />} />
        <Route path="/project-detail-modal" element={<ProjectDetailModal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;