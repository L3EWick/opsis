export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-end" style={{ fontFamily: '"Apple Symbols", sans-serif' }}>
            <span className="text-xl font-light tracking-normal pr-[2px] text-black">Ο</span>
            <span className="text-xl font-light pb-[2px] px-[1px] text-black">ψ</span>
            <span className="text-xl font-light tracking-normal pl-[2px] text-black">Σ</span>
          </div>

          <p className="text-sm text-black/50 tracking-wider text-center md:text-left">
            © {currentYear} OPSIS — Sua marca com alma, forma e presença.
          </p>
        </div>
      </div>
    </footer>
  );
}
