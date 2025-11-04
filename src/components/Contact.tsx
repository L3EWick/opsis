import { useEffect, useRef, useState } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function Contact() {
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
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="min-h-screen flex items-center justify-center px-6 relative z-10 py-20"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <div
          className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{
            transitionDelay: '0.1s',
            transform: `translateY(${scrollProgress * 30}px) scale(${0.95 + scrollProgress * 0.05})`,
            opacity: isVisible ? 0.4 + scrollProgress * 0.6 : 0,
          }}
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-black/50 mb-4 block">
            Vamos conversar
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight mb-6 md:mb-8 text-black transition-all duration-700"
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="inline-block">Tem uma ideia?</span>
            <br />
            <span className="inline-block text-black/60 transition-all duration-700" style={{ transitionDelay: '0.3s' }}>
              Deixe que traduzimos.
            </span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-black/70 mb-8 sm:mb-12 max-w-2xl mx-auto transition-all duration-700 px-4"
            style={{ transitionDelay: '0.4s' }}
          >
            Transformamos conceitos em experiências digitais memoráveis.
          </p>
          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transition-all duration-700 px-4"
            style={{ transitionDelay: '0.5s' }}
          >
            <a
              href="https://wa.me/5521981905306"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 border-2 border-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 overflow-hidden w-full sm:w-auto sm:min-w-[200px] justify-center"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">WhatsApp</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
