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
import WidgetFrame from '@/components/story/WidgetFrame';

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

// Ordinal ramp: the elite tier carries the accent, lower tiers fade to grey.
const TIERS = [
  { id: 0, name: 'Tier 1: Elite', fill: 'var(--accent)', opacity: 1, desc: 'VOR 173 to 294, 22 players' },
  { id: 1, name: 'Tier 2: High-end starters', fill: 'var(--accent)', opacity: 0.45, desc: 'VOR 85 to 166, 36 players' },
  { id: 2, name: 'Tier 3: Average', fill: 'var(--ink-3)', opacity: 0.75, desc: 'VOR 33 to 83, 73 players' },
  { id: 3, name: 'Tier 4: Below replacement', fill: 'var(--chart)', opacity: 1, desc: 'VOR -40 to 29, 32 players' }
];

export default function NflClusterWidget() {
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');

  const filteredData = selectedTier === 'all'
    ? PLAYERS
    : PLAYERS.filter(d => d.tier === selectedTier);

  return (
    <WidgetFrame
      title="The tiers"
      note="Sample run on the repo's bundled 2024 dataset (163 players, includes placeholder records). k=4, silhouette 0.57."
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter players by tier">
        <button
          type="button"
          aria-pressed={selectedTier === 'all'}
          onClick={() => setSelectedTier('all')}
          className={`min-h-10 border px-3 text-sm font-semibold transition-colors duration-150 ${
            selectedTier === 'all' ? 'border-ink bg-ink text-paper' : 'border-rule text-ink-2 hover:border-ink hover:text-ink'
          }`}
        >
          All tiers
        </button>
        {TIERS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={selectedTier === t.id}
            onClick={() => setSelectedTier(t.id)}
            className={`inline-flex min-h-10 items-center gap-2 border px-3 text-sm font-semibold transition-colors duration-150 ${
              selectedTier === t.id ? 'border-ink bg-ink text-paper' : 'border-rule text-ink-2 hover:border-ink hover:text-ink'
            }`}
          >
            <svg aria-hidden width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill={t.fill} fillOpacity={t.opacity} /></svg>
            {t.name}
          </button>
        ))}
      </div>

      <figure className="m-0 mt-6">
        <figcaption className="mb-2 flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm text-ink-3">
          <span><span className="font-semibold text-ink">Vertical:</span> value over replacement (VOR)</span>
          <span><span className="font-semibold text-ink">Horizontal:</span> fantasy points (PPR + IDP)</span>
        </figcaption>
        <div className="h-80 w-full border-y border-rule sm:h-96" role="img" aria-label={`Scatter plot of ${filteredData.length} players by fantasy points and value over replacement, colored by tier.`}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 16, right: 12, bottom: 8, left: -8 }}>
              <XAxis type="number" dataKey="points" name="Fantasy points" stroke="var(--rule-strong)" tick={{ fontSize: 12, fill: 'var(--ink-3)' }} tickLine={false} />
              <YAxis type="number" dataKey="vor" name="VOR" stroke="var(--rule-strong)" tick={{ fontSize: 12, fill: 'var(--ink-3)' }} tickLine={false} />
              <ZAxis range={[54, 54]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3', stroke: 'var(--rule-strong)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const p = payload[0].payload as PlayerPoint;
                    return (
                      <div className="border border-rule bg-paper px-3 py-2 text-sm shadow-[0_6px_20px_-8px_rgba(21,23,28,0.25)]">
                        <p className="font-bold text-ink">{p.name} <span className="font-normal text-ink-3">{p.position}, {p.team}</span></p>
                        <p className="text-ink-3">{TIERS[p.tier].name}</p>
                        <p className="tnum mt-1 text-ink-2">{p.points} pts, VOR {p.vor}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Players" data={filteredData} isAnimationActive={false}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TIERS[entry.tier].fill} fillOpacity={TIERS[entry.tier].opacity} stroke="var(--paper)" strokeWidth={1} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </figure>

      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => (
          <div key={t.id}>
            <dt className="flex items-center gap-2 font-semibold text-ink">
              <svg aria-hidden width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill={t.fill} fillOpacity={t.opacity} /></svg>
              {t.name}
            </dt>
            <dd className="tnum mt-0.5 pl-[18px] text-ink-3">{t.desc}</dd>
          </div>
        ))}
      </dl>
    </WidgetFrame>
  );
}
