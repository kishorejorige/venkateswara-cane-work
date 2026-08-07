import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { CustomCta } from './components/CustomCta';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';

function App() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="main-content">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <CustomCta />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}

export default App;