# FundOS BigQuery Data Architecture

This document defines the schema for the 5 core BigQuery tables used for analytics, scoring history, and compliance reporting.

## 1. `campaign_scores_daily`
**Usage:** Tracks daily evolution of campaign confidence scores for trend analysis and chart generation.

| Column | Type | Mode | Description |
|---|---|---|---|
| `date` | DATE | REQUIRED | Snapshot date |
| `campaign_id` | STRING | REQUIRED | Reference to Campaign model |
| `score` | FLOAT64 | REQUIRED | Overall confidence score (0-100) |
| `dimension_scores` | JSON | NULLABLE | Scores per dimension (market, risk, team, etc.) |
| `trace_id` | STRING | NULLABLE | Cloud Trace correlation ID |

**Partitioning:** `PARTITION BY date`
**Clustering:** `campaign_id`

---

## 2. `investor_confidence_signals`
**Usage:** Historical log of all generated confidence signals.

| Column | Type | Mode | Description |
|---|---|---|---|
| `timestamp` | TIMESTAMP | REQUIRED | When the signal was generated |
| `campaign_id` | STRING | REQUIRED | Reference to Campaign |
| `score` | FLOAT64 | REQUIRED | Signal value |
| `factors` | ARRAY<STRUCT<label STRING, value STRING, impact FLOAT64>> | REQUIRED | Decomposition of the score |
| `intensity` | STRING | REQUIRED | LOW, MODERATE, STRONG |

**Partitioning:** `TIMESTAMP_TRUNC(timestamp, MONTH)`
**Clustering:** `campaign_id`

---

## 3. `investment_events`
**Usage:** Event stream of all investment-related actions (creation, status change).

| Column | Type | Mode | Description |
|---|---|---|---|
| `event_id` | STRING | REQUIRED | UUID |
| `timestamp` | TIMESTAMP | REQUIRED | Event time |
| `action` | STRING | REQUIRED | CREATED, SETTLED, ESCROWED, REFUNDED |
| `investment_id` | STRING | REQUIRED | Reference to PostgreSQL Investment |
| `investor_id` | STRING | REQUIRED | Reference to Investor |
| `campaign_id` | STRING | REQUIRED | Reference to Campaign |
| `amount_eur` | NUMERIC | REQUIRED | Normalized amount in EUR |
| `rail` | STRING | REQUIRED | EUR_FIAT, USDC, etc. |

**Partitioning:** `TIMESTAMP_TRUNC(timestamp, DAY)`
**Clustering:** `campaign_id`, `investor_id`

---

## 4. `market_context`
**Usage:** External market signals used by AI agents for research and scoring.

| Column | Type | Mode | Description |
|---|---|---|---|
| `timestamp` | TIMESTAMP | REQUIRED | Observation time |
| `sector` | STRING | REQUIRED | Fintech, AI, Web3, etc. |
| `sentiment_score` | FLOAT64 | REQUIRED | Aggregated market sentiment |
| `trend_momentum` | FLOAT64 | REQUIRED | Growth trend momentum |
| `source_metadata` | JSON | NULLABLE | Origins of the data |

**Partitioning:** `TIMESTAMP_TRUNC(timestamp, DAY)`
**Clustering:** `sector`

---

## 5. `audit_events_raw`
**Usage:** Raw audit stream for SOC2 compliance and security monitoring. Mirrors `AuditLog` but persistent long-term.

| Column | Type | Mode | Description |
|---|---|---|---|
| `timestamp` | TIMESTAMP | REQUIRED | Action time |
| `user_id` | STRING | NULLABLE | Subject of the action |
| `action` | STRING | REQUIRED | Action performed (CREATE, UPDATE, etc.) |
| `entity` | STRING | REQUIRED | Entity affected |
| `entity_id` | STRING | REQUIRED | Entity UUID |
| `trace_id` | STRING | NULLABLE | Correlation ID |
| `changes` | JSON | NULLABLE | Field-level delta |

**Partitioning:** `TIMESTAMP_TRUNC(timestamp, MONTH)`
**Clustering:** `entity`, `user_id`
