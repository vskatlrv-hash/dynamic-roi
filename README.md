# Industrial Value Realization Model (IVRM) Calculator

This project is a high-fidelity **SaaS ROI Calculator** designed for Sales Engineering and Pre-sales operations. It utilizes manufacturing-grade financial models to translate technical improvements into conservative, CFO-aligned business impact scenarios.

---

## 🏗 Calculation Pipeline

The calculator follows a linear, risk-adjusted pipeline to move from "Raw Potential" to "Realized P&L Impact":

1.  **Input Ingestion**: User provides labor stats (Count, Wage, Hours) and Operational Risks.
2.  **Theoretical Benefit Calculation**: Determining the maximum possible gain in a "perfect" world.
3.  **Constraint Filtering (ToC)**: Applying the "Bottleneck" logic to discount value if the process isn't a constraint.
4.  **COPQ Reduction**: Calculating savings from reduced scrap, rework, and warranty claims.
5.  **Risk & TCO Subtraction**: Factoring in amortized hardware (CapEx), subscriptions (OpEx), and J-Curve productivity dips.
6.  **CFO Audit (Value Capture)**: Applying a final multiplier for how much saved time actually converts to bottom-line profit.

---

## 📐 Mathematical Models & Formulas

### 1. Throughput Benefit (Labor Efficiency)
Calculates the annual value of hours saved across Two Tiers of employees.
- **Formula**: `AnnualBenefit = (Count × Wage × AnnualHours) × UtilityFactor × EfficiencyMode × ConstraintMultiplier`
- **Utility Factors**:
    - General Staff: `0.5` (Lower individual impact)
    - Specialists: `1.2` (High-value decision makers)
- **Constraint Multiplier (Theory of Constraints)**:
    - Bottleneck: `1.0`
    - Non-Bottleneck: `0.1` (Per Goldratt, improving a non-constraint provides ~zero systemic gain).

### 2. Cost of Poor Quality (COPQ)
Categorizes failures into the "Hidden Factory" cost model.
- **Internal Failure**: `(ScrapRate × LaborCost × 1) + (ReworkRate × LaborCost × 2)`
- **External Failure**: `(WarrantyRate × LaborCost × 10)`
- **COPQ Reduction**: `TotalCOPQ × EfficiencyFactor × 0.5` (Assumes tool eliminates 50% of failures at max efficiency).

### 3. J-Curve Risk adjustment
Accounts for the temporary productivity loss during digital transformation.
- **Disruption Cost**: `TotalAnnualLaborCost × (DipPercent / 100) × 0.25` (Assumes Q1 disruption).
- **Operational Payback**: `CashPaybackMonths + monthsToRecovery` (Where recovery time scales with the depth of the dip).

---

## 📊 Concrete Example (Case Study)

**Baseline Scenario**:
- **Staff**: 40 General Staff ($35/hr), 10 Specialists ($125/hr).
- **Status**: Process is a **Bottleneck** (`Multiplier = 1.0`).
- **Issues**: 5% Rework rate, 3% Scrap rate.
- **Tool Cost**: $10,000 sub + $65,000 implementation.

**The Calculation Step-by-Step**:
1.  **Labor Basis**: ~$4.1M Total Annual Labor Cost.
2.  **COPQ Iceberg**: Rework and Scrap cost the company **$533,000** annually.
3.  **Efficiency Gain**: At "Moderate" (75%) efficiency, the tool identifies **$320,000** in labor throughput.
4.  **J-Curve Dip**: A 15% productivity dip in month 1 costs **$153,000** in "lost momentum."
5.  **Net MEVA**: Total benefits ($350k labor + $150k COPQ) minus costs ($75k tool + $153k risk) = **~$272,000 Strategic Value (Year 1).**

---

## 🛠 Technical Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router/TypeScript)
- **Visualization**: [Recharts](https://recharts.org/) for ROI and J-Curve charts.
- **Reports**: [jsPDF](https://github.com/parallax/jsPDF) for CFO-ready dynamic PDF generation.
- **Logic**: Custom React Hooks for real-time `useMemo` financial recalculations.

---

## 🏃 Getting Started

1. `cd dynamic-roi`
2. `npm install`
3. `npm run dev`

---

## 📁 Core Directory Map
- `src/app/page.tsx`: The "Engine" (All math logic and MEVA formulas).
- `src/components/IVRMInputs.tsx`: The "Levers" (Risk, COPQ, and TCO inputs).
- `src/components/JCurveChart.tsx`: The "Risk Plot" (Visualizing implementation dips).
