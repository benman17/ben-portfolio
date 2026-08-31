'use client';

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { BarChart3, Database, Filter, Code, Sparkles, RefreshCw } from 'lucide-react';

const SANDBOX_DATA: Record<string, { month: string; revenue: number; orders: number; churnRate: number }[]> = {
  All: [
    { month: 'Jan', revenue: 142000, orders: 1240, churnRate: 3.4 },
    { month: 'Feb', revenue: 168000, orders: 1420, churnRate: 3.1 },
    { month: 'Mar', revenue: 195000, orders: 1650, churnRate: 2.8 },
    { month: 'Apr', revenue: 210000, orders: 1780, churnRate: 2.5 },
    { month: 'May', revenue: 245000, orders: 2010, churnRate: 2.2 },
    { month: 'Jun', revenue: 290000, orders: 2450, churnRate: 1.9 }
  ],
  Enterprise: [
    { month: 'Jan', revenue: 85000, orders: 420, churnRate: 1.2 },
    { month: 'Feb', revenue: 98000, orders: 480, churnRate: 1.0 },
    { month: 'Mar', revenue: 120000, orders: 580, churnRate: 0.9 },
    { month: 'Apr', revenue: 135000, orders: 640, churnRate: 0.8 },
    { month: 'May', revenue: 160000, orders: 750, churnRate: 0.7 },
    { month: 'Jun', revenue: 195000, orders: 920, churnRate: 0.5 }
  ],
  MidMarket: [
    { month: 'Jan', revenue: 57000, orders: 820, churnRate: 4.2 },
    { month: 'Feb', revenue: 70000, orders: 940, churnRate: 3.9 },
    { month: 'Mar', revenue: 75000, orders: 1070, churnRate: 3.5 },
    { month: 'Apr', revenue: 75000, orders: 1140, churnRate: 3.2 },
    { month: 'May', revenue: 85000, orders: 1260, churnRate: 2.9 },
    { month: 'Jun', revenue: 95000, orders: 1530, churnRate: 2.4 }
  ]
};

export default function AnalyticsSandbox() {
  const [segment, setSegment] = useState<'All' | 'Enterprise' | 'MidMarket'>('All');
  const [metricView, setMetricView] = useState<'revenue' | 'orders' | 'churnRate'>('revenue');

  const chartData = SANDBOX_DATA[segment];

  const generatedSql = `SELECT 
  DATE_TRUNC('month', order_date) AS month,
  ${
    metricView === 'revenue' 
      ? 'SUM(sales_amount) AS total_revenue' 
      : metricView === 'orders' 
      ? 'COUNT(order_id) AS total_orders' 
      : 'ROUND(AVG(churn_score), 2) AS churn_rate'
  }
FROM fact_sales f
JOIN dim_customer c ON f.customer_id = c.customer_id
WHERE c.customer_segment = '${segment}'
  AND f.order_date >= '2026-01-01'
GROUP BY 1
ORDER BY 1 ASC;`;

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>INTERACTIVE EXECUTIVE DATA SANDBOX</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Revenue & Churn Intelligence Engine
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Test custom filters to view dynamic metrics visualization and auto-generated SQL analytics queries.
          </p>
        </div>

        {/* Segment Filter Pills */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['All', 'Enterprise', 'MidMarket'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setSegment(seg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                segment === seg
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMetricView('revenue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            metricView === 'revenue'
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
              : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          Revenue Trend ($)
        </button>
        <button
          onClick={() => setMetricView('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            metricView === 'orders'
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
              : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          Total Orders Volume
        </button>
        <button
          onClick={() => setMetricView('churnRate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            metricView === 'churnRate'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
              : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          Customer Churn Rate (%)
        </button>
      </div>

      {/* Grid: Chart + Generated SQL Code snippet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Recharts Live Chart */}
        <div className="lg:col-span-2 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>METRIC: <strong className="text-white uppercase">{metricView}</strong></span>
            <span>SEGMENT: <strong className="text-cyan-400 uppercase">{segment}</strong></span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Bar 
                  dataKey={metricView} 
                  fill={metricView === 'revenue' ? '#38bdf8' : metricView === 'orders' ? '#34d399' : '#fbbf24'} 
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
                <Line 
                  type="monotone" 
                  dataKey={metricView} 
                  stroke="#ffffff" 
                  strokeWidth={2} 
                  dot={{ fill: '#38bdf8', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live SQL Preview */}
        <div className="lg:col-span-1 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>DYNAMIC SQL QUERY</span>
              </div>
              <span className="text-[10px] text-slate-500">PostgreSQL</span>
            </div>

            <pre className="font-mono text-[11px] text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {generatedSql}
            </pre>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <Database className="w-3 h-3" />
              <span>Query Latency: 14ms</span>
            </span>
            <span className="font-mono text-slate-500">250k Fact Records</span>
          </div>
        </div>

      </div>

    </div>
  );
}
