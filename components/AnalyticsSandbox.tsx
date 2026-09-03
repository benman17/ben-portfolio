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
import { BarChart3, Database, Code } from 'lucide-react';

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
    <div className="bg-[#08080c] border border-[#1a1a20] p-6 sm:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1a20] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>INTERACTIVE EXECUTIVE DATA SANDBOX</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Revenue & Churn Intelligence Engine
          </h3>
          <p className="text-xs text-[#8a8a8a] mt-1">
            Test custom filters to view dynamic metrics visualization and auto-generated SQL analytics queries.
          </p>
        </div>

        {/* Segment Filter Pills */}
        <div className="flex items-center gap-2 bg-black p-1.5 border border-[#1a1a20] self-start sm:self-auto">
          {(['All', 'Enterprise', 'MidMarket'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setSegment(seg)}
              className={`px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                segment === seg
                  ? 'border border-white text-white bg-white/10 font-bold'
                  : 'border border-[#1a1a20] text-[#8a8a8a] hover:border-white hover:text-white'
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
          className={`px-4 py-2 text-xs font-mono font-bold transition-all ${
            metricView === 'revenue'
              ? 'bg-[#1a1a20] text-[#38bdf8] border border-[#38bdf8]/40'
              : 'bg-[#08080c] text-[#8a8a8a] border border-[#1a1a20] hover:text-white hover:border-white'
          }`}
        >
          Revenue Trend ($)
        </button>
        <button
          onClick={() => setMetricView('orders')}
          className={`px-4 py-2 text-xs font-mono font-bold transition-all ${
            metricView === 'orders'
              ? 'bg-[#1a1a20] text-[#34d399] border border-[#34d399]/40'
              : 'bg-[#08080c] text-[#8a8a8a] border border-[#1a1a20] hover:text-white hover:border-white'
          }`}
        >
          Total Orders Volume
        </button>
        <button
          onClick={() => setMetricView('churnRate')}
          className={`px-4 py-2 text-xs font-mono font-bold transition-all ${
            metricView === 'churnRate'
              ? 'bg-[#1a1a20] text-amber-400 border border-amber-500/40'
              : 'bg-[#08080c] text-[#8a8a8a] border border-[#1a1a20] hover:text-white hover:border-white'
          }`}
        >
          Customer Churn Rate (%)
        </button>
      </div>

      {/* Grid: Chart + Generated SQL Code snippet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Recharts Live Chart */}
        <div className="lg:col-span-2 bg-black p-4 border border-[#1a1a20] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-[#8a8a8a] mb-2">
            <span>METRIC: <strong className="text-white uppercase">{metricView}</strong></span>
            <span>SEGMENT: <strong className="text-[#38bdf8] uppercase">{segment}</strong></span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a20" />
                <XAxis dataKey="month" stroke="#8a8a8a" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8a8a8a" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#1a1a20', borderRadius: '0px', color: '#fff' }} 
                />
                <Bar 
                  dataKey={metricView} 
                  fill={metricView === 'revenue' ? '#38bdf8' : metricView === 'orders' ? '#34d399' : '#fbbf24'} 
                  radius={[0, 0, 0, 0]}
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
        <div className="lg:col-span-1 bg-black p-4 border border-[#1a1a20] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8] border-b border-[#1a1a20] pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>DYNAMIC SQL QUERY</span>
              </div>
              <span className="text-[10px] text-[#8a8a8a]">PostgreSQL</span>
            </div>

            <pre className="font-mono text-[11px] text-neutral-300 bg-[#08080c] p-3 border border-[#1a1a20] overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {generatedSql}
            </pre>
          </div>

          <div className="pt-3 border-t border-[#1a1a20] text-[11px] text-[#8a8a8a] flex items-center justify-between">
            <span className="flex items-center gap-1 text-[#34d399]">
              <Database className="w-3 h-3" />
              <span>Query Latency: 14ms</span>
            </span>
            <span className="font-mono text-[#8a8a8a]">250k Fact Records</span>
          </div>
        </div>

      </div>

    </div>
  );
}
