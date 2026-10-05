import Header from "./home/components/header-section/header";
import HeroSection from "./home/components/hero-section/hero";
import AboutSection from "./home/components/about-section/about-section";
import RwandaExperiences from "./home/components/rwanda-experiences/rwanda-experiences";
import RwandaServices from "./home/components/rwanda-services/rwanda-services";
import WhyChooseUs from "./home/components/why-choose-us/why-choose-us";
import CustomExperienceBuilder from "./home/components/custom-experience-builder/custom-experience-builder";
import ReadyToExplore from "./home/components/ready-to-explore/ready-to-explore";
import CustomerReviewSection from "./home/components/customer-review-section/customer-review-section";
import FooterSection from "./home/components/footer-section/footer-section";
import CurrencyModal from "./home/components/header-section/currency-modal/currency-modal";
import LanguageModal from "./home/components/header-section/language-modal/language-modal";

export default function RootPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-950 text-white min-h-screen">
        <HeroSection />
        <AboutSection />
        <RwandaExperiences />
        <RwandaServices />
        <WhyChooseUs />
        <CustomExperienceBuilder />
        <ReadyToExplore />
        <CustomerReviewSection />
      </main>
      <FooterSection />
      <CurrencyModal />
      <LanguageModal />
    </>
  );
}