import { useEffect, useRef, useState } from 'react';
import { Code, Palette, Zap, Settings, Smartphone, Database, BarChart3, Brush, Cloud } from 'lucide-react';

const services = [
  {
    title: 'Desenvolvimento Web',
    desc: 'Sites e aplicações web modernas, responsivas e de alta performance.',
    icon: Code,
  },
  {
    title: 'Desenvolvimento Mobile',
    desc: 'Apps iOS e Android nativos e multiplataforma para seu negócio.',
    icon: Smartphone,
  },
  {
    title: 'Automação de Processos',
    desc: 'Sistemas que otimizam processos, aumentam produtividade e reduzem custos.',
    icon: Zap,
  },
  {
    title: 'Sistemas Integrados',
    desc: 'Integração de sistemas e APIs para conectar sua infraestrutura tecnológica.',
    icon: Database,
  },
  {
    title: 'Consultoria Tecnológica',
    desc: 'Estratégia e planejamento para transformar seu negócio digitalmente.',
    icon: Settings,
  },
  {
    title: 'Análise de Dados',
    desc: 'Business intelligence e análise de dados para decisões estratégicas.',
    icon: BarChart3,
  },
  {
    title: 'Design Gráfico',
    desc: 'Identidade visual, branding e comunicação que destaca sua marca.',
    icon: Palette,
  },
  {
    title: 'UI/UX Design',
    desc: 'Interfaces intuitivas e experiências digitais focadas no usuário.',
    icon: Brush,
  },
  {
    title: 'Cloud & Infraestrutura',
    desc: 'Soluções em nuvem e infraestrutura escalável para seu negócio.',
    icon: Cloud,
  },
];

export default function Services() {
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
      id="servicos"
      className="min-h-screen flex items-center justify-center px-6 relative z-10 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`transition-all duration-1000 ease-out mb-16 text-center ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
            }`}
          style={{
            transitionDelay: '0.1s',
          }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-black/50 mb-4 block">
            O que fazemos
          </span>
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-black">
            Serviços
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const delay = index * 0.1;
            const staggerOffset = (index % 3) * 20 - 20;
            const row = Math.floor(index / 3);
            const scrollOffset = (scrollProgress * staggerOffset * 0.5);

            return (
              <div
                key={service.title}
                className={`group relative p-6 sm:p-8 border border-black/10 hover:border-black/30 transition-all duration-700 bg-white hover:bg-black/5 overflow-hidden ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${0.2 + delay}s`,
                  transform: isVisible
                    ? `translateY(${scrollOffset}px) scale(${0.9 + scrollProgress * 0.1}) rotateX(${scrollProgress * (index % 2 === 0 ? 2 : -2)}deg)`
                    : 'translateY(10px) scale(0.9)',
                  opacity: isVisible ? 0.3 + scrollProgress * 0.7 : 0,
                }}
                onMouseEnter={(e) => {
                  const currentScroll = scrollProgress;
                  const currentOffset = staggerOffset * 0.5;
                  e.currentTarget.style.transform = `translateY(${currentOffset - 10}px) scale(1.05) rotateX(0deg)`;
                }}
                onMouseLeave={(e) => {
                  const currentScroll = scrollProgress;
                  const currentOffset = staggerOffset * 0.5;
                  e.currentTarget.style.transform = `translateY(${currentOffset}px) scale(${0.9 + currentScroll * 0.1}) rotateX(${currentScroll * (index % 2 === 0 ? 2 : -2)}deg)`;
                }}
              >
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4 sm:mb-6 inline-block transition-all duration-500">
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black/70 group-hover:text-black group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-light tracking-wide mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-500 text-black">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/60 leading-relaxed group-hover:text-black/80 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-black/0 group-hover:bg-black/30 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
