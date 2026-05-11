import React from 'react';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import HowItWorks from './components/HowItWorks';
import ServicesGrid from './components/ServicesGrid';
import PhotoStrip from './components/PhotoStrip';
import Testimonials from './components/Testimonials';
import WhyChooseGrid from './components/WhyChooseGrid';
import ServiceArea from './components/ServiceArea';
import FAQ from './components/FAQ';
import AboutStory from './components/AboutStory';
import FooterCTA from './components/FooterCTA';
import SiteFooter from './components/SiteFooter';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const page = new URLSearchParams(window.location.search).get('page');
  if (page === 'privacy') return <PrivacyPolicy />;

  const scrollToWidget = () => {
    const el = document.getElementById('quote-anchor');
    if (el) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SiteHeader onCTA={scrollToWidget} />
      <main>
        <span id="quote-anchor" />
        <Hero onCTA={scrollToWidget} />
        <StatsBar />
        <HowItWorks />
        <ServicesGrid />
        <div style={{ paddingTop: 16, paddingBottom: 56 }}>
          <PhotoStrip />
        </div>
        <Testimonials />
        <WhyChooseGrid />
        <ServiceArea />
        <FAQ />
        <AboutStory />
        <FooterCTA onCTA={scrollToWidget} />
      </main>
      <SiteFooter />
    </>
  );
}
