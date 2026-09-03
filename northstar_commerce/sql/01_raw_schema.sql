-- ============================================
-- NORTHSTAR COMMERCE - STAGING / RAW DATA TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER,
    customer_name VARCHAR(100),
    segment VARCHAR(50),
    region VARCHAR(50),
    acquisition_channel VARCHAR(50),
    signup_date DATE
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER,
    product_name VARCHAR(100),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    unit_cost NUMERIC(10,2),
    list_price NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER,
    customer_id INTEGER,
    order_date DATE,
    channel VARCHAR(50),
    region VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INTEGER,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    unit_price NUMERIC(10,2),
    discount NUMERIC(6,4)
);

CREATE TABLE IF NOT EXISTS returns (
    return_id INTEGER,
    order_id INTEGER,
    product_id INTEGER,
    return_date DATE,
    quantity INTEGER,
    reason VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS marketing (
    campaign_id INTEGER,
    customer_id INTEGER,
    channel VARCHAR(50),
    spend NUMERIC(12,2),
    conversion NUMERIC(6,4)
);

CREATE TABLE IF NOT EXISTS targets (
    month DATE,
    region VARCHAR(50),
    revenue_target NUMERIC(14,2),
    profit_target NUMERIC(14,2)
);
