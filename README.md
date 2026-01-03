# 📊 Dynamic ROI Calculator

A modern, interactive web application that helps prospects calculate their 3-year Return on Investment (ROI) with CloudScale Automate workflow automation software.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Recharts](https://img.shields.io/badge/Recharts-2.15-22b5bf?style=flat-square)

## ✨ Features

- **Interactive Sliders** - Adjust employees, hourly wage, manual entry hours, and error rate
- **Real-time Calculations** - Instantly see ROI, savings, and cost comparisons
- **3-Year Projections** - Visualize cost comparison over multiple years with dynamic charts
- **Business Case Generator** - One-click PDF generation for stakeholder presentations
- **Premium Dark Theme** - Glassmorphism effects, gradients, and micro-animations

---

## � The ROI Calculation Logic - Detailed Breakdown

This calculator is designed to help **Sales Engineers** speak the CFO's language by translating technical benefits into financial outcomes. Here's the complete breakdown of how every number is calculated.

### 🎯 The Business Problem

Companies lose money every year due to **manual data entry**:
1. **Direct labor costs** - Employees spend time on repetitive manual work
2. **Error costs** - Mistakes from manual processes require rework and cause downstream problems

CloudScale Automate eliminates these costs through workflow automation.

---

### 📊 Input Variables

| Variable | Description | Range | Default |
|----------|-------------|-------|---------|
| `E` | Number of Employees doing manual data entry | 1-500 | 50 |
| `W` | Average Hourly Wage ($/hour) | $10-$100 | $35 |
| `H` | Hours spent on manual entry per week | 1-40 | 10 |
| `R` | Data entry error rate (%) | 1%-25% | 5% |

---

### 🧮 Step-by-Step Calculations

#### Step 1: Annual Cost of Manual Labor

**Formula:**
```
Annual Labor Cost = E × W × H × 52
```

**Logic:** 
- Each employee (`E`) works at hourly wage (`W`)
- They spend `H` hours per week on manual data entry
- There are 52 weeks in a year

**Example:**
```
50 employees × $35/hour × 10 hours/week × 52 weeks
= $910,000 per year spent on manual data entry
```

---

#### Step 2: Cost of Data Entry Errors

**Formula:**
```
Error Cost = Annual Labor Cost × (R ÷ 100)
```

**Logic:**
- A percentage of all manual work contains errors
- Errors require rework, corrections, and cause downstream problems
- The error rate represents the "waste multiplier" on labor costs
- This is a *conservative* estimate—real error costs often include customer churn, compliance fines, and reputation damage

**Example:**
```
$910,000 × (5% ÷ 100)
= $910,000 × 0.05
= $45,500 per year lost to errors
```

---

#### Step 3: Total Current Waste

**Formula:**
```
Total Current Waste = Annual Labor Cost + Error Cost
```

**Logic:**
- This is the complete financial impact of manual processes
- It represents money that could be saved through automation

**Example:**
```
$910,000 + $45,500
= $955,500 total annual waste
```

---

#### Step 4: CloudScale Cost

**Formula:**
```
CloudScale Cost = $10,000 + ($50 × E)
```

**Logic:**
- **$10,000** = Base platform fee (includes core automation, support, updates)
- **$50 per employee** = Per-seat licensing for each user who benefits from the automation

**Pricing rationale:**
- Base fee covers infrastructure and core value
- Per-seat fee scales with organizational size and value delivered
- This is a realistic SaaS pricing model (Base + Usage)

**Example:**
```
$10,000 + ($50 × 50 employees)
= $10,000 + $2,500
= $12,500 per year for CloudScale
```

---

#### Step 5: Annual Savings

**Formula:**
```
Savings = Total Current Waste - CloudScale Cost
```

**Logic:**
- The difference between what you're wasting now vs. what you'd pay for the solution
- Positive savings = CloudScale pays for itself and more

**Example:**
```
$955,500 - $12,500
= $943,000 in annual savings
```

---

#### Step 6: Return on Investment (ROI)

**Formula:**
```
ROI = ((Total Current Waste - CloudScale Cost) ÷ CloudScale Cost) × 100
```

**Logic:**
- ROI measures **return relative to investment**
- An ROI of 100% means you get back $1 for every $1 spent
- An ROI of 500% means you get back $5 for every $1 spent
- This is the key metric CFOs use to justify purchases

**Example:**
```
(($955,500 - $12,500) ÷ $12,500) × 100
= ($943,000 ÷ $12,500) × 100
= 75.44 × 100
= 7,544% ROI
```

**What this means:** For every $1 invested in CloudScale, you get $75.44 in return.

---

### � 3-Year Projection Logic

The calculator also shows costs over 3 years to demonstrate **compounding value**.

| Year | Current Spend Formula | CloudScale Cost |
|------|----------------------|-----------------|
| Year 1 | `Total Waste × 1.00` | Fixed |
| Year 2 | `Total Waste × 1.05` | Fixed |
| Year 3 | `Total Waste × 1.10` | Fixed |

**Why inflation matters:**
- Manual labor costs increase ~5% annually (raises, inflation)
- CloudScale pricing stays fixed (locked-in contract)
- The gap between current costs and solution costs **widens over time**
- This makes the 3-year business case even more compelling

---

### 💡 Real-World Validation

Test the calculator with these realistic scenarios:

| Scenario | Employees | Wage | Hours | Error Rate | Expected ROI |
|----------|-----------|------|-------|------------|--------------|
| Small Team | 10 | $25 | 5 | 3% | ~566% |
| Mid-size Dept | 50 | $35 | 10 | 5% | ~7,544% |
| Enterprise | 200 | $50 | 20 | 10% | ~75,871% |

The massive ROI at scale demonstrates why automation solutions are **table stakes** for large organizations.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vskatlrv-hash/dynamic-roi.git

# Navigate to the project
cd dynamic-roi

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Charts**: [Recharts](https://recharts.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Styling**: Vanilla CSS with CSS Variables

## 📁 Project Structure

```
dynamic-roi/
├── src/
│   ├── app/
│   │   ├── globals.css      # Premium dark theme styling
│   │   ├── layout.tsx       # Root layout with toast provider
│   │   └── page.tsx         # Main ROI calculator page
│   └── components/
│       ├── InputSliders.tsx   # Input controls
│       ├── ResultsDisplay.tsx # ROI metrics display
│       ├── ROIChart.tsx       # 3-year comparison chart
│       └── PDFButton.tsx      # Business case generator
├── package.json
└── README.md
```

## 🎨 Design Features

- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Gradient Accents** - Purple-to-indigo gradients
- **Animated Sliders** - Gradient fill tracks with glowing thumbs
- **Responsive Layout** - Mobile-first design
- **Micro-animations** - Smooth transitions and hover effects

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for Sales Engineers who speak the language of ROI.
