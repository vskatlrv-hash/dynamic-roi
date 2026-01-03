'use client';

import React, { useState, useMemo } from 'react';
import InputSliders from '@/components/InputSliders';
import ResultsDisplay from '@/components/ResultsDisplay';
import ROIChart from '@/components/ROIChart';
import PDFButton from '@/components/PDFButton';

export default function Home() {
  // Input state
  const [employees, setEmployees] = useState(50);
  const [hourlyWage, setHourlyWage] = useState(35);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [errorRate, setErrorRate] = useState(5);

  // Calculate ROI metrics
  const calculations = useMemo(() => {
    // Annual Cost of Manual Work = Employees × Wage × Hours × 52 weeks
    const annualCost = employees * hourlyWage * hoursPerWeek * 52;

    // Cost of Errors = Annual Cost × Error Rate
    const errorCost = annualCost * (errorRate / 100);

    // Total Current Waste = Annual Cost + Cost of Errors
    const totalWaste = annualCost + errorCost;

    // CloudScale Cost = $10,000 (Base) + ($50 × Employees)
    const cloudscaleCost = 10000 + (50 * employees);

    // Savings = Total Waste - CloudScale Cost
    const savings = totalWaste - cloudscaleCost;

    // ROI = (Total Current Waste - CloudScale Cost) / CloudScale Cost × 100
    const roi = ((totalWaste - cloudscaleCost) / cloudscaleCost) * 100;

    // 3-Year projections (5% annual inflation on current costs)
    const currentSpendYear1 = totalWaste;
    const currentSpendYear2 = totalWaste * 1.05;
    const currentSpendYear3 = totalWaste * 1.10;

    return {
      annualCost,
      errorCost,
      totalWaste,
      cloudscaleCost,
      savings,
      roi,
      currentSpendYear1,
      currentSpendYear2,
      currentSpendYear3,
    };
  }, [employees, hourlyWage, hoursPerWeek, errorRate]);

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">
            Cloud<span>Scale</span>
          </div>
        </div>

        <InputSliders
          employees={employees}
          setEmployees={setEmployees}
          hourlyWage={hourlyWage}
          setHourlyWage={setHourlyWage}
          hoursPerWeek={hoursPerWeek}
          setHoursPerWeek={setHoursPerWeek}
          errorRate={errorRate}
          setErrorRate={setErrorRate}
        />

        <div style={{ marginTop: '1.5rem' }}>
          <PDFButton roi={calculations.roi} savings={calculations.savings} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>ROI Calculator</h1>
          <p>See how much you can save with CloudScale workflow automation</p>
        </header>

        <ResultsDisplay
          annualCost={calculations.annualCost}
          errorCost={calculations.errorCost}
          totalWaste={calculations.totalWaste}
          cloudscaleCost={calculations.cloudscaleCost}
          roi={calculations.roi}
          savings={calculations.savings}
        />

        <ROIChart
          currentSpendYear1={calculations.currentSpendYear1}
          currentSpendYear2={calculations.currentSpendYear2}
          currentSpendYear3={calculations.currentSpendYear3}
          cloudscaleCost={calculations.cloudscaleCost}
        />

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 className="section-title">How We Calculate Your Savings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Annual Manual Labor Cost</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Employees × Hourly Wage × Weekly Hours × 52 weeks
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cost of Errors</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Annual Labor Cost × Error Rate %
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>CloudScale Cost</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                $10,000 base + $50 per employee
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--success)' }}>Your ROI</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                (Total Waste - CloudScale Cost) ÷ CloudScale Cost × 100
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
