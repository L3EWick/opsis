import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="min-h-screen flex items-center justify-center px-6 relative z-10 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Title */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
              }`}
            style={{
              transitionDelay: '0.1s',
              transform: isVisible
                ? `translateX(${-scrollProgress * 50}px) scale(${0.95 + scrollProgress * 0.05}) rotateY(${-scrollProgress * 5}deg)`
                : 'translateX(-10px) scale(0.95)',
              opacity: isVisible ? 0.5 + scrollProgress * 0.5 : 0,
            }}
          >
            <div className="inline-block group">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-black/50 mb-4 block group-hover:text-black/70 transition-colors duration-300">
                Sobre Nós
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight leading-none text-black group-hover:translate-x-2 transition-transform duration-500">
                <span className="inline-block transition-all duration-700 ease-out" style={{ transitionDelay: '0.2s' }}>
                  Criamos
                </span>
                <br />
                <span className="inline-block text-black/60 group-hover:text-black transition-colors duration-500" style={{ transitionDelay: '0.3s' }}>
                  Experiências
                </span>
                <br />
                <span className="inline-block transition-all duration-700 ease-out" style={{ transitionDelay: '0.4s' }}>
                  Digitais
                </span>
              </h2>
            </div>
          </div>
          {/* Right Column - Content */}
          <div
            className={`space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl font-light leading-relaxed text-black/80 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
            style={{
              transitionDelay: '0.2s',
              transform: isVisible
                ? `translateX(${scrollProgress * 50}px) scale(${0.95 + scrollProgress * 0.05}) rotateY(${scrollProgress * 5}deg)`
                : 'translateX(10px) scale(0.95)',
              opacity: isVisible ? 0.5 + scrollProgress * 0.5 : 0,
            }}
          >
            <p className="border-l-2 border-black/20 pl-6 transition-all duration-700" style={{ transitionDelay: '0.3s' }}>
              Somos uma agência que une criatividade visual e tecnologia de
              ponta.
            </p>
            <p className="transition-all duration-700" style={{ transitionDelay: '0.4s' }}>
              Exploramos formas, contrastes e movimento para dar identidade
              única a ideias. Desenvolvemos software e automações que
              transformam processos.
            </p>
            <p className="transition-all duration-700" style={{ transitionDelay: '0.5s' }}>
              Design e vídeo como extensão do olhar. Tecnologia como extensão
              da eficiência.
            </p>
            <p className="text-black/60 italic transition-all duration-700" style={{ transitionDelay: '0.6s' }}>
              Criamos soluções completas: do visual ao funcional, da
              identidade aos sistemas.
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-black/10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.7s' }}>
          {[
            { number: '100+', label: 'Projetos' },
            { number: '50+', label: 'Clientes' },
            { number: '10+', label: 'Anos' },
            { number: '24/7', label: 'Suporte' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${0.8 + index * 0.1}s`,
                transform: isVisible
                  ? `translateY(${scrollProgress * 30 * (index % 2 === 0 ? 1 : -1)}px) scale(${0.9 + scrollProgress * 0.1})`
                  : 'translateY(10px) scale(0.9)',
                opacity: isVisible ? 0.3 + scrollProgress * 0.7 : 0,
              }}
            >
              <div className="text-4xl md:text-5xl font-extralight mb-2 group-hover:scale-110 transition-transform duration-500 text-black">
                {stat.number}
              </div>
              <div className="text-sm uppercase tracking-wider text-black/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
