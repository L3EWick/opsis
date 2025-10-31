import React, { useEffect, useState } from 'react';
import { Eye, Palette, Video, Users, Lightbulb, MessageCircle, MessageSquare, Code, Zap, Cpu, Database, Smartphone, Globe, Settings } from 'lucide-react';
import Scene3D from './components/Scene3D';

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
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none z-0 animate-shimmer" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none z-0 animate-pulse-glow" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-end cursor-pointer hover:opacity-70 transition-opacity duration-500"
              style={{ fontFamily: '"Apple Symbols", sans-serif' }}
              onClick={() => scrollToSection('hero')}
            >
              <span className="text-2xl font-light tracking-normal pr-[2px]">Ο</span>
              <span className="text-2xl font-light pb-[2px] px-[1px]">ψ</span>
              <span className="text-2xl font-light tracking-normal pl-[2px]">Σ</span>
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
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <div className="text-center space-y-8">
          <div 
            className={`transition-all duration-2000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
              <div className="flex justify-center items-end mb-6 relative">
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
                  <div className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-float" />
                </div>
                <span
                  className="text-[9rem] md:text-[11rem] font-extralight pr-[10px] relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] animate-float"
                  style={{ fontFamily: '"Apple Symbols", sans-serif', animationDelay: '0s' }}
                >
                  Ο
                </span>
                <span
                  className="text-[9rem] md:text-[11rem] font-extralight pb-4 px-[4px] relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] animate-float"
                  style={{ fontFamily: '"Apple Symbols", sans-serif', animationDelay: '0.2s' }}
                >
                  ψ
                </span>
                <span
                  className="text-[9rem] md:text-[11rem] font-extralight pl-[10px] relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] animate-float"
                  style={{ fontFamily: '"Apple Symbols", sans-serif', animationDelay: '0.4s' }}
                >
                  Σ
                </span>
              </div>
            <p className="text-xl md:text-2xl font-light tracking-wide text-white/90 mb-12">
              Sua marca com alma, forma e presença.<br />
              <span className="text-lg md:text-xl text-white/70">Tecnologia que transforma.</span>
            </p>
          </div>
          
          <button
            onClick={() => scrollToSection('sobre')}
            className={`relative border border-white/40 px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 group overflow-hidden backdrop-blur-sm ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Explorar</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-white/70 via-white/50 to-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/70 animate-ping" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="sobre" 
        data-animate
        className="min-h-screen flex items-center justify-center px-6 relative z-10"
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
                Somos uma agência que une criatividade visual e tecnologia.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Exploramos formas, ruídos e contrastes para dar identidade a ideias. Desenvolvemos software e automações que transformam processos.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Design e vídeo como extensão do olhar. Tecnologia como extensão da eficiência.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                Criamos soluções completas: do visual ao funcional, da identidade aos sistemas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="servicos" 
        data-animate
        className="min-h-screen flex items-center justify-center px-6 relative z-10"
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
                { icon: MessageCircle, title: 'Experiência sensorial', desc: 'Criação de atmosferas visuais únicas' },
                { icon: Code, title: 'Desenvolvimento de software', desc: 'Soluções personalizadas e sistemas sob medida' },
                { icon: Zap, title: 'Automações e integrações', desc: 'Automatize processos e conecte seus sistemas' },
                { icon: Cpu, title: 'Sistemas inteligentes', desc: 'Tecnologia que transforma seu negócio' },
                { icon: Database, title: 'Gestão de dados', desc: 'Organização e otimização de informações' },
                { icon: Smartphone, title: 'Aplicativos móveis', desc: 'Apps nativos e soluções multiplataforma' },
                { icon: Globe, title: 'Sistemas web', desc: 'Plataformas web modernas e escaláveis' }
              ].map((service, index) => (
                <div 
                  key={service.title}
                  className="group text-center space-y-4 p-8 border border-white/10 hover:border-white/40 transition-all duration-700 relative overflow-hidden bg-black/30 backdrop-blur-md hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
                  <service.icon className="w-10 h-10 mx-auto text-white/70 group-hover:text-white transition-all duration-500 relative z-10 group-hover:scale-125 group-hover:rotate-12" />
                  <h3 className="text-lg font-light tracking-wide relative z-10 group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed relative z-10 group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/0 group-hover:bg-white/30 transition-all duration-500" />
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
        className="min-h-screen flex items-center justify-center px-6 relative z-10"
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
            <div className="border border-white/30 p-16 md:p-24 relative bg-black/30 backdrop-blur-md overflow-hidden group hover:border-white/50 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
              <p className="text-xl md:text-2xl font-light text-white/90 italic relative z-10 group-hover:scale-105 transition-transform duration-500">
                Cada trabalho, um manifesto visual.
              </p>
              <div className="mt-8 text-sm text-white/60 relative z-10 group-hover:text-white/80 transition-colors duration-500">
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
        className="min-h-screen flex items-center justify-center px-6 relative z-10"
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
              className="relative inline-block border border-white/40 px-12 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 group overflow-hidden backdrop-blur-sm hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
              <span className="relative z-10 group-hover:tracking-wider transition-all duration-300 group-hover:scale-105 inline-block">
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
          className="w-14 h-14 border border-white/30 flex items-center justify-center bg-black/60 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 group relative overflow-hidden"
          aria-label="Contato via WhatsApp"
        >
          <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 relative z-10 bg-black/40 backdrop-blur-sm">
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
