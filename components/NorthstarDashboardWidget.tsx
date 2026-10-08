'use client';

import React from 'react';
import Tabs from '@/components/story/Tabs';
import BarList from '@/components/story/BarList';
import Figure from '@/components/story/Figure';
import WidgetFrame from '@/components/story/WidgetFrame';

const INSIGHTS = [
  {
    title: 'Electronics: high revenue, eroded by discounts and returns',
    body: 'Electronics brings in $1.17M of revenue but carries a 7.62% average discount and a 7.26% return rate.',
    action: 'Cap discretionary promotional discounts at 5% and audit suppliers of the most-returned SKUs.',
  },
  {
    title: '$231k drag from products with no category',
    body: 'Products left as Unassigned earn a 22.28% gross margin, against a 38.57% company baseline.',
    action: 'Block item creation without a category so new products are classified and priced correctly.',
  },
  {
    title: 'Accessories has the best margin in the catalog',
    body: 'Accessories earns a 44.21% gross margin with a 5.55% return rate.',
    action: 'Shift acquisition spend toward Accessories.',
  },
];

const RELATIONSHIPS = [
  { from: 'fact_order_items', to: 'dim_orders', key: 'order_id', kind: 'many to one' },
  { from: 'fact_order_items', to: 'dim_products', key: 'product_id', kind: 'many to one' },
  { from: 'dim_orders', to: 'dim_customers', key: 'customer_id', kind: 'many to one' },
  { from: 'fact_returns', to: 'dim_orders, dim_products', key: 'order_id, product_id', kind: 'composite key' },
];

function Findings() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <BarList
          caption="Gross margin by product group"
          valueHeader="Gross margin"
          max={50}
          reference={{ value: 38.57, label: 'Company gross margin, 38.57%' }}
          rows={[
            { label: 'Accessories', value: 44.21, display: '44.2%', highlight: true },
            { label: 'Company overall', value: 38.57, display: '38.6%' },
            { label: 'Unassigned', value: 22.28, display: '22.3%' },
          ]}
        />
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">
          Source: 63,635 order items, $5.94M net revenue, $2.29M gross profit, modeled in PostgreSQL.
        </p>
      </div>
      <ol className="space-y-6 lg:col-span-7">
        {INSIGHTS.map((ins) => (
          <li key={ins.title} className="border-t border-rule pt-3 first:border-t-0 first:pt-0">
            <h3 className="text-lg font-bold leading-snug text-ink">{ins.title}</h3>
            <p className="prose-body mt-1 text-base">{ins.body}</p>
            <p className="mt-2 text-[0.9375rem] text-ink-2">
              <span className="font-bold text-ink">Recommendation: </span>
              {ins.action}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Model() {
  return (
    <div className="space-y-8">
      <Figure
        src="/images/projects/northstar_commerce/data_model_star_schema.png"
        alt="Star schema: fact_order_items, fact_returns and targets joined to customer, product and order dimensions."
        width={1715}
        height={809}
        caption="Star schema used by the Power BI model."
      />
      <table className="w-full max-w-3xl border-collapse text-[0.9375rem]">
        <caption className="mb-2 text-left text-base font-bold text-ink">Relationships</caption>
        <thead>
          <tr className="text-left text-sm text-ink-3">
            <th scope="col" className="pb-2 pr-4 font-semibold">From</th>
            <th scope="col" className="pb-2 pr-4 font-semibold">To</th>
            <th scope="col" className="pb-2 font-semibold">Key</th>
          </tr>
        </thead>
        <tbody>
          {RELATIONSHIPS.map((r) => (
            <tr key={r.from + r.to} className="border-t border-rule align-top">
              <td className="py-2 pr-4 font-mono text-[0.8125rem] text-ink">{r.from}</td>
              <td className="py-2 pr-4 font-mono text-[0.8125rem] text-ink">{r.to}</td>
              <td className="py-2 text-ink-2">
                <code className="font-mono text-[0.8125rem] text-ink">{r.key}</code>
                <span className="block text-xs text-ink-3">{r.kind}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function NorthstarDashboardWidget() {
  return (
    <WidgetFrame title="The data" note="Northstar Commerce order, product, customer and return tables.">
      <Tabs
        label="Northstar analysis views"
        tabs={[
          { id: 'findings', label: 'Findings', content: <Findings /> },
          {
            id: 'dashboard',
            label: 'Power BI dashboard',
            content: (
              <Figure
                src="/images/projects/northstar_commerce/executive_overview.png"
                alt="Northstar Commerce executive overview in Power BI: revenue, profit, margin and order KPIs with category and monthly views."
                width={1313}
                height={741}
                caption="Executive overview page of the Power BI report."
              />
            ),
          },
          { id: 'model', label: 'Data model', content: <Model /> },
        ]}
      />
    </WidgetFrame>
  );
}
