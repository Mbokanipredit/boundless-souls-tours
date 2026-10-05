import React from "react";
import HomeLayout from "../home/layout";
import CustomExperienceBuilder from "../home/components/custom-experience-builder/custom-experience-builder";

export const metadata = {
  title: "Plan Your Trip - Boundless Souls Tours",
  description:
    "Your Journey. Your Way. Create a personalized itinerary for gorilla trekking, Akagera safaris, luxury stays, private drivers, and chefs.",
};

export default function PlanTripPage() {
  return (
    <HomeLayout>
      <main className="bg-slate-950 text-white min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <CustomExperienceBuilder />
        </div>
      </main>
    </HomeLayout>
  );
}
