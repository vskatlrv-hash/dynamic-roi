# Strategic Analysis: CloudScale Automate ROI Calculator

> **"The logic of averages is not just 'imprecise'; it can be directionally incorrect."**

This project is a reference implementation of a **Tiered Weighted Model** for ROI calculation, designed to address the statistical fallacies inherent in simple average-based modeling for knowledge work.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Statistical Model](https://img.shields.io/badge/Model-Power%20Law-purple?style=flat-square)

## 1. Executive Summary

This tool challenges the industry standard of using simple averages (e.g., "Average Hourly Wage") for ROI calculations. Research by O’Boyle and Aguinis (2012) indicates that knowledge work follows a **Power Law (Pareto) distribution**, not a Normal distribution. In a team of 50, a simplified average hides the exponential value created by "hyper-performers" and the specific value of deep focus time.

This calculator implements a **Hybrid Stratified Model** that:
1.  **Segments the Workforce:** Separates General Staff from Specialists.
2.  **Applies Utility Factors:** Differentiates between Cost Avoidance (0.5x) and Opportunity Creation (1.2x).
3.  **Visualizes Uncertainty:** Outputs a Confidence Range rather than a single static number.

## 2. The Statistical Problem: "The Flaw of Averages"

When a calculator uses a single input for "Average Employee Cost" across a diverse 50-person team, it implicitly assumes that human capital is a fungible asset with uniform output.

**The Reality:**
If the 5 high-saving employees are senior architects ($200/hr) saving 4 hours, and 45 are juniors ($50/hr) saving 0 hours:
- **Actual Savings:** $4,000/day
- **Average Model:** $1,000/day (Calculated as 50 employees × 0.4 avg hours × $50 avg wage)

*The simple average model underestimates ROI by 75% in this scenario.*

## 3. Methodological Solution

This project implements the following mathematical framework to resolve the conflict between statistical rigor and user cognitive load.

### 3.1 The Weighted Average Formula

Instead of: `(AvgTime × AvgWage × N) - Cost`

We use:

```math
Total Benefit = \sum_{i=1}^{k} (N_i \times W_i \times \Delta T \times U_i \times E)
```

Where:
- **$N_i$**: Count of employees in Tier i.
- **$W_i$**: Fully Loaded Cost (Salary + Benefits + Overhead, typically 1.25x-1.4x base).
- **$\Delta T$**: Time Saved.
- **$U_i$**: **Utility Factor**.
    - *General Staff ($U=0.5$)*: Time saved is cost avoidance.
    - *Specialists ($U=1.2$)*: Time saved creates new value (Opportunity Cost).
- **$E$**: **Efficiency Capture Rate** (The % of saved time that actually converts to work).

### 3.2 Efficiency Capture & Context Switching

Research in cognitive psychology indicates that after an interruption, it takes an average of **23 minutes** to return to the original task.

This calculator addresses the "Context Switching Penalty" by allowing users to toggle "Efficiency Modes":
- **Conservative (50%)**: assumes high friction.
- **Moderate (75%)**: standard efficiency.
- **Aggressive (100%)**: total efficiency capture.

## 4. Features & Implementation

### 🏛️ Tiered Architecture
The UI facilitates segmentation without overwhelming the user (Progessive Disclosure):
- **Tier 1 (General Staff)**: The "Useful Many" (80%). Standard tasks.
- **Tier 2 (Specialists)**: The "Vital Few" (20%). High focus value.

### 📊 Confidence Range Visualization
Accounts for uncertainty in sales forecasting.
- "Your ROI is likely between **X% (Conservative)** and **Y% (Aggressive)**."
- Builds trust by acknowledging variability.

### ⏱️ Payback Period Timeline
Calculates the exact break-even month:
`Payback Months = Initial Investment / Monthly Net Savings`

## 5. Getting Started

```bash
git clone https://github.com/vskatlrv-hash/dynamic-roi.git
cd dynamic-roi
npm install
npm run dev
```

## 6. Legal Disclaimer

> **Disclaimer:** The results provided by this calculator are estimates based on the information you provided and industry averages. Actual results may vary based on your specific business environment and implementation. This tool is provided for educational purposes only.

---

**References:**
1. O’Boyle, E., & Aguinis, H. (2012). The best and the rest: Revisiting the norm of normality of individual performance.
2. Savage, S. L. (2009). The Flaw of Averages.
