'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ContactModal from './ContactModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'ANALYTICS', href: '/analytics' },
    { name: 'SCRUM / PM', href: '/project-management' },
    { name: 'ABOUT', href: '/about' },
    { name: 'GITHUB', href: '/github' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#050505]/90 backdrop-blur-md border-b border-[#1a1a20]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Architectural Identity */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-sm sm:text-base tracking-widest font-mono group-hover:text-cyan-400 transition-colors">
                  BEN MANGUIAT
                </span>
                <span className="text-[10px] font-mono text-[#8a8a8a] tracking-wider uppercase">
                  Data · Systems · Scrum
                </span>
              </div>
            </Link>

            {/* Minimalist Architectural Horizontal Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 text-xs font-mono tracking-wider transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-[#8a8a8a] hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Minimalist CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-4 py-2 text-xs font-mono font-bold tracking-wider text-white border border-[#2a2a35] hover:border-white hover:bg-white hover:text-black transition-all"
              >
                CONTACT →
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#8a8a8a] hover:text-white"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Minimalist Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#050505] border-b border-[#1a1a20] px-6 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-mono tracking-wider transition-colors ${
                    isActive ? 'text-white font-bold border-l-2 border-white pl-3' : 'text-[#8a8a8a] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#1a1a20]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="w-full text-center py-2.5 text-xs font-mono font-bold tracking-wider text-black bg-white"
              >
                CONTACT BEN →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
