import React from 'react';
import { PROFILE_INFO, SKILL_CATEGORIES } from '@/data/skills';
import { User, GraduationCap, CheckCircle2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 border-b border-slate-800 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
          <User className="w-3.5 h-3.5" />
          <span>ABOUT BEN MANGUIAT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Information Systems & Agile Analytics
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
          {PROFILE_INFO.bio}
        </p>

        {/* Quick Social & Contact links */}
        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href={PROFILE_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 font-medium text-xs transition-all"
          >
            <LinkedinIcon className="w-4 h-4 text-cyan-400" />
            <span>LinkedIn Profile ↗</span>
          </a>
          <a
            href={`https://github.com/${PROFILE_INFO.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 font-medium text-xs transition-all"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>GitHub Profile ↗</span>
          </a>
          <a
            href={`mailto:${PROFILE_INFO.email}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>{PROFILE_INFO.email}</span>
          </a>
        </div>
      </div>

      {/* Education Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Education & Academic Focus</h3>
            <p className="text-xs text-slate-400">Higher Education Degree</p>
          </div>
        </div>
        <div className="pt-2 space-y-2">
          <h4 className="text-xl font-bold text-cyan-400">{PROFILE_INFO.education}</h4>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Specialized coursework and practical project application in Database Design, Relational Data Modeling, Information Systems Strategy, Agile Software Development, Systems Analysis, and Data Mining.
          </p>
        </div>
      </div>

      {/* Complete Skills Matrix */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Comprehensive Technical & Management Skills Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              <p className="text-xs text-slate-400">{cat.subtitle}</p>

              <div className="space-y-3 pt-2">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={skill.highlight ? 'font-semibold text-cyan-300' : 'text-slate-300'}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          skill.highlight ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-slate-700'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
