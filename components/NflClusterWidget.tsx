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
  Cell
} from 'recharts';
import { Cpu } from 'lucide-react';

interface PlayerPoint {
  name: string;
  position: string;
  team: string;
  points: number; // PPR + IDP fantasy points
  vor: number;    // value over replacement
  tier: number;   // 0 = best
}

// Output of the repo pipeline (data/processed/nfl_player_tiers_2024.csv).
// The bundled sample dataset includes placeholder records (e.g. "Player_DL_77")
// so the pipeline runs without an API key.
const PLAYERS: PlayerPoint[] = [
  { name: "L.Jackson", position: 'QB', team: 'BAL', points: 399.0, vor: 293.7, tier: 0 },
  { name: "J.Burrow", position: 'QB', team: 'CIN', points: 307.0, vor: 201.7, tier: 0 },
  { name: "J.Allen", position: 'QB', team: 'BUF', points: 370.0, vor: 264.7, tier: 0 },
  { name: "B.Mayfield", position: 'QB', team: 'TB', points: 306.0, vor: 200.7, tier: 0 },
  { name: "J.Daniels", position: 'QB', team: 'WAS', points: 324.0, vor: 218.7, tier: 0 },
  { name: "P.Mahomes", position: 'QB', team: 'KC', points: 279.0, vor: 173.7, tier: 0 },
  { name: "J.Hurts", position: 'QB', team: 'PHI', points: 314.0, vor: 208.7, tier: 0 },
  { name: "J.Goff", position: 'QB', team: 'DET', points: 271.5, vor: 166.2, tier: 1 },
  { name: "A.Richardson", position: 'QB', team: 'IND', points: 157.0, vor: 51.7, tier: 2 },
  { name: "T.Tagovailoa", position: 'QB', team: 'MIA', points: 159.0, vor: 53.7, tier: 2 },
  { name: "D.Maye", position: 'QB', team: 'NE', points: 184.0, vor: 78.7, tier: 2 },
  { name: "B.Young", position: 'QB', team: 'CAR', points: 166.0, vor: 60.7, tier: 2 },
  { name: "S.Barkley", position: 'RB', team: 'PHI', points: 351.0, vor: 285.8, tier: 0 },
  { name: "D.Henry", position: 'RB', team: 'BAL', points: 320.0, vor: 254.8, tier: 0 },
  { name: "B.Robinson", position: 'RB', team: 'ATL', points: 318.0, vor: 252.8, tier: 0 },
  { name: "J.Gibbs", position: 'RB', team: 'DET', points: 331.0, vor: 265.8, tier: 0 },
  { name: "D.Achane", position: 'RB', team: 'MIA', points: 284.0, vor: 218.8, tier: 0 },
  { name: "J.Jacobs", position: 'RB', team: 'GB', points: 267.0, vor: 201.8, tier: 0 },
  { name: "A.Kamara", position: 'RB', team: 'NO', points: 240.0, vor: 174.8, tier: 0 },
  { name: "J.Taylor", position: 'RB', team: 'IND', points: 225.0, vor: 159.8, tier: 1 },
  { name: "K.Walker III", position: 'RB', team: 'SEA', points: 203.0, vor: 137.8, tier: 1 },
  { name: "C.Brown", position: 'RB', team: 'CIN', points: 223.0, vor: 157.8, tier: 1 },
  { name: "J.Chase", position: 'WR', team: 'CIN', points: 384.5, vor: 292.6, tier: 0 },
  { name: "J.Jefferson", position: 'WR', team: 'MIN', points: 304.0, vor: 212.1, tier: 0 },
  { name: "A.St. Brown", position: 'WR', team: 'DET', points: 304.0, vor: 212.1, tier: 0 },
  { name: "C.Lamb", position: 'WR', team: 'DAL', points: 270.0, vor: 178.1, tier: 0 },
  { name: "N.Collins", position: 'WR', team: 'HOU', points: 224.0, vor: 132.1, tier: 1 },
  { name: "M.Nabers", position: 'WR', team: 'NYG', points: 246.0, vor: 154.1, tier: 1 },
  { name: "B.Thomas Jr.", position: 'WR', team: 'JAX', points: 265.0, vor: 173.1, tier: 0 },
  { name: "P.Nacua", position: 'WR', team: 'LAR', points: 208.0, vor: 116.1, tier: 1 },
  { name: "A.Brown", position: 'WR', team: 'PHI', points: 215.0, vor: 123.1, tier: 1 },
  { name: "T.McLaurin", position: 'WR', team: 'WAS', points: 235.0, vor: 143.1, tier: 1 },
  { name: "T.Higgins", position: 'WR', team: 'CIN', points: 203.0, vor: 111.1, tier: 1 },
  { name: "Z.Flowers", position: 'WR', team: 'BAL', points: 202.0, vor: 110.1, tier: 1 },
  { name: "B.Bowers", position: 'TE', team: 'LV', points: 256.0, vor: 198.0, tier: 0 },
  { name: "G.Kittle", position: 'TE', team: 'SF', points: 216.0, vor: 158.0, tier: 1 },
  { name: "T.McBride", position: 'TE', team: 'ARI', points: 204.5, vor: 146.5, tier: 1 },
  { name: "T.Kelce", position: 'TE', team: 'KC', points: 197.0, vor: 139.0, tier: 1 },
  { name: "T.Watt", position: 'LB', team: 'PIT', points: 176.5, vor: 128.5, tier: 1 },
  { name: "F.Warner", position: 'LB', team: 'SF', points: 231.5, vor: 183.5, tier: 0 },
  { name: "R.Smith", position: 'LB', team: 'BAL', points: 232.5, vor: 184.5, tier: 0 },
  { name: "M.Garrett", position: 'DL', team: 'CLE', points: 132.5, vor: 83.2, tier: 2 },
  { name: "T.Hendrickson", position: 'DL', team: 'CIN', points: 139.0, vor: 89.7, tier: 1 },
  { name: "K.Hamilton", position: 'DB', team: 'BAL', points: 159.5, vor: 95.3, tier: 1 },
  { name: "X.McKinney", position: 'DB', team: 'GB', points: 169.0, vor: 104.8, tier: 1 },
  { name: "Player_RB_1", position: 'RB', team: 'TB', points: 117.0, vor: 51.8, tier: 2 },
  { name: "Player_TE_2", position: 'TE', team: 'BUF', points: 110.8, vor: 52.8, tier: 2 },
  { name: "Player_LB_3", position: 'LB', team: 'NE', points: 88.7, vor: 40.7, tier: 2 },
  { name: "Player_RB_5", position: 'RB', team: 'WAS', points: 125.8, vor: 60.6, tier: 2 },
  { name: "Player_RB_6", position: 'RB', team: 'BAL', points: 164.4, vor: 99.2, tier: 1 },
  { name: "Player_QB_7", position: 'QB', team: 'CIN', points: 185.2, vor: 79.9, tier: 2 },
  { name: "Player_QB_8", position: 'QB', team: 'LV', points: 65.8, vor: -39.5, tier: 3 },
  { name: "Player_RB_9", position: 'RB', team: 'ATL', points: 86.2, vor: 21.0, tier: 3 },
  { name: "Player_DL_10", position: 'DL', team: 'ATL', points: 49.3, vor: 0.0, tier: 3 },
  { name: "Player_WR_11", position: 'WR', team: 'DAL', points: 133.7, vor: 41.8, tier: 2 },
  { name: "Player_LB_12", position: 'LB', team: 'LAC', points: 67.5, vor: 19.5, tier: 3 },
  { name: "Player_TE_13", position: 'TE', team: 'NYG', points: 102.2, vor: 44.2, tier: 2 },
  { name: "Player_LB_14", position: 'LB', team: 'MIA', points: 94.0, vor: 46.0, tier: 2 },
  { name: "Player_WR_15", position: 'WR', team: 'TEN', points: 124.9, vor: 33.0, tier: 2 },
  { name: "Player_DL_16", position: 'DL', team: 'TEN', points: 167.9, vor: 118.6, tier: 1 },
  { name: "Player_RB_17", position: 'RB', team: 'ARI', points: 127.2, vor: 62.1, tier: 2 },
  { name: "Player_DL_18", position: 'DL', team: 'ARI', points: 132.1, vor: 82.8, tier: 2 },
  { name: "Player_WR_19", position: 'WR', team: 'PIT', points: 113.4, vor: 21.5, tier: 3 },
  { name: "Player_DB_20", position: 'DB', team: 'CIN', points: 76.0, vor: 11.8, tier: 3 },
  { name: "Player_LB_21", position: 'LB', team: 'DEN', points: 145.3, vor: 97.3, tier: 1 },
  { name: "Player_QB_22", position: 'QB', team: 'WAS', points: 117.8, vor: 12.5, tier: 3 },
  { name: "Player_QB_23", position: 'QB', team: 'CIN', points: 159.3, vor: 54.0, tier: 2 },
  { name: "Player_WR_24", position: 'WR', team: 'HOU', points: 145.9, vor: 54.0, tier: 2 },
  { name: "Player_QB_25", position: 'QB', team: 'DEN', points: 77.5, vor: -27.8, tier: 3 },
  { name: "Player_WR_26", position: 'WR', team: 'DAL', points: 91.9, vor: 0.0, tier: 3 },
  { name: "Player_TE_27", position: 'TE', team: 'IND', points: 90.9, vor: 33.0, tier: 2 },
  { name: "Player_QB_28", position: 'QB', team: 'CLE', points: 130.3, vor: 25.1, tier: 3 },
  { name: "Player_TE_29", position: 'TE', team: 'KC', points: 106.8, vor: 48.8, tier: 2 },
  { name: "Player_RB_30", position: 'RB', team: 'ATL', points: 111.7, vor: 46.5, tier: 2 },
  { name: "Player_RB_31", position: 'RB', team: 'PHI', points: 100.4, vor: 35.2, tier: 2 },
  { name: "Player_QB_32", position: 'QB', team: 'DEN', points: 200.3, vor: 95.0, tier: 1 },
  { name: "Player_RB_33", position: 'RB', team: 'PHI', points: 166.1, vor: 100.9, tier: 1 },
  { name: "Player_TE_34", position: 'TE', team: 'GB', points: 66.6, vor: 8.6, tier: 3 },
  { name: "Player_DL_35", position: 'DL', team: 'JAX', points: 103.3, vor: 54.1, tier: 2 },
  { name: "Player_TE_36", position: 'TE', team: 'CIN', points: 71.0, vor: 13.0, tier: 3 },
  { name: "Player_WR_37", position: 'WR', team: 'NYG', points: 180.5, vor: 88.6, tier: 1 },
  { name: "Player_RB_38", position: 'RB', team: 'SF', points: 164.6, vor: 99.4, tier: 1 },
  { name: "Player_RB_39", position: 'RB', team: 'BUF', points: 111.8, vor: 46.6, tier: 2 },
  { name: "Player_WR_40", position: 'WR', team: 'GB', points: 185.7, vor: 93.8, tier: 1 },
  { name: "Player_WR_41", position: 'WR', team: 'SF', points: 128.4, vor: 36.5, tier: 2 },
  { name: "Player_DB_42", position: 'DB', team: 'TEN', points: 84.4, vor: 20.2, tier: 3 },
  { name: "Player_RB_43", position: 'RB', team: 'DET', points: 100.0, vor: 34.8, tier: 2 },
  { name: "Player_TE_44", position: 'TE', team: 'TB', points: 78.0, vor: 20.0, tier: 3 },
  { name: "Player_WR_45", position: 'WR', team: 'LAC', points: 138.7, vor: 46.8, tier: 2 },
  { name: "Player_RB_46", position: 'RB', team: 'BUF', points: 110.6, vor: 45.4, tier: 2 },
  { name: "Player_QB_47", position: 'QB', team: 'DAL', points: 116.3, vor: 11.0, tier: 3 },
  { name: "Player_WR_48", position: 'WR', team: 'ATL', points: 152.1, vor: 60.2, tier: 2 },
  { name: "Player_DB_49", position: 'DB', team: 'GB', points: 71.8, vor: 7.6, tier: 3 },
  { name: "Player_LB_50", position: 'LB', team: 'JAX', points: 87.7, vor: 39.7, tier: 2 },
  { name: "Player_TE_51", position: 'TE', team: 'KC', points: 117.0, vor: 59.0, tier: 2 },
  { name: "Player_QB_52", position: 'QB', team: 'DEN', points: 153.2, vor: 47.9, tier: 2 },
  { name: "Player_DL_53", position: 'DL', team: 'TEN', points: 111.3, vor: 62.1, tier: 2 },
  { name: "Player_WR_54", position: 'WR', team: 'SF', points: 144.9, vor: 53.1, tier: 2 },
  { name: "Player_RB_55", position: 'RB', team: 'KC', points: 106.3, vor: 41.1, tier: 2 },
  { name: "Player_RB_56", position: 'RB', team: 'MIN', points: 84.5, vor: 19.4, tier: 3 },
  { name: "Player_RB_57", position: 'RB', team: 'WAS', points: 179.0, vor: 113.8, tier: 1 },
  { name: "Player_WR_58", position: 'WR', team: 'HOU', points: 153.0, vor: 61.1, tier: 2 },
  { name: "Player_TE_59", position: 'TE', team: 'KC', points: 105.0, vor: 47.0, tier: 2 },
  { name: "Player_QB_60", position: 'QB', team: 'CHI', points: 176.0, vor: 70.7, tier: 2 },
  { name: "Player_DB_61", position: 'DB', team: 'NO', points: 121.4, vor: 57.1, tier: 2 },
  { name: "Player_WR_62", position: 'WR', team: 'CIN', points: 195.3, vor: 103.4, tier: 1 },
  { name: "Player_DB_63", position: 'DB', team: 'TEN', points: 125.4, vor: 61.2, tier: 2 },
  { name: "Player_QB_64", position: 'QB', team: 'SEA', points: 207.5, vor: 102.2, tier: 1 },
  { name: "Player_TE_65", position: 'TE', team: 'WAS', points: 105.3, vor: 47.3, tier: 2 },
  { name: "Player_TE_66", position: 'TE', team: 'MIN', points: 116.4, vor: 58.4, tier: 2 },
  { name: "Player_TE_67", position: 'TE', team: 'CIN', points: 93.0, vor: 35.0, tier: 2 },
  { name: "Player_WR_68", position: 'WR', team: 'KC', points: 106.3, vor: 14.4, tier: 3 },
  { name: "Player_QB_69", position: 'QB', team: 'PHI', points: 132.2, vor: 26.9, tier: 3 },
  { name: "Player_DB_70", position: 'DB', team: 'KC', points: 64.2, vor: 0.0, tier: 3 },
  { name: "Player_RB_71", position: 'RB', team: 'DEN', points: 143.5, vor: 78.3, tier: 2 },
  { name: "Player_TE_72", position: 'TE', team: 'KC', points: 118.2, vor: 60.2, tier: 2 },
  { name: "Player_RB_73", position: 'RB', team: 'GB', points: 152.8, vor: 87.7, tier: 1 },
  { name: "Player_WR_74", position: 'WR', team: 'BAL', points: 141.9, vor: 50.1, tier: 2 },
  { name: "Player_QB_75", position: 'QB', team: 'KC', points: 208.3, vor: 103.0, tier: 1 },
  { name: "Player_WR_76", position: 'WR', team: 'DAL', points: 102.9, vor: 11.0, tier: 3 },
  { name: "Player_DL_77", position: 'DL', team: 'TB', points: 132.7, vor: 83.4, tier: 2 },
  { name: "Player_RB_78", position: 'RB', team: 'NYG', points: 120.2, vor: 55.0, tier: 2 },
  { name: "Player_DL_79", position: 'DL', team: 'MIA', points: 95.5, vor: 46.2, tier: 2 },
  { name: "Player_TE_80", position: 'TE', team: 'GB', points: 126.0, vor: 68.0, tier: 2 },
  { name: "Player_WR_81", position: 'WR', team: 'MIN', points: 104.8, vor: 12.9, tier: 3 },
  { name: "Player_TE_82", position: 'TE', team: 'HOU', points: 58.0, vor: 0.0, tier: 3 },
  { name: "Player_WR_84", position: 'WR', team: 'DET', points: 138.2, vor: 46.3, tier: 2 },
  { name: "Player_QB_85", position: 'QB', team: 'PIT', points: 97.7, vor: -7.6, tier: 3 },
  { name: "Player_TE_86", position: 'TE', team: 'ARI', points: 122.4, vor: 64.4, tier: 2 },
  { name: "Player_RB_87", position: 'RB', team: 'JAX', points: 121.0, vor: 55.8, tier: 2 },
  { name: "Player_DL_88", position: 'DL', team: 'PIT', points: 113.9, vor: 64.6, tier: 2 },
  { name: "Player_RB_89", position: 'RB', team: 'DAL', points: 111.3, vor: 46.1, tier: 2 },
  { name: "Player_RB_90", position: 'RB', team: 'HOU', points: 154.4, vor: 89.2, tier: 1 },
  { name: "Player_RB_91", position: 'RB', team: 'KC', points: 122.6, vor: 57.4, tier: 2 },
  { name: "Player_TE_92", position: 'TE', team: 'SEA', points: 86.7, vor: 28.7, tier: 3 },
  { name: "Player_WR_93", position: 'WR', team: 'PIT', points: 129.5, vor: 37.6, tier: 2 },
  { name: "Player_DL_94", position: 'DL', team: 'DET', points: 110.6, vor: 61.3, tier: 2 },
  { name: "Player_RB_95", position: 'RB', team: 'TB', points: 122.7, vor: 57.5, tier: 2 },
  { name: "Player_WR_96", position: 'WR', team: 'TB', points: 132.2, vor: 40.3, tier: 2 },
  { name: "Player_RB_97", position: 'RB', team: 'CAR', points: 168.8, vor: 103.7, tier: 1 },
  { name: "Player_WR_98", position: 'WR', team: 'CIN', points: 104.5, vor: 12.6, tier: 3 },
  { name: "Player_LB_99", position: 'LB', team: 'NYJ', points: 48.0, vor: 0.0, tier: 3 },
  { name: "Player_WR_100", position: 'WR', team: 'LV', points: 152.9, vor: 61.0, tier: 2 },
  { name: "Player_QB_101", position: 'QB', team: 'DAL', points: 80.4, vor: -24.9, tier: 3 },
  { name: "Player_RB_102", position: 'RB', team: 'WAS', points: 139.8, vor: 74.7, tier: 2 },
  { name: "Player_RB_103", position: 'RB', team: 'ARI', points: 65.2, vor: 0.0, tier: 3 },
  { name: "Player_WR_104", position: 'WR', team: 'DEN', points: 128.0, vor: 36.1, tier: 2 },
  { name: "Player_QB_105", position: 'QB', team: 'DEN', points: 105.3, vor: 0.0, tier: 3 },
  { name: "Player_RB_106", position: 'RB', team: 'BUF', points: 109.5, vor: 44.3, tier: 2 },
  { name: "Player_TE_107", position: 'TE', team: 'CAR', points: 104.3, vor: 46.4, tier: 2 },
  { name: "Player_TE_108", position: 'TE', team: 'NE', points: 111.5, vor: 53.6, tier: 2 },
  { name: "Player_RB_109", position: 'RB', team: 'MIA', points: 150.6, vor: 85.5, tier: 1 },
  { name: "Player_WR_110", position: 'WR', team: 'NYJ', points: 157.3, vor: 65.4, tier: 2 },
  { name: "Player_RB_111", position: 'RB', team: 'LAC', points: 117.5, vor: 52.3, tier: 2 },
  { name: "Player_WR_112", position: 'WR', team: 'NYJ', points: 119.6, vor: 27.7, tier: 3 },
  { name: "Player_WR_113", position: 'WR', team: 'IND', points: 156.5, vor: 64.6, tier: 2 },
  { name: "Player_WR_114", position: 'WR', team: 'CAR', points: 119.5, vor: 27.6, tier: 3 },
  { name: "Player_RB_115", position: 'RB', team: 'TEN', points: 129.7, vor: 64.5, tier: 2 },
  { name: "Player_RB_116", position: 'RB', team: 'JAX', points: 160.9, vor: 95.7, tier: 1 },
  { name: "Player_WR_117", position: 'WR', team: 'MIA', points: 200.3, vor: 108.4, tier: 1 },
  { name: "Player_WR_118", position: 'WR', team: 'BAL', points: 142.4, vor: 50.5, tier: 2 },
  { name: "Player_WR_119", position: 'WR', team: 'KC', points: 159.5, vor: 67.6, tier: 2 },
  { name: "Player_WR_120", position: 'WR', team: 'HOU', points: 150.2, vor: 58.3, tier: 2 }
];

const TIERS = [
  { id: 0, name: 'Tier 1 — Elite', color: '#38bdf8', desc: 'VOR 173 to 294 · 22 players' },
  { id: 1, name: 'Tier 2 — High-End Starters', color: '#34d399', desc: 'VOR 85 to 166 · 36 players' },
  { id: 2, name: 'Tier 3 — Average', color: '#818cf8', desc: 'VOR 33 to 83 · 73 players' },
  { id: 3, name: 'Tier 4 — Below Replacement', color: '#fbbf24', desc: 'VOR -40 to 29 · 32 players' }
];

export default function NflClusterWidget() {
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');

  const filteredData = selectedTier === 'all'
    ? PLAYERS
    : PLAYERS.filter(d => d.tier === selectedTier);

  return (
    <div className="bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 space-y-6 font-mono">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1a20] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] mb-1">
            <Cpu className="w-4 h-4" />
            <span>K-MEANS ON VALUE OVER REPLACEMENT</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            NFL Fantasy Draft Tiers
          </h3>
          <p className="text-xs text-[#8a8a8a] mt-1">
            Sample run on the repo&apos;s bundled 2024 dataset (163 players, includes placeholder records). k=4 chosen with elbow, silhouette and gap statistic.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black p-2 border border-[#1a1a20] text-xs font-mono">
          <span className="text-[#8a8a8a]">Silhouette:</span>
          <span className="text-[#34d399] font-bold">0.57 (k=4)</span>
        </div>
      </div>

      {/* Tier Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTier('all')}
          className={`px-3.5 py-1.5 text-xs font-bold transition-all border ${
            selectedTier === 'all'
              ? 'border-white text-white bg-white/10'
              : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
          }`}
        >
          All Tiers
        </button>
        {TIERS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedTier(c.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold transition-all border flex items-center gap-2 ${
              selectedTier === c.id
                ? 'text-white bg-white/10 font-bold'
                : 'border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
            }`}
            style={{ borderColor: selectedTier === c.id ? c.color : undefined }}
          >
            <span className="w-2 h-2" style={{ backgroundColor: c.color }} />
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Scatter Plot */}
      <div className="bg-black p-4 border border-[#1a1a20] relative">
        <div className="flex items-center justify-between text-xs font-mono text-[#8a8a8a] mb-2">
          <span>Y-AXIS: <strong className="text-[#38bdf8]">VALUE OVER REPLACEMENT</strong></span>
          <span>X-AXIS: <strong className="text-[#38bdf8]">FANTASY POINTS (PPR + IDP)</strong></span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <XAxis type="number" dataKey="points" name="Fantasy points" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="vor" name="VOR" stroke="#64748b" tick={{ fontSize: 11 }} />
              <ZAxis range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3', stroke: '#1a1a20' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const p = payload[0].payload as PlayerPoint;
                    return (
                      <div className="bg-[#08080c] border border-[#2a2a35] p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between gap-4 font-bold text-white">
                          <span>{p.name} ({p.position})</span>
                          <span className="text-[#38bdf8] font-mono">{p.team}</span>
                        </div>
                        <div className="text-[11px] text-[#8a8a8a] font-mono">
                          <strong style={{ color: TIERS[p.tier].color }}>{TIERS[p.tier].name}</strong>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a1a20] text-[10px] font-mono text-neutral-300">
                          <div>Points: <strong className="text-white">{p.points}</strong></div>
                          <div>VOR: <strong className="text-white">{p.vor}</strong></div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Players" data={filteredData}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TIERS[entry.tier].color} stroke="#050505" strokeWidth={1} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TIERS.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedTier(c.id)}
            className={`p-3.5 border transition-all cursor-pointer ${
              selectedTier === c.id
                ? 'bg-[#08080c] border-white'
                : selectedTier === 'all'
                ? 'bg-[#08080c] border-[#1a1a20] hover:border-white'
                : 'bg-black border-[#1a1a20] opacity-40 hover:opacity-70'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2" style={{ backgroundColor: c.color }} />
              <h4 className="text-xs font-bold text-white">{c.name}</h4>
            </div>
            <p className="text-[11px] text-[#8a8a8a] leading-snug">{c.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
