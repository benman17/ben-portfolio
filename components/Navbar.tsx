'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Kanban, 
  User, 
  Briefcase, 
  Menu, 
  X, 
  Send,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';
import ContactModal from './ContactModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Scrum / PM', href: '/project-management', icon: Kanban },
    { name: 'About', href: '/about', icon: User },
    { name: 'GitHub', href: '/github', icon: GithubIcon },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & System Status Badge */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-black border border-white/20 flex items-center justify-center font-mono font-black text-white text-sm group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all shadow-md">
                BM
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight group-hover:text-cyan-400 transition-colors">
                  BEN MANGUIAT
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
                    Available for Roles
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-black/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/30 shadow-sm'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-neutral-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsContactOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-black bg-white hover:bg-neutral-200 shadow-md active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>CONTACT BEN</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-black border border-white/15 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 mt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold font-mono text-black bg-white hover:bg-neutral-200 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>CONTACT BEN</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contact Modal Trigger */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
