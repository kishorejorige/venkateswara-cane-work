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
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;