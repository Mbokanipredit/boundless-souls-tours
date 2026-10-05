import HeroSection from "./components/hero-section/hero";
import AboutSection from "./components/about-section/about-section";
import RwandaExperiences from "./components/rwanda-experiences/rwanda-experiences";
import RwandaServices from "./components/rwanda-services/rwanda-services";
import GalleryPreview from "./components/gallery-preview/gallery-preview";
import WhyChooseUs from "./components/why-choose-us/why-choose-us";
import CustomExperienceBuilder from "./components/custom-experience-builder/custom-experience-builder";
import ReadyToExplore from "./components/ready-to-explore/ready-to-explore";
import CustomerReviewSection from "./components/customer-review-section/customer-review-section";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <HeroSection />
      <AboutSection />
      <RwandaExperiences />
      <RwandaServices />
      <GalleryPreview />
      <WhyChooseUs />
      <CustomExperienceBuilder />
      <ReadyToExplore />
      <CustomerReviewSection />
    </main>
  );
}
