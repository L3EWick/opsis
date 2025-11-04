import { useState, useEffect } from 'react';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'contato', label: 'Contato' },
];

export default function Header({ scrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/60 backdrop-blur-xl border-b border-black/10 shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-end cursor-pointer hover:opacity-70 transition-opacity duration-500 group"
            style={{ fontFamily: '"Apple Symbols", sans-serif' }}
            aria-label="Ir para o topo"
          >
            <span className="text-2xl font-light tracking-normal pr-[2px] group-hover:scale-110 transition-transform text-black">
              Ο
            </span>
            <span className="text-2xl font-light pb-[2px] px-[1px] group-hover:scale-110 transition-transform text-black">
              ψ
            </span>
            <span className="text-2xl font-light tracking-normal pl-[2px] group-hover:scale-110 transition-transform text-black">
              Σ
            </span>
          </button>

          {/* Navigation */}
          <div className="flex space-x-4 md:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-xs md:text-sm uppercase tracking-wider text-black/70 hover:text-black transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
