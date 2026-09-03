'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BarChart3, 
  Database, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Maximize2
} from 'lucide-react';

export default function NorthstarDashboardWidget() {
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'insights'>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="bg-[#08080c] border border-[#1a1a20] p-6 space-y-6 overflow-hidden">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a20] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38bdf8]">
            <BarChart3 className="w-4 h-4" />
            <span>INTERACTIVE DASHBOARD SHOWCASE</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Northstar Commerce Power BI Command Center
          </h3>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 bg-black p-1.5 border border-[#1a1a20] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border border-white text-white bg-white/10 font-bold'
                : 'border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>EXECUTIVE VIEW</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border border-white text-white bg-white/10 font-bold'
                : 'border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>STAR SCHEMA MODEL</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'insights'
                ? 'border border-white text-white bg-white/10 font-bold'
                : 'border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ACTIONABLE INSIGHTS</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Executive Overview Dashboard */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Key Metrics Quick Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-black p-3.5 border border-[#1a1a20]">
              <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">Net Revenue</span>
              <span className="text-xl font-black font-mono text-[#38bdf8]">$5,937,210.71</span>
            </div>
            <div className="bg-black p-3.5 border border-[#1a1a20]">
              <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">Gross Profit</span>
              <span className="text-xl font-black font-mono text-[#34d399]">$2,289,785.30</span>
            </div>
            <div className="bg-black p-3.5 border border-[#1a1a20]">
              <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">Blended Margin</span>
              <span className="text-xl font-black font-mono text-indigo-400">38.57%</span>
            </div>
            <div className="bg-black p-3.5 border border-[#1a1a20]">
              <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">Order Transactions</span>
              <span className="text-xl font-black font-mono text-[#38bdf8]">63,635 Items</span>
            </div>
          </div>

          {/* Image Display */}
          <div className="relative overflow-hidden border border-[#1a1a20] bg-black group">
            <Image
              src="/images/projects/northstar_commerce/executive_overview.png"
              alt="Northstar Commerce Power BI Executive Command Center"
              width={1400}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="px-3 py-1.5 bg-[#08080c]/90 hover:bg-[#08080c] border border-[#2a2a35] hover:border-white text-[#38bdf8] hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isFullscreen ? 'COLLAPSE' : 'EXPAND PREVIEW'}</span>
              </button>
            </div>
          </div>

          {isFullscreen && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm p-4 sm:p-10 flex flex-col items-center justify-center overflow-auto animate-spatialExpand">
              <div className="max-w-6xl w-full space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white font-mono">Executive Command Center (Full View)</h4>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="px-4 py-2 bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all"
                  >
                    CLOSE PREVIEW ✕
                  </button>
                </div>
                <Image
                  src="/images/projects/northstar_commerce/executive_overview.png"
                  alt="Northstar Commerce Power BI Executive Command Center Full View"
                  width={1920}
                  height={1080}
                  className="w-full h-auto border border-[#1a1a20]"
                />
              </div>
            </div>
          )}

        </div>
      )}

      {/* Tab 2: Star Schema Data Model */}
      {activeTab === 'schema' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="relative overflow-hidden border border-[#1a1a20] bg-black">
            <Image
              src="/images/projects/northstar_commerce/data_model_star_schema.png"
              alt="PostgreSQL & Power BI Star Schema Relational Data Model"
              width={1400}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Relationship Table Breakdown */}
          <div className="bg-black p-5 border border-[#1a1a20] space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>RELATIONAL SCHEMATICS & CARDINALITY</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                <div className="font-mono text-[#38bdf8] font-bold">fact_order_items ➔ dim_orders</div>
                <div className="text-[#8a8a8a]">Foreign Key: <code className="text-white">order_id</code> (Many-to-One <code className="text-[#34d399]">* : 1</code>)</div>
              </div>

              <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                <div className="font-mono text-[#38bdf8] font-bold">fact_order_items ➔ dim_products</div>
                <div className="text-[#8a8a8a]">Foreign Key: <code className="text-white">product_id</code> (Many-to-One <code className="text-[#34d399]">* : 1</code>)</div>
              </div>

              <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                <div className="font-mono text-[#38bdf8] font-bold">dim_orders ➔ dim_customers</div>
                <div className="text-[#8a8a8a]">Foreign Key: <code className="text-white">customer_id</code> (Many-to-One <code className="text-[#34d399]">* : 1</code>)</div>
              </div>

              <div className="p-3 bg-[#08080c] border border-[#1a1a20] space-y-1">
                <div className="font-mono text-[#38bdf8] font-bold">fact_returns ➔ dim_orders & dim_products</div>
                <div className="text-[#8a8a8a]">Composite Keys: <code className="text-white">order_id</code>, <code className="text-white">product_id</code></div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Actionable Insights */}
      {activeTab === 'insights' && (
        <div className="space-y-4 animate-fadeIn">
          
          <div className="bg-[#08080c] border border-[#1a1a20] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>MARGIN COMPRESSION IN ELECTRONICS</span>
            </div>
            <h4 className="text-sm font-bold text-white">High Revenue ($1.17M) vs. High Return & Discount Rate</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Electronics drives significant top-line volume but suffers from an average discount of <strong className="text-amber-300">7.62%</strong> and a return rate of <strong className="text-amber-300">7.26%</strong>. 
            </p>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-mono">
              ⚡ Action: Cap discretionary promotional discounts at 5% and initiate supplier quality audits on top returned SKUs.
            </div>
          </div>

          <div className="bg-[#08080c] border border-[#1a1a20] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>CATALOG METADATA LEAKAGE</span>
            </div>
            <h4 className="text-sm font-bold text-white">$231k Inventory Drag from "Unassigned" Products</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Unassigned inventory categories perform at a <strong className="text-rose-300">22.28% gross margin</strong>, nearly half the company baseline of 38.57%.
            </p>
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 font-mono">
              ⚡ Action: Implement strict ERP data validation rules blocking item creation without category classification.
            </div>
          </div>

          <div className="bg-[#08080c] border border-[#1a1a20] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>HIGH-MARGIN EXPANSION WINNER</span>
            </div>
            <h4 className="text-sm font-bold text-white">Accessories Delivers Peak Company Gross Margin (44.21%)</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Accessories delivers superior profitability with a low <strong className="text-[#34d399]">5.55% return rate</strong>.
            </p>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 font-mono">
              ⚡ Action: Reallocate 15% of underperforming marketing spend toward Accessories customer acquisition campaigns.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
