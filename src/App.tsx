import { useState, useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { HowToOrder } from './components/HowToOrder';
import { CustomCta } from './components/CustomCta';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { MobileActionBar } from './components/MobileActionBar';
import { AdminApp } from './admin/AdminApp';

function AppContent() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="main-content">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <HowToOrder />
        <CustomCta />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
      <MobileActionBar />
    </div>
  );
}

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return window.location.hash === '#/admin' || window.location.hash.startsWith('#/admin');
  });

  useEffect(() => {
    const handleHashChange = () => {
      const isAdmin = window.location.hash === '#/admin' || window.location.hash.startsWith('#/admin');
      setIsAdminRoute(isAdmin);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigateHome = () => {
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  return (
    <LanguageProvider>
      {isAdminRoute ? (
        <AdminApp onNavigateHome={handleNavigateHome} />
      ) : (
        <AppContent />
      )}
    </LanguageProvider>
  );
}

export default App;