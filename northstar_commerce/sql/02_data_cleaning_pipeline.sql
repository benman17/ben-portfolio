-- ============================================
-- NORTHSTAR COMMERCE - ANALYTICS STAR SCHEMA ETL
-- ============================================

-- 1. Create dedicated analytics schema
CREATE SCHEMA IF NOT EXISTS analytics;

-- 2. CLEAN CUSTOMERS (Deduplicate using ROW_NUMBER window function)
DROP TABLE IF EXISTS analytics.dim_customers;
CREATE TABLE analytics.dim_customers AS
WITH ranked_customers AS (
    SELECT 
        customer_id,
        customer_name,
        segment,
        COALESCE(region, 'Unknown') AS region,
        acquisition_channel,
        signup_date,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY signup_date DESC NULLS LAST
        ) AS rn
    FROM customers
)
SELECT 
    customer_id,
    customer_name,
    segment,
    region,
    acquisition_channel,
    signup_date
FROM ranked_customers
WHERE rn = 1;

ALTER TABLE analytics.dim_customers ADD PRIMARY KEY (customer_id);

-- 3. CLEAN PRODUCTS (Impute missing category metadata)
DROP TABLE IF EXISTS analytics.dim_products;
CREATE TABLE analytics.dim_products AS
SELECT 
    product_id,
    product_name,
    COALESCE(category, 'Unassigned') AS category,
    subcategory,
    unit_cost,
    list_price
FROM products;

ALTER TABLE analytics.dim_products ADD PRIMARY KEY (product_id);

-- 4. CLEAN ORDERS (Standardize channel casing and synonyms)
DROP TABLE IF EXISTS analytics.dim_orders;
CREATE TABLE analytics.dim_orders AS
SELECT 
    order_id,
    customer_id,
    order_date,
    CASE 
        WHEN LOWER(channel) IN ('online', 'web') THEN 'Online'
        WHEN LOWER(channel) = 'retail' THEN 'Retail'
        WHEN LOWER(channel) = 'wholesale' THEN 'Wholesale'
        ELSE INITCAP(channel)
    END AS channel,
    region
FROM orders;

ALTER TABLE analytics.dim_orders ADD PRIMARY KEY (order_id);

-- 5. CLEAN ORDER ITEMS (Filter corrupted quantities + calculate net revenue)
DROP TABLE IF EXISTS analytics.fact_order_items;
CREATE TABLE analytics.fact_order_items AS
SELECT 
    order_item_id,
    order_id,
    product_id,
    quantity,
    unit_price,
    discount,
    ROUND((quantity * unit_price * (1 - discount)), 2) AS net_revenue
FROM order_items
WHERE quantity > 0;

ALTER TABLE analytics.fact_order_items ADD PRIMARY KEY (order_item_id);

-- 6. TRANSFER TARGETS, RETURNS & MARKETING TO ANALYTICS SCHEMA
DROP TABLE IF EXISTS analytics.fact_returns;
CREATE TABLE analytics.fact_returns AS
SELECT * FROM returns;

DROP TABLE IF EXISTS analytics.fact_targets;
CREATE TABLE analytics.fact_targets AS
SELECT * FROM targets;

DROP TABLE IF EXISTS analytics.fact_marketing;
CREATE TABLE analytics.fact_marketing AS
SELECT * FROM marketing;
