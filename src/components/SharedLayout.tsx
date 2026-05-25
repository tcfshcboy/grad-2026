import { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "#bingo", label: "大會考 Bingo" },
    { href: "#before-after", label: "青澀對比" },
    { href: "#campus", label: "回眸校園" },
    { href: "#confession", label: "告白與感謝" }
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between z-50 relative bg-transparent">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg tracking-tight">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span>2026 畢業特別企劃</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {links.map(link => (
            <a key={link.href} href={link.href} className="hover:text-amber-500 transition-colors">{link.label}</a>
          ))}
        </div>

        <button 
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-md overflow-hidden z-40"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="block text-slate-600 font-medium hover:text-amber-500 transition-colors"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
      <div className="max-w-5xl mx-auto px-4">
        <GraduationCap className="w-8 h-8 mx-auto mb-4 text-slate-600" />
        <p className="font-bold text-white text-base sm:text-lg mb-2">🎓 祝所有畢業生鵬程萬里，前程似錦 !🍡</p>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} <a href="https://www.instagram.com/tcfsh_cboy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 underline underline-offset-2 transition-colors">TCFSH_CBOY</a>. 2026 畢業特別企劃.
        </p>
      </div>
    </footer>
  );
}
