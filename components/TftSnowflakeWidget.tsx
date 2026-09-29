'use client';

import React, { useState } from 'react';
import {
  Database,
  Code,
  Layers,
  Terminal,
  Zap
} from 'lucide-react';

// Computed from the project's raw data (TFT_CSV_DATA.zip): Set 3, Korean ranked,
// Platinum–Challenger. 399,906 player boards / 49,977 matches after removing
// duplicate rows and rows with an invalid placement. Traits with 5,000+ boards.
const TRAIT_RESULTS = [
  { trait: 'Starship', boards: '23.2K', top4: '69.0%', avgPlacement: '3.53' },
  { trait: 'Mercenary', boards: '127.3K', top4: '60.6%', avgPlacement: '3.94' },
  { trait: 'Valkyrie', boards: '178.6K', top4: '54.9%', avgPlacement: '4.24' },
  { trait: 'Mystic', boards: '140.9K', top4: '53.4%', avgPlacement: '4.30' },
  { trait: 'Sorcerer', boards: '136.0K', top4: '49.2%', avgPlacement: '4.54' },
  { trait: 'Vanguard', boards: '191.0K', top4: '48.1%', avgPlacement: '4.59' }
];

const LEVEL_RESULTS = [
  { level: 'Level 7', top4: '26.9%', avgPlacement: '5.71' },
  { level: 'Level 8', top4: '51.3%', avgPlacement: '4.41' },
  { level: 'Level 9', top4: '86.6%', avgPlacement: '2.60' }
];

const PIPELINE_STEPS = [
  { name: '5 ranked CSVs', desc: 'Platinum, Diamond, Master, Grandmaster, Challenger — ~80K player boards each.' },
  { name: 'Internal stage + file format', desc: 'Files uploaded to a Snowflake stage; CSV format handles quoted fields, headers and null strings.' },
  { name: 'COPY INTO matches', desc: 'One load per rank tier, tagging each row with its tier and parsing the nested trait/champion text into VARIANT.' },
  { name: 'Analysis queries', desc: 'LATERAL FLATTEN unpacks the trait VARIANT so placement can be aggregated per trait and per player level.' },
  { name: 'Power BI dashboard', desc: 'Live Snowflake connection; KPIs, placement by rank tier, and trait effectiveness.' }
];

export default function TftSnowflakeWidget() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'sql' | 'synergies'>('architecture');

  const tabClass = (tab: typeof activeTab) =>
    `px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 border ${
      activeTab === tab
        ? 'border-white text-white bg-white/10 font-bold'
        : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
    }`;

  return (
    <div className="bg-[#08080c] border border-[#1a1a20] p-6 space-y-6 overflow-hidden font-mono">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a20] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
            <Database className="w-4 h-4" />
            <span>SNOWFLAKE + POWER BI</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight font-sans">
            TFT Ranked Match Analysis
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-black p-1.5 border border-[#1a1a20] self-start sm:self-auto">
          <button onClick={() => setActiveTab('architecture')} className={tabClass('architecture')}>
            <Layers className="w-3.5 h-3.5" />
            <span>PIPELINE</span>
          </button>
          <button onClick={() => setActiveTab('sql')} className={tabClass('sql')}>
            <Code className="w-3.5 h-3.5" />
            <span>SQL</span>
          </button>
          <button onClick={() => setActiveTab('synergies')} className={tabClass('synergies')}>
            <Zap className="w-3.5 h-3.5" />
            <span>FINDINGS</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Pipeline */}
      {activeTab === 'architecture' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-black p-5 border border-[#1a1a20] space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>LOAD PIPELINE</span>
            </h4>

            <ol className="space-y-2 text-xs font-mono">
              {PIPELINE_STEPS.map((s, i) => (
                <li key={s.name} className="p-3 bg-[#08080c] border border-[#1a1a20] flex gap-3">
                  <span className="text-[#8a8a8a]">{String(i + 1).padStart(2, '0')}</span>
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">{s.name}</span>
                    <span className="text-[11px] text-[#8a8a8a]">{s.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Tab 2: SQL */}
      {activeTab === 'sql' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>TRAIT PERFORMANCE QUERY</span>
            </div>
            <span className="text-[#8a8a8a]">FLATTEN over VARIANT</span>
          </div>

          <pre className="font-mono text-xs text-white bg-black p-4 border border-[#1a1a20] overflow-x-auto whitespace-pre leading-relaxed">
{`-- Top-4 rate and average placement per trait
SELECT
  REPLACE(t.key, 'Set3_', '')                         AS trait,
  COUNT(*)                                            AS boards,
  ROUND(AVG(m.placement), 2)                          AS avg_placement,
  ROUND(AVG(IFF(m.placement <= 4, 1, 0)) * 100, 1)    AS top_4_rate_pct
FROM matches m,
     LATERAL FLATTEN(input => m.traits) t
WHERE m.placement BETWEEN 1 AND 8
GROUP BY 1
HAVING COUNT(*) >= 5000
ORDER BY avg_placement;`}
          </pre>
        </div>
      )}

      {/* Tab 3: Findings */}
      {activeTab === 'synergies' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-black p-5 border border-[#1a1a20] space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
              TRAIT RESULTS · SET 3 · KR RANKED · 49,977 MATCHES
            </h4>

            <div className="space-y-2.5">
              {TRAIT_RESULTS.map((s) => (
                <div key={s.trait} className="p-3 bg-[#08080c] border border-[#1a1a20] flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{s.trait}</span>
                    <span className="text-[10px] text-[#8a8a8a]">{s.boards} boards</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[#8a8a8a] text-[10px] block">Avg Place</span>
                      <span className="text-[#38bdf8] font-bold">{s.avgPlacement}</span>
                    </div>
                    <div>
                      <span className="text-[#8a8a8a] text-[10px] block">Top-4 Rate</span>
                      <span className="text-[#34d399] font-bold">{s.top4}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider pt-2">
              PLAYER LEVEL AT END OF GAME
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {LEVEL_RESULTS.map((l) => (
                <div key={l.level} className="p-3 bg-[#08080c] border border-[#1a1a20]">
                  <span className="text-white font-bold block">{l.level}</span>
                  <span className="text-[#34d399] font-bold block">{l.top4} top-4</span>
                  <span className="text-[10px] text-[#8a8a8a]">avg place {l.avgPlacement}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8a8a8a] leading-relaxed font-sans">
              Caveat: these are correlations, not trait strength. Starship is a single 5-cost unit, so it mostly
              shows up on boards that already reached a high level — and level alone separates outcomes more
              than any single trait.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
