import React, { useEffect, useState } from 'react';
import { Eye, Palette, Video, Users, Lightbulb, MessageCircle, MessageSquare } from 'lucide-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsLoaded(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-end gap-px text-2xl font-light tracking-widest cursor-pointer hover:opacity-70 transition-opacity duration-500"
              style={{ fontFamily: '"Apple Symbols", sans-serif' }}
              onClick={() => scrollToSection('hero')}
            >
              <span>Ο</span>
              <span className="pb-[2px]">ψ</span>
              <span>Σ</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['sobre', 'servicos', 'portfolio', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm uppercase tracking-wider hover:text-white/70 transition-colors duration-300"
                >
                  {item === 'servicos' ? 'Serviços' : 
                   item === 'portfolio' ? 'Portfólio' : 
                   item === 'contato' ? 'Contato' : 'Sobre'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="text-center space-y-8">
          <div 
            className={`transition-all duration-2000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
           <div className="flex justify-center items-end mb-6">
             <span className="text-[9rem] md:text-[11rem] font-extralight tracking-widest" style={{ fontFamily: '"Apple Symbols", sans-serif' }}>
               Ο
             </span>
             <span className="text-[9rem] md:text-[11rem] font-extralight tracking-widest pb-4" style={{ fontFamily: '"Apple Symbols", sans-serif' }}>
               ψ
             </span>
             <span className="text-[9rem] md:text-[11rem] font-extralight tracking-widest" style={{ fontFamily: '"Apple Symbols", sans-serif' }}>
               Σ
             </span>
           </div>
            <p className="text-xl md:text-2xl font-light tracking-wide text-white/90 mb-12">
              Sua marca com alma, forma e presença.
            </p>
          </div>
          
          <button
            onClick={() => scrollToSection('sobre')}
            className={`border border-white/30 px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            Explorar
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="sobre" 
        data-animate
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1500 ${
              visibleSections.has('sobre') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-12 tracking-wide">
              Sobre a Opsis
            </h2>
            <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-white/90">
              <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Somos uma agência que cria silêncio visual.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Exploramos formas, ruídos e contrastes para dar identidade a ideias.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Design e vídeo como extensão do olhar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="servicos" 
        data-animate
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div 
            className={`transition-all duration-1500 ${
              visibleSections.has('servicos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-16 text-center tracking-wide">
              Serviços
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { icon: Palette, title: 'Criação de arte visual', desc: 'Artes estáticas sofisticadas e impactantes' },
                { icon: Eye, title: 'Identidade gráfica', desc: 'Identidade visual única para sua marca' },
                { icon: Video, title: 'Edição e montagem de vídeos', desc: 'Estética cinematográfica e narrativa visual' },
                { icon: Lightbulb, title: 'Direção de estética visual', desc: 'Conceituação e direção criativa' },
                { icon: Users, title: 'Consultoria de identidade de marca', desc: 'Estratégia visual para marcas, produtos e pessoas' },
                { icon: MessageCircle, title: 'Experiência sensorial', desc: 'Criação de atmosferas visuais únicas' }
              ].map((service, index) => (
                <div 
                  key={service.title}
                  className="group text-center space-y-4 p-6 border border-white/10 hover:border-white/30 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <service.icon className="w-8 h-8 mx-auto text-white/70 group-hover:text-white transition-colors duration-300" />
                  <h3 className="text-lg font-light tracking-wide">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section 
        id="portfolio" 
        data-animate
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1500 ${
              visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-12 tracking-wide">
              Portfólio
            </h2>
            <div className="border border-white/20 p-16 md:p-24">
              <p className="text-xl md:text-2xl font-light text-white/80 italic">
                Cada trabalho, um manifesto visual.
              </p>
              <div className="mt-8 text-sm text-white/50">
                Em breve, nossos projetos estarão aqui
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contato" 
        data-animate
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1500 ${
              visibleSections.has('contato') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-12 tracking-wide">
              Contato
            </h2>
            <p className="text-xl md:text-2xl font-light mb-12 text-white/90">
              Tem uma ideia? Deixe que a gente traduza.
            </p>
            <a 
              href="https://wa.me/5521981905306" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border border-white/30 px-12 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Fale com a Opsis
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Button - Fixed bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => window.open('https://wa.me/5521981905306', '_blank')}
          className="w-14 h-14 border border-white/30 flex items-center justify-center bg-black/80 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500 group"
          aria-label="Contato via WhatsApp"
        >
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-white/50 tracking-wider">
            © 2024 OPSIS — Sua marca com alma, forma e presença.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;