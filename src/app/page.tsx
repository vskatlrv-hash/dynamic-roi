'use client';

import React, { useState, useMemo } from 'react';
import TieredInputs from '@/components/TieredInputs';
import AdvancedResults from '@/components/AdvancedResults';
import ROIChart from '@/components/ROIChart';
import PDFButton from '@/components/PDFButton';

export default function Home() {
  // Tier 1: General Staff (default 80%)
  const [generalStaffCount, setGeneralStaffCount] = useState(40);
  const [generalStaffWage, setGeneralStaffWage] = useState(35); // Fully loaded cost
  const [generalStaffHours, setGeneralStaffHours] = useState(8);

  // Tier 2: Specialists (default 20%)
  const [specialistCount, setSpecialistCount] = useState(10);
  const [specialistWage, setSpecialistWage] = useState(125); // Fully loaded cost
  const [specialistHours, setSpecialistHours] = useState(12);

  // Efficiency Mode
  const [efficiencyMode, setEfficiencyMode] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

  // Error Rate
  const [errorRate, setErrorRate] = useState(5);

  // Utility Factors (from strategic analysis)
  const UTILITY_GENERAL = 0.5;  // Time saved is cost avoidance
  const UTILITY_SPECIALIST = 1.2; // Time saved creates opportunity value

  // Efficiency Factors
  const EFFICIENCY_FACTORS = {
    conservative: 0.50,
    moderate: 0.75,
    aggressive: 1.00,
  };

  // Calculate ROI metrics using the Tiered Weighted Model
  const calculations = useMemo(() => {
    const efficiencyFactor = EFFICIENCY_FACTORS[efficiencyMode];
    const totalEmployees = generalStaffCount + specialistCount;

    // Weighted Benefit Formula:
    // Total Benefit = Σ(Ni × Ci × ΔT × Ui × E)
    // Where: N=count, C=cost, ΔT=time saved (annual), U=utility, E=efficiency

    // General Staff Annual Benefit
    // Hours saved per year = weekly hours × 52
    const generalStaffAnnualHours = generalStaffHours * 52;
    const generalStaffBenefit =
      generalStaffCount * generalStaffWage * generalStaffAnnualHours * UTILITY_GENERAL * efficiencyFactor;

    // Specialist Annual Benefit
    const specialistAnnualHours = specialistHours * 52;
    const specialistBenefit =
      specialistCount * specialistWage * specialistAnnualHours * UTILITY_SPECIALIST * efficiencyFactor;

    // Total Time-Based Benefit
    const totalBenefit = generalStaffBenefit + specialistBenefit;

    // Error Reduction Savings (applied to total labor cost)
    const totalAnnualLaborCost =
      (generalStaffCount * generalStaffWage * generalStaffAnnualHours) +
      (specialistCount * specialistWage * specialistAnnualHours);
    const errorReductionSavings = totalAnnualLaborCost * (errorRate / 100) * efficiencyFactor;

    // CloudScale Investment = $10,000 base + $50 per employee
    const cloudscaleCost = 10000 + (50 * totalEmployees);

    // Net Savings
    const netSavings = (totalBenefit + errorReductionSavings) - cloudscaleCost;

    // ROI Calculation for different efficiency scenarios
    const calculateROI = (efficiency: number) => {
      const generalBenefitAdj = generalStaffCount * generalStaffWage * generalStaffAnnualHours * UTILITY_GENERAL * efficiency;
      const specialistBenefitAdj = specialistCount * specialistWage * specialistAnnualHours * UTILITY_SPECIALIST * efficiency;
      const errorBenefitAdj = totalAnnualLaborCost * (errorRate / 100) * efficiency;
      const totalBenefitAdj = generalBenefitAdj + specialistBenefitAdj + errorBenefitAdj;
      return ((totalBenefitAdj - cloudscaleCost) / cloudscaleCost) * 100;
    };

    const roiConservative = calculateROI(0.50);
    const roiModerate = calculateROI(0.75);
    const roiAggressive = calculateROI(1.00);
    const currentRoi = calculateROI(efficiencyFactor);

    // Payback Period (in months)
    // Monthly Net Savings = (Monthly Benefit - Monthly Subscription)
    const monthlyBenefit = (totalBenefit + errorReductionSavings) / 12;
    const monthlySubscription = cloudscaleCost / 12;
    const monthlyNetSavings = monthlyBenefit - monthlySubscription;
    const paybackMonths = monthlyNetSavings > 0 ? cloudscaleCost / (monthlyNetSavings * 12) * 12 : Infinity;

    // 3-Year projections with 5% annual cost inflation
    const currentAnnualSpend = totalAnnualLaborCost + (totalAnnualLaborCost * (errorRate / 100));
    const currentSpendYear1 = currentAnnualSpend;
    const currentSpendYear2 = currentAnnualSpend * 1.05;
    const currentSpendYear3 = currentAnnualSpend * 1.10;

    return {
      generalStaffBenefit,
      specialistBenefit,
      totalBenefit,
      errorReductionSavings,
      cloudscaleCost,
      netSavings,
      roiConservative,
      roiModerate,
      roiAggressive,
      currentRoi,
      paybackMonths,
      currentSpendYear1,
      currentSpendYear2,
      currentSpendYear3,
      totalEmployees,
    };
  }, [
    generalStaffCount, generalStaffWage, generalStaffHours,
    specialistCount, specialistWage, specialistHours,
    efficiencyMode, errorRate
  ]);

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

        <TieredInputs
          generalStaffCount={generalStaffCount}
          setGeneralStaffCount={setGeneralStaffCount}
          generalStaffWage={generalStaffWage}
          setGeneralStaffWage={setGeneralStaffWage}
          generalStaffHours={generalStaffHours}
          setGeneralStaffHours={setGeneralStaffHours}
          specialistCount={specialistCount}
          setSpecialistCount={setSpecialistCount}
          specialistWage={specialistWage}
          setSpecialistWage={setSpecialistWage}
          specialistHours={specialistHours}
          setSpecialistHours={setSpecialistHours}
          efficiencyMode={efficiencyMode}
          setEfficiencyMode={setEfficiencyMode}
          errorRate={errorRate}
          setErrorRate={setErrorRate}
        />

        <div style={{ marginTop: '1.5rem' }}>
          <PDFButton roi={calculations.currentRoi} savings={calculations.netSavings} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Strategic ROI Calculator</h1>
          <p>Tiered workforce analysis with Power Law distribution modeling</p>
        </header>

        <AdvancedResults
          generalStaffBenefit={calculations.generalStaffBenefit}
          specialistBenefit={calculations.specialistBenefit}
          totalBenefit={calculations.totalBenefit}
          errorReductionSavings={calculations.errorReductionSavings}
          cloudscaleCost={calculations.cloudscaleCost}
          roiConservative={calculations.roiConservative}
          roiModerate={calculations.roiModerate}
          roiAggressive={calculations.roiAggressive}
          currentRoi={calculations.currentRoi}
          netSavings={calculations.netSavings}
          paybackMonths={calculations.paybackMonths}
          efficiencyMode={efficiencyMode}
        />

        <ROIChart
          currentSpendYear1={calculations.currentSpendYear1}
          currentSpendYear2={calculations.currentSpendYear2}
          currentSpendYear3={calculations.currentSpendYear3}
          cloudscaleCost={calculations.cloudscaleCost}
        />

        <div className="card methodology-card">
          <h3 className="section-title">Methodology: Tiered Weighted Model</h3>
          <div className="formula-grid">
            <div className="formula-item">
              <div className="formula-header">
                <span className="formula-icon">📊</span>
                <strong>Total Benefit</strong>
              </div>
              <code className="formula">Σ(Nᵢ × Cᵢ × ΔTᵢ × Uᵢ × E)</code>
              <p className="formula-desc">
                Where N=headcount, C=fully loaded cost, ΔT=time saved, U=utility factor, E=efficiency
              </p>
            </div>
            <div className="formula-item">
              <div className="formula-header">
                <span className="formula-icon">🎯</span>
                <strong>Utility Factors</strong>
              </div>
              <div className="utility-breakdown">
                <span className="utility-row"><span className="tier-badge general">Tier 1</span> U = 0.5 (cost avoidance)</span>
                <span className="utility-row"><span className="tier-badge specialist">Tier 2</span> U = 1.2 (opportunity value)</span>
              </div>
            </div>
            <div className="formula-item">
              <div className="formula-header">
                <span className="formula-icon">💰</span>
                <strong>Investment</strong>
              </div>
              <code className="formula">$10,000 + ($50 × Total Employees)</code>
            </div>
            <div className="formula-item">
              <div className="formula-header">
                <span className="formula-icon">📈</span>
                <strong>ROI</strong>
              </div>
              <code className="formula">(Total Benefit - Investment) ÷ Investment × 100</code>
            </div>
          </div>

          <div className="methodology-note">
            <strong>Why Tiered?</strong> Research shows knowledge worker performance follows a Power Law distribution,
            not a Bell Curve. Simple averages underestimate specialist impact by up to 75%.
            This model captures the disproportionate value created by your high-performers.
          </div>
        </div>
      </main>
    </div>
  );
}
