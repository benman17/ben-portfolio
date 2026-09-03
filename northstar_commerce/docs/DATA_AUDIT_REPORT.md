# Data Quality Audit & Analytics Baseline Report

## Project: Northstar Commerce BI Analytics Platform
**Author:** Ben Manguiat  
**Environment:** PostgreSQL 18 + Power BI Desktop  
**Data Volume:** 8,012 Customers | 120 Products | 30,000 Orders | 63,635 Order Items | 3,688 Returns | 80 Campaigns | 165 Targets  

---

## 1. Raw Data Quality Audit Summary

Prior to constructing the analytical dimensional model, a comprehensive data quality audit was conducted on raw staging tables in PostgreSQL to identify data anomalies that would skew executive financial KPIs.

| Data Anomaly | Affected Table | Volume Found | Impact on BI Metrics | Remediation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Duplicate Records** | `customers` | 12 IDs (24 rows) | Inflates customer acquisition & lifetime value metrics | `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY signup_date DESC)` window deduplication |
| **Missing Metadata** | `products` | 4 products | Distorts category aggregation & profit margin breakdown | Imputed missing categories to `'Unassigned'` for explicit tracking |
| **Missing Regions** | `customers` | Null values | Distorts regional sales attribution | Imputed missing region fields to `'Unknown'` |
| **Inconsistent Casing** | `orders` | `'ONLINE'`, `'online'`, `'Web'` | Fragments sales channel analysis across multiple slice entries | Standardized via `CASE` expression to `'Online'`, `'Retail'`, `'Wholesale'` |
| **Corrupted Quantities** | `order_items` | Rows with `quantity <= 0` | Distorts Net Revenue and Average Order Value (AOV) | Filtered `quantity > 0` in production fact table |

---

## 2. Business Baseline Verification

After applying the automated SQL transformation pipeline, top-level baseline financial figures were calculated to validate report accuracy:

```sql
SELECT 
    ROUND(SUM(net_revenue), 2) AS total_revenue,
    ROUND(SUM(gross_profit), 2) AS total_gross_profit,
    ROUND((SUM(gross_profit) / SUM(net_revenue)) * 100, 2) AS blended_margin_pct
FROM analytics.vw_order_details;
```

* **Total Net Revenue:** `$5,937,210.71`
* **Total Gross Profit:** `$2,289,785.30`
* **Blended Margin:** `38.57%`

---

## 3. Key Analytical Insights & Risk Drivers

1. **Margin Compression in Electronics:**
   * **Gross Revenue:** `$1.17M` (2nd largest category)
   * **Average Discount:** `7.62%` (highest in company)
   * **Return Rate:** `7.26%` (highest in company)
   * *Takeaway:* Excessive promotional discounting and return processing overhead compress Electronics profitability.

2. **Catalog Metadata Drag ("Unassigned"):**
   * **Revenue Drag:** `$231,000`
   * **Gross Margin:** `22.28%` (vs. company baseline of `38.57%`)
   * *Takeaway:* Uncategorized inventory items severely drag down company-wide gross margin performance.

3. **High-Margin Expansion Winner (Accessories):**
   * **Gross Margin:** `44.21%` (company leader)
   * **Return Profile:** `5.55%` (low friction)
   * *Takeaway:* Accessories presents the highest ROI opportunity for increased marketing customer acquisition spend.

4. **Regional Quotas vs. Actual Performance:**
   * Actual revenue sits at `10% - 12%` of set monthly targets across all regions.
   * *Takeaway:* Quota targets represent unrealistic top-down expectations rather than data-driven sales capacity forecasts.
