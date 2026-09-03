-- ============================================
-- NORTHSTAR COMMERCE - EXECUTIVE BUSINESS VIEWS
-- ============================================

-- 1. Executive Sales & Profit Margin View
DROP VIEW IF EXISTS analytics.vw_order_details;
CREATE VIEW analytics.vw_order_details AS
SELECT 
    oi.order_item_id,
    o.order_id,
    o.order_date,
    c.customer_id,
    c.customer_name,
    c.segment AS customer_segment,
    COALESCE(c.region, 'Unknown') AS customer_region,
    o.channel AS sales_channel,
    p.product_id,
    p.product_name,
    p.category AS product_category,
    p.subcategory AS product_subcategory,
    oi.quantity,
    oi.unit_price,
    oi.discount,
    oi.net_revenue,
    ROUND((oi.quantity * p.unit_cost), 2) AS total_cost,
    ROUND(oi.net_revenue - (oi.quantity * p.unit_cost), 2) AS gross_profit,
    CASE 
        WHEN oi.net_revenue = 0 THEN 0
        ELSE ROUND(((oi.net_revenue - (oi.quantity * p.unit_cost)) / oi.net_revenue) * 100, 2)
    END AS gross_margin_pct
FROM analytics.fact_order_items oi
JOIN analytics.dim_orders o ON oi.order_id = o.order_id
JOIN analytics.dim_customers c ON o.customer_id = c.customer_id
JOIN analytics.dim_products p ON oi.product_id = p.product_id;

-- 2. Monthly Target vs Actual Performance View
DROP VIEW IF EXISTS analytics.vw_monthly_performance;
CREATE VIEW analytics.vw_monthly_performance AS
WITH actuals AS (
    SELECT 
        DATE_TRUNC('month', order_date)::DATE AS month,
        customer_region AS region,
        SUM(net_revenue) AS actual_revenue,
        SUM(gross_profit) AS actual_profit
    FROM analytics.vw_order_details
    GROUP BY 1, 2
)
SELECT 
    t.month,
    t.region,
    t.revenue_target,
    COALESCE(a.actual_revenue, 0) AS actual_revenue,
    ROUND(COALESCE(a.actual_revenue, 0) - t.revenue_target, 2) AS revenue_variance,
    t.profit_target,
    COALESCE(a.actual_profit, 0) AS actual_profit,
    ROUND(COALESCE(a.actual_profit, 0) - t.profit_target, 2) AS profit_variance
FROM analytics.fact_targets t
LEFT JOIN actuals a 
    ON t.month = a.month 
   AND t.region = a.region;
