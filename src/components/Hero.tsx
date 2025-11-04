import { useEffect, useState } from 'react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
    setTimeout(() => setActiveLetter(null), 800);
  };

  const handleLetterHover = (letter: string) => {
    if (!activeLetter) {
      setActiveLetter(letter);
    }
  };

  const handleLetterLeave = (letter: string) => {
    if (activeLetter === letter) {
      setActiveLetter(null);
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6">
      <div className="text-center space-y-8 max-w-5xl mx-auto">
        {/* Logo Principal */}
        <div className="relative">
          <div
            className={`flex justify-center items-end mb-6 relative transition-all duration-1000 ease-out ${isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
              }`}
            style={{
              transitionDelay: '0.1s',
              transform: `translateY(${-scrollProgress * 50}px) scale(${1 - scrollProgress * 0.1})`,
              opacity: 1 - scrollProgress * 0.5,
            }}
          >
            {/* Logo Letters */}
            <span
              onClick={() => handleLetterClick('O')}
              onMouseEnter={() => handleLetterHover('O')}
              onMouseLeave={() => handleLetterLeave('O')}
              className={`text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-extralight pr-[10px] relative z-10 text-black cursor-pointer transition-all duration-300 ease-out ${activeLetter === 'O'
                ? 'scale-[1.4] rotate-12 translate-y-[-20px] text-black/90'
                : 'animate-float hover:scale-125 hover:rotate-6 hover:translate-y-[-10px]'
                }`}
              style={{
                fontFamily: '"Apple Symbols", sans-serif',
                animationDelay: '0s',
                filter: activeLetter === 'O' ? 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' : 'none',
              }}
            >
              Ο
            </span>
            <span
              onClick={() => handleLetterClick('P')}
              onMouseEnter={() => handleLetterHover('P')}
              onMouseLeave={() => handleLetterLeave('P')}
              className={`text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-extralight pb-4 px-[4px] relative z-10 text-black cursor-pointer transition-all duration-300 ease-out ${activeLetter === 'P'
                ? 'scale-[1.4] -rotate-12 translate-y-[-20px] text-black/90'
                : 'animate-float hover:scale-125 hover:-rotate-6 hover:translate-y-[-10px]'
                }`}
              style={{
                fontFamily: '"Apple Symbols", sans-serif',
                animationDelay: '0.2s',
                filter: activeLetter === 'P' ? 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' : 'none',
              }}
            >
              ψ
            </span>
            <span
              onClick={() => handleLetterClick('S')}
              onMouseEnter={() => handleLetterHover('S')}
              onMouseLeave={() => handleLetterLeave('S')}
              className={`text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-extralight pl-[10px] relative z-10 text-black cursor-pointer transition-all duration-300 ease-out ${activeLetter === 'S'
                ? 'scale-[1.4] rotate-12 translate-y-[-20px] text-black/90'
                : 'animate-float hover:scale-125 hover:rotate-6 hover:translate-y-[-10px]'
                }`}
              style={{
                fontFamily: '"Apple Symbols", sans-serif',
                animationDelay: '0.4s',
                filter: activeLetter === 'S' ? 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' : 'none',
              }}
            >
              Σ
            </span>
          </div>

          {/* Tagline */}
          <div
            className={`space-y-4 transition-all duration-1000 ease-out ${isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide text-black/90 px-4">
              <span
                className="inline-block transition-all duration-700 ease-out"
                style={{ transitionDelay: '0.5s' }}
              >
                Sua marca com alma, forma e presença.
              </span>
            </p>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-black/60 transition-all duration-700 ease-out"
              style={{ transitionDelay: '0.7s' }}
            >
              Tecnologia que transforma.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <button
            onClick={() => scrollToSection('sobre')}
            className="relative border-2 border-black px-8 py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 group overflow-hidden"
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              Explorar
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
