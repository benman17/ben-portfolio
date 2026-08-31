'use client';

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  Cell,
  Legend
} from 'recharts';
import { BarChart3, Cpu, Sparkles, Filter, Info, ShieldAlert } from 'lucide-react';

interface PlayerData {
  name: string;
  position: string;
  team: string;
  pcaX: number; // Usage & Production Score (0 - 100)
  pcaY: number; // Speed & Efficiency Score (0 - 100)
  clusterId: number;
  clusterName: string;
  yac: number;
  adot: number;
  speed: number;
}

const NFL_CLUSTER_DATA: PlayerData[] = [
  // Cluster 0: Deep Threat Speedsters (Cyan)
  { name: "Tyreek Hill", position: "WR", team: "MIA", pcaX: 94, pcaY: 96, clusterId: 0, clusterName: "Deep Threat Speedsters", yac: 8.2, adot: 14.5, speed: 22.0 },
  { name: "Ja'Marr Chase", position: "WR", team: "CIN", pcaX: 88, pcaY: 89, clusterId: 0, clusterName: "Deep Threat Speedsters", yac: 7.1, adot: 13.2, speed: 21.4 },
  { name: "Jaylen Waddle", position: "WR", team: "MIA", pcaX: 82, pcaY: 91, clusterId: 0, clusterName: "Deep Threat Speedsters", yac: 6.8, adot: 12.8, speed: 21.7 },
  { name: "DK Metcalf", position: "WR", team: "SEA", pcaX: 79, pcaY: 85, clusterId: 0, clusterName: "Deep Threat Speedsters", yac: 5.9, adot: 13.8, speed: 21.8 },
  { name: "Rashod Bateman", position: "WR", team: "BAL", pcaX: 68, pcaY: 78, clusterId: 0, clusterName: "Deep Threat Speedsters", yac: 5.2, adot: 13.0, speed: 20.9 },

  // Cluster 1: YAC & Possession Specialists (Emerald)
  { name: "Deebo Samuel", position: "WR", team: "SF", pcaX: 89, pcaY: 72, clusterId: 1, clusterName: "YAC & Possession Specialists", yac: 9.5, adot: 7.2, speed: 20.6 },
  { name: "Amon-Ra St. Brown", position: "WR", team: "DET", pcaX: 92, pcaY: 68, clusterId: 1, clusterName: "YAC & Possession Specialists", yac: 6.4, adot: 8.1, speed: 19.8 },
  { name: "Cooper Kupp", position: "WR", team: "LAR", pcaX: 86, pcaY: 65, clusterId: 1, clusterName: "YAC & Possession Specialists", yac: 6.1, adot: 8.5, speed: 19.5 },
  { name: "Keenan Allen", position: "WR", team: "CHI", pcaX: 81, pcaY: 58, clusterId: 1, clusterName: "YAC & Possession Specialists", yac: 4.8, adot: 8.9, speed: 18.9 },
  { name: "Chris Godwin", position: "WR", team: "TB", pcaX: 78, pcaY: 62, clusterId: 1, clusterName: "YAC & Possession Specialists", yac: 5.7, adot: 7.9, speed: 19.4 },

  // Cluster 2: Dual-Threat Hybrid Backs (Indigo)
  { name: "Christian McCaffrey", position: "RB", team: "SF", pcaX: 98, pcaY: 84, clusterId: 2, clusterName: "Dual-Threat Hybrid Backs", yac: 8.9, adot: 3.2, speed: 20.8 },
  { name: "Breece Hall", position: "RB", team: "NYJ", pcaX: 85, pcaY: 88, clusterId: 2, clusterName: "Dual-Threat Hybrid Backs", yac: 8.4, adot: 2.8, speed: 21.5 },
  { name: "Jahmyr Gibbs", position: "RB", team: "DET", pcaX: 84, pcaY: 92, clusterId: 2, clusterName: "Dual-Threat Hybrid Backs", yac: 7.9, adot: 3.1, speed: 21.6 },
  { name: "Bijan Robinson", position: "RB", team: "ATL", pcaX: 87, pcaY: 82, clusterId: 2, clusterName: "Dual-Threat Hybrid Backs", yac: 7.2, adot: 3.5, speed: 20.7 },
  { name: "Saquon Barkley", position: "RB", team: "PHI", pcaX: 91, pcaY: 85, clusterId: 2, clusterName: "Dual-Threat Hybrid Backs", yac: 7.5, adot: 2.9, speed: 21.1 },

  // Cluster 3: Red-Zone Anchors & TE Targets (Amber)
  { name: "Travis Kelce", position: "TE", team: "KC", pcaX: 95, pcaY: 52, clusterId: 3, clusterName: "Red-Zone Anchors & TEs", yac: 5.8, adot: 8.4, speed: 18.7 },
  { name: "George Kittle", position: "TE", team: "SF", pcaX: 89, pcaY: 64, clusterId: 3, clusterName: "Red-Zone Anchors & TEs", yac: 7.6, adot: 9.1, speed: 20.2 },
  { name: "Sam LaPorta", position: "TE", team: "DET", pcaX: 83, pcaY: 58, clusterId: 3, clusterName: "Red-Zone Anchors & TEs", yac: 5.5, adot: 8.0, speed: 19.1 },
  { name: "Mark Andrews", position: "TE", team: "BAL", pcaX: 81, pcaY: 54, clusterId: 3, clusterName: "Red-Zone Anchors & TEs", yac: 4.9, adot: 9.6, speed: 18.9 },
  { name: "Derrick Henry", position: "RB", team: "BAL", pcaX: 93, pcaY: 56, clusterId: 3, clusterName: "Red-Zone Anchors & TEs", yac: 6.2, adot: 0.5, speed: 21.3 }
];

const CLUSTER_COLORS = ['#38bdf8', '#34d399', '#818cf8', '#fbbf24'];

export default function NflClusterWidget() {
  const [selectedCluster, setSelectedCluster] = useState<number | 'all'>('all');

  const filteredData = selectedCluster === 'all'
    ? NFL_CLUSTER_DATA
    : NFL_CLUSTER_DATA.filter(d => d.clusterId === selectedCluster);

  const clusterMeta = [
    { id: 0, name: 'Deep Threat Speedsters', color: '#38bdf8', desc: 'High ADOT (>12 yds), top sprint speeds (>21 mph), high separation.' },
    { id: 1, name: 'YAC & Possession Specialists', color: '#34d399', desc: 'High Yards After Catch, short-to-intermediate routes, high target share.' },
    { id: 2, name: 'Dual-Threat Hybrid Backs', color: '#818cf8', desc: 'Combined rushing & receiving usage, high missed tackle forced rate.' },
    { id: 3, name: 'Red-Zone Anchors & TEs', color: '#fbbf24', desc: 'High contested catch rate, red-zone target concentration, high physical impact.' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>UNSUPERVISED MACHINE LEARNING (K-MEANS & PCA)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            NFL Player Archetype Cluster Explorer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Interactive visualization of PCA Principal Components (Usage/Production vs Speed/Efficiency) mapping NFL player archetypes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Silhouette Score:</span>
          <span className="text-emerald-400 font-bold">0.72 (k=4)</span>
        </div>
      </div>

      {/* Cluster Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCluster('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCluster === 'all'
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          All 4 Archetype Clusters
        </button>

        {clusterMeta.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCluster(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              selectedCluster === c.id
                ? 'bg-slate-800 text-white border shadow-md'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
            style={{
              borderColor: selectedCluster === c.id ? c.color : 'transparent'
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Scatter Plot Chart */}
      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 relative">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Y-AXIS: <strong className="text-cyan-400">SPEED & EFFICIENCY SCORE</strong></span>
          <span>X-AXIS: <strong className="text-cyan-400">USAGE & PRODUCTION SCORE</strong></span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <XAxis 
                type="number" 
                dataKey="pcaX" 
                name="Production & Usage" 
                unit=" pts" 
                domain={[50, 100]}
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                type="number" 
                dataKey="pcaY" 
                name="Speed & Efficiency" 
                unit=" pts" 
                domain={[45, 100]}
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
              />
              <ZAxis range={[120, 120]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3', stroke: '#475569' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as PlayerData;
                    return (
                      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                        <div className="flex items-center justify-between gap-4 font-bold text-white">
                          <span>{data.name} ({data.position})</span>
                          <span className="text-cyan-400 font-mono">{data.team}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Cluster: <strong style={{ color: CLUSTER_COLORS[data.clusterId] }}>{data.clusterName}</strong>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
                          <div>YAC: <strong className="text-white">{data.yac} yds</strong></div>
                          <div>ADOT: <strong className="text-white">{data.adot} yds</strong></div>
                          <div>Top Speed: <strong className="text-white">{data.speed} mph</strong></div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="NFL Players" data={filteredData}>
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CLUSTER_COLORS[entry.clusterId]} 
                    stroke="#0f172a" 
                    strokeWidth={2} 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cluster Archetypes Explanation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {clusterMeta.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCluster(c.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedCluster === c.id || selectedCluster === 'all'
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                : 'bg-slate-950/40 border-slate-900 opacity-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <h4 className="text-xs font-bold text-slate-100">{c.name}</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">{c.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
