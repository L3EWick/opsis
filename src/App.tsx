import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Scene3D from './components/Scene3D';
import { MessageSquare } from 'lucide-react';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-transparent">
      {/* 3D Background Scene with Scroll Controls */}
      <Scene3D />

      {/* Header */}
      <div className="relative z-10">
        <Header scrollToSection={scrollToSection} />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/5521981905306"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-14 h-14 border border-black/30 flex items-center justify-center bg-white/80 backdrop-blur-md hover:bg-black hover:text-white transition-all duration-500 relative overflow-hidden shadow-lg"
          aria-label="Contato via WhatsApp"
        >
          <div className="absolute inset-0 bg-black/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
        </a>
      </div>
    </div>
  );
}

export default App;
