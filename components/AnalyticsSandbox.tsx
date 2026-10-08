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
import WidgetFrame from '@/components/story/WidgetFrame';

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

  const METRICS = [
    { id: 'revenue', label: 'Revenue' },
    { id: 'orders', label: 'Orders' },
    { id: 'churnRate', label: 'Churn rate' },
  ] as const;

  const pill = (on: boolean) =>
    `min-h-10 border px-3 text-sm font-semibold transition-colors duration-150 ${
      on ? 'border-ink bg-ink text-paper' : 'border-rule text-ink-2 hover:border-ink hover:text-ink'
    }`;

  return (
    <WidgetFrame
      title="Filter-to-SQL demo"
      note="Sample data, not from a real business. Pick a segment and a metric to see the chart and the SQL that would produce it."
    >
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Customer segment">
          <span className="mr-1 text-sm text-ink-3">Segment</span>
          {(['All', 'Enterprise', 'MidMarket'] as const).map((seg) => (
            <button key={seg} type="button" aria-pressed={segment === seg} onClick={() => setSegment(seg)} className={pill(segment === seg)}>
              {seg === 'MidMarket' ? 'Mid-market' : seg}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Metric">
          <span className="mr-1 text-sm text-ink-3">Metric</span>
          {METRICS.map((m) => (
            <button key={m.id} type="button" aria-pressed={metricView === m.id} onClick={() => setMetricView(m.id)} className={pill(metricView === m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="h-64 w-full border-y border-rule lg:col-span-7" role="img" aria-label={`Sample ${metricView} by month for ${segment} segment`}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 16, right: 8, bottom: 4, left: -4 }}>
              <CartesianGrid vertical={false} stroke="var(--rule)" />
              <XAxis dataKey="month" stroke="var(--rule-strong)" tick={{ fontSize: 12, fill: 'var(--ink-3)' }} tickLine={false} />
              <YAxis stroke="var(--rule-strong)" tick={{ fontSize: 12, fill: 'var(--ink-3)' }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'var(--wash)' }}
                contentStyle={{ backgroundColor: 'var(--paper)', borderColor: 'var(--rule)', borderRadius: 0, color: 'var(--ink)', fontSize: 13 }}
              />
              <Bar dataKey={metricView} fill="var(--chart)" barSize={28} isAnimationActive={false} />
              <Line type="monotone" dataKey={metricView} stroke="var(--accent)" strokeWidth={2} dot={{ fill: 'var(--accent)', r: 3 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-5">
          <p className="text-sm font-semibold text-ink-3">SQL (PostgreSQL), illustrative</p>
          <pre className="mt-2 overflow-x-auto border border-rule bg-code p-4 font-mono text-[0.8125rem] leading-relaxed text-ink whitespace-pre-wrap">
            <code>{generatedSql}</code>
          </pre>
        </div>
      </div>
    </WidgetFrame>
  );
}
