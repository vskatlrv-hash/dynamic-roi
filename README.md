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

## 📐 ROI Formula

| Metric | Formula |
|--------|---------|
| Annual Manual Labor Cost | `Employees × Hourly Wage × Weekly Hours × 52` |
| Cost of Errors | `Annual Cost × Error Rate %` |
| Total Current Waste | `Annual Cost + Error Cost` |
| CloudScale Cost | `$10,000 + ($50 × Employees)` |
| ROI | `(Total Waste - CloudScale Cost) ÷ CloudScale Cost × 100` |

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
