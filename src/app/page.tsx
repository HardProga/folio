import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import StreamSchedule from "@/components/StreamSchedule";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <Stats />
      <div className="section-divider" />
      <Services />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Portfolio />
      <div className="section-divider" />
      <StreamSchedule />
      <div className="section-divider" />
      <Blog />
      <div className="section-divider" />
      <Contact />
    </>
  );
}
