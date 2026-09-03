'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Code, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Terminal,
  Zap
} from 'lucide-react';

export default function TftSnowflakeWidget() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'sql' | 'synergies'>('architecture');

  const metaSynergies = [
    { trait: 'Heartsteel', patch14_1: '64.2%', patch14_4: '71.8%', avgPlacement: '3.4', tier: 'S-Tier Meta' },
    { trait: 'KDA / Spellweaver', patch14_1: '58.9%', patch14_4: '68.5%', avgPlacement: '3.8', tier: 'A-Tier Meta' },
    { trait: 'Pentakill Executioner', patch14_1: '52.1%', patch14_4: '64.2%', avgPlacement: '4.1', tier: 'A-Tier Meta' },
    { trait: 'True Damage / Yasuo', patch14_1: '48.5%', patch14_4: '55.1%', avgPlacement: '4.5', tier: 'B-Tier Meta' }
  ];

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
            <Database className="w-4 h-4" />
            <span>CLOUD DATA WAREHOUSE & ANALYTICS PREVIEW</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Snowflake TFT Synergy Data Pipeline
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>STAR SCHEMA</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>SQL CTE QUERY</span>
          </button>

          <button
            onClick={() => setActiveTab('synergies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'synergies'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>META WIN RATES</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-4 animate-fadeIn">
          
          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>SNOWFLAKE STAR SCHEMA MODEL</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              
              {/* Fact Table */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-2 md:col-span-1">
                <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold text-[10px] inline-block">
                  FACT TABLE
                </span>
                <div className="text-white font-bold">fact_tft_match</div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>• match_id <span className="text-slate-500">(FK)</span></div>
                  <div>• player_id <span className="text-slate-500">(FK)</span></div>
                  <div>• trait_id <span className="text-slate-500">(FK)</span></div>
                  <div>• placement <span className="text-emerald-400">(Metric)</span></div>
                  <div>• game_version</div>
                </div>
              </div>

              {/* Dim Tables */}
              <div className="space-y-2 md:col-span-2">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>dim_tft_traits</span>
                    <span className="text-[10px] text-slate-500">1:* Relationship</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Stores champion trait names, tier thresholds (2/4/6/8), and synergy bonuses.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>dim_tft_champions</span>
                    <span className="text-[10px] text-slate-500">1:* Relationship</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Stores champion gold costs, origins, classes, and base stats.</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>dim_tft_items</span>
                    <span className="text-[10px] text-slate-500">1:* Relationship</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Stores component item combinations, artifact modifiers, and radiant tier variants.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Tab 2: SQL CTE Query */}
      {activeTab === 'sql' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>SNOWFLAKE SQL ANALYTICAL CTE QUERY</span>
            </div>
            <span className="text-slate-500">Window Functions & Aggregations</span>
          </div>

          <pre className="font-mono text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed">
{`-- Snowflake Analytical Query: Trait Synergy Win Rates
WITH TraitSynergies AS (
  SELECT 
    f.match_id,
    d.trait_name,
    d.tier_level,
    f.placement,
    CASE WHEN f.placement <= 4 THEN 1 ELSE 0 END AS top_4_finish
  FROM fact_tft_match f
  JOIN dim_tft_traits d ON f.trait_id = d.trait_id
  WHERE f.game_version >= '14.1'
)
SELECT 
  trait_name,
  tier_level,
  COUNT(match_id) AS total_games,
  AVG(placement) AS avg_placement,
  ROUND(SUM(top_4_finish) * 100.0 / COUNT(match_id), 2) AS top_4_rate_pct
FROM TraitSynergies
GROUP BY trait_name, tier_level
HAVING COUNT(match_id) >= 50
ORDER BY top_4_rate_pct DESC;`}
          </pre>
        </div>
      )}

      {/* Tab 3: Meta Win Rates */}
      {activeTab === 'synergies' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              REAL META SYNERGY WIN RATES (PATCH 14.1 - 14.4)
            </h4>

            <div className="space-y-2.5">
              {metaSynergies.map((s) => (
                <div key={s.trait} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-100 block">{s.trait}</span>
                    <span className="text-[10px] text-emerald-400">{s.tier}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Avg Place</span>
                      <span className="text-cyan-300 font-bold">{s.avgPlacement}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">Top-4 Rate</span>
                      <span className="text-emerald-400 font-bold">{s.patch14_4}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
