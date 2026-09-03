'use client';

import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon } from './icons/SocialIcons';
import { PROFILE_INFO } from '@/data/skills';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 overflow-hidden font-mono animate-spatialExpand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 border border-[#1a1a20] text-[#8a8a8a] hover:text-white hover:border-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4 font-mono">
            <div className="w-16 h-16 bg-[#34d399]/10 border border-[#34d399]/30 text-[#34d399] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Message Sent Successfully!</h3>
            <p className="text-sm text-[#8a8a8a]">
              Thank you for reaching out. Ben will get back to you shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Connect with Ben</h2>
              <p className="text-sm text-[#8a8a8a] mt-1 font-sans">
                Interested in data analytics, Scrum Master roles, or business systems analysis? Let's talk!
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="flex items-center gap-2 p-3 bg-black border border-[#1a1a20] text-neutral-300 hover:text-white hover:border-[#38bdf8] transition-all text-xs font-mono"
              >
                <Mail className="w-4 h-4 text-[#38bdf8]" />
                <span className="truncate">{PROFILE_INFO.email}</span>
              </a>
              <a
                href={PROFILE_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-black border border-[#1a1a20] text-neutral-300 hover:text-white hover:border-[#38bdf8] transition-all text-xs font-mono"
              >
                <LinkedinIcon className="w-4 h-4 text-[#38bdf8]" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-[#1a1a20] text-white placeholder-[#8a8a8a] text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-[#1a1a20] text-white placeholder-[#8a8a8a] text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about the project or role opportunities..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-[#1a1a20] text-white placeholder-[#8a8a8a] text-sm focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
