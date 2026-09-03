'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Code, 
  Layers, 
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
    <div className="bg-[#08080c] border border-[#1a1a20] p-6 space-y-6 overflow-hidden font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a20] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
            <Database className="w-4 h-4" />
            <span>CLOUD DATA WAREHOUSE & ANALYTICS PREVIEW</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight font-sans">
            Snowflake TFT Synergy Data Pipeline
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-black p-1.5 border border-[#1a1a20] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 border ${
              activeTab === 'architecture'
                ? 'border-white text-white bg-white/10 font-bold'
                : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>STAR SCHEMA</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 border ${
              activeTab === 'sql'
                ? 'border-white text-white bg-white/10 font-bold'
                : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>SQL CTE QUERY</span>
          </button>

          <button
            onClick={() => setActiveTab('synergies')}
            className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 border ${
              activeTab === 'synergies'
                ? 'border-white text-white bg-white/10 font-bold'
                : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
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
          
          <div className="bg-black p-5 border border-[#1a1a20] space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>SNOWFLAKE STAR SCHEMA MODEL</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              
              {/* Fact Table */}
              <div className="p-4 bg-[#08080c] border border-[#1a1a20] space-y-2 md:col-span-1">
                <span className="px-2 py-0.5 bg-white text-black font-mono font-bold text-[10px] inline-block">
                  FACT TABLE
                </span>
                <div className="text-white font-bold">fact_tft_match</div>
                <div className="space-y-1 text-neutral-300 text-[11px]">
                  <div>• match_id <span className="text-[#8a8a8a]">(FK)</span></div>
                  <div>• player_id <span className="text-[#8a8a8a]">(FK)</span></div>
                  <div>• trait_id <span className="text-[#8a8a8a]">(FK)</span></div>
                  <div>• placement <span className="text-[#34d399]">(Metric)</span></div>
                  <div>• game_version</div>
                </div>
              </div>

              {/* Dim Tables */}
              <div className="space-y-2 md:col-span-2">
                <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                  <div className="flex items-center justify-between text-[#38bdf8] font-bold">
                    <span>dim_tft_traits</span>
                    <span className="text-[10px] text-[#8a8a8a]">1:* Relationship</span>
                  </div>
                  <p className="text-[11px] text-[#8a8a8a]">Stores champion trait names, tier thresholds (2/4/6/8), and synergy bonuses.</p>
                </div>

                <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                  <div className="flex items-center justify-between text-[#38bdf8] font-bold">
                    <span>dim_tft_champions</span>
                    <span className="text-[10px] text-[#8a8a8a]">1:* Relationship</span>
                  </div>
                  <p className="text-[11px] text-[#8a8a8a]">Stores champion gold costs, origins, classes, and base stats.</p>
                </div>

                <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                  <div className="flex items-center justify-between text-[#38bdf8] font-bold">
                    <span>dim_tft_items</span>
                    <span className="text-[10px] text-[#8a8a8a]">1:* Relationship</span>
                  </div>
                  <p className="text-[11px] text-[#8a8a8a]">Stores component item combinations, artifact modifiers, and radiant tier variants.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Tab 2: SQL CTE Query */}
      {activeTab === 'sql' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>SNOWFLAKE SQL ANALYTICAL CTE QUERY</span>
            </div>
            <span className="text-[#8a8a8a]">Window Functions & Aggregations</span>
          </div>

          <pre className="font-mono text-xs text-white bg-black p-4 border border-[#1a1a20] overflow-x-auto whitespace-pre leading-relaxed">
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
          <div className="bg-black p-5 border border-[#1a1a20] space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
              REAL META SYNERGY WIN RATES (PATCH 14.1 - 14.4)
            </h4>

            <div className="space-y-2.5">
              {metaSynergies.map((s) => (
                <div key={s.trait} className="p-3 bg-[#08080c] border border-[#1a1a20] flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{s.trait}</span>
                    <span className="text-[10px] text-[#34d399]">{s.tier}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[#8a8a8a] text-[10px] block">Avg Place</span>
                      <span className="text-[#38bdf8] font-bold">{s.avgPlacement}</span>
                    </div>

                    <div>
                      <span className="text-[#8a8a8a] text-[10px] block">Top-4 Rate</span>
                      <span className="text-[#34d399] font-bold">{s.patch14_4}</span>
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
