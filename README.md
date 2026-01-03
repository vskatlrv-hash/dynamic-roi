# 📊 Strategic ROI Calculator

A sophisticated, tiered ROI calculator built with Next.js that models workforce performance using **Power Law distribution** rather than simple averages. Designed for CloudScale Automate SaaS sales engineers.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Recharts](https://img.shields.io/badge/Recharts-2.15-22b5bf?style=flat-square)

## ✨ Why This Calculator is Different

Traditional ROI calculators use **simple averages**, which fail to capture the reality of knowledge work:

| Approach | Problem |
|----------|---------|
| Simple Average | Assumes all employees are identical—a statistical fallacy |
| This Calculator | Uses **tiered segmentation** to model the Power Law distribution of human performance |

**Research shows:** In 94% of organizations, individual performance follows a Paretian (Power Law) distribution, not a Bell Curve. Simple averages can underestimate specialist impact by **up to 75%**.

## 🚀 Features

### Tiered Workforce Model
- **Tier 1: General Staff** - Standard tasks, cost avoidance focus (×0.5 utility)
- **Tier 2: Specialists** - Complex tasks, opportunity value creation (×1.2 utility)

### Efficiency Capture Rates
- **Conservative (50%)** - Accounts for heavy context switching
- **Moderate (75%)** - Balanced realistic estimate
- **Aggressive (100%)** - Maximum productivity assumption

### Confidence Range Output
Results displayed as a **range** (Conservative → Aggressive) rather than a single number, reflecting real-world uncertainty.

### Payback Period Visualization
See exactly when your investment breaks even with an interactive 12-month timeline.

## 📐 Mathematical Model

### The Tiered Weighted Formula

```
Total Benefit = Σ(Nᵢ × Cᵢ × ΔTᵢ × Uᵢ × E)
```

Where:
- `Nᵢ` = Headcount in tier i
- `Cᵢ` = Fully loaded hourly cost for tier i
- `ΔTᵢ` = Annual hours saved per employee in tier i
- `Uᵢ` = Utility factor (0.5 for general, 1.2 for specialists)
- `E` = Efficiency capture rate (0.5, 0.75, or 1.0)

### ROI Calculation

```
ROI = (Total Benefit - Investment) ÷ Investment × 100
```

### Investment Formula

```
CloudScale Cost = $10,000 (base) + $50 × Total Employees
```

### Payback Period

```
Payback Months = Investment ÷ Monthly Net Savings
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Styling**: Vanilla CSS with CSS Variables

## 📁 Project Structure

```
dynamic-roi/
├── src/
│   ├── app/
│   │   ├── globals.css         # Premium dark theme (900+ lines)
│   │   ├── layout.tsx          # Root layout with toast provider
│   │   └── page.tsx            # Main calculator with tiered logic
│   └── components/
│       ├── TieredInputs.tsx    # 2-tier workforce input sliders
│       ├── AdvancedResults.tsx # Confidence range & payback display
│       ├── ROIChart.tsx        # 3-year comparison chart
│       └── PDFButton.tsx       # Business case generator
├── package.json
└── README.md
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vskatlrv-hash/dynamic-roi.git
cd dynamic-roi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Methodology References

This calculator is based on research including:
- O'Boyle & Aguinis (2012): Power Law distribution in human performance
- Cognitive Load Theory: Balancing accuracy vs. usability
- The "Flaw of Averages": Why plans based on averages fail

## ⚖️ Legal Disclaimer

> The results provided by this calculator are estimates based on the information you provide and industry benchmarks. Actual results may vary based on your specific business environment, implementation quality, and adoption rates. This tool is provided for educational and planning purposes only.

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for Sales Engineers who understand the difference between statistical accuracy and usability.
