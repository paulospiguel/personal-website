import React from "react";
import AboutSection from "@/components/about";
import ContactSection from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import HeroSection from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import VideoIntroSection from "@/components/video-intro";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <HeroSection />
      <VideoIntroSection />
      <AboutSection />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <ContactSection />
    </div>
  );
}
