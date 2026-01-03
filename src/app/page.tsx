'use client';

import React, { useState, useMemo } from 'react';
import TieredInputs from '@/components/TieredInputs';
import IVRMInputs from '@/components/IVRMInputs';
import AdvancedResults from '@/components/AdvancedResults';
import JCurveChart from '@/components/JCurveChart';
import ROIChart from '@/components/ROIChart';
import PDFButton from '@/components/PDFButton';
import ValueLeakage from '@/components/ValueLeakage';
import CapExOpExComparison from '@/components/CapExOpExComparison';

export default function Home() {
  // =============================================
  // TIER 1: General Staff (80%)
  // =============================================
  const [generalStaffCount, setGeneralStaffCount] = useState(40);
  const [generalStaffWage, setGeneralStaffWage] = useState(35);
  const [generalStaffHours, setGeneralStaffHours] = useState(8);

  // =============================================
  // TIER 2: Specialists (20%)
  // =============================================
  const [specialistCount, setSpecialistCount] = useState(10);
  const [specialistWage, setSpecialistWage] = useState(125);
  const [specialistHours, setSpecialistHours] = useState(12);

  // =============================================
  // EFFICIENCY MODE (Default: Conservative per CFO audit)
  // =============================================
  const [efficiencyMode, setEfficiencyMode] = useState<'conservative' | 'moderate' | 'aggressive'>('conservative');
  const [errorRate, setErrorRate] = useState(5);

  // =============================================
  // CFO AUDIT: Value Capture Rate
  // "Hours Saved" → How much actually converts to P&L?
  // =============================================
  const [valueCaptureRate, setValueCaptureRate] = useState(50); // 30%, 50%, 70%

  // =============================================
  // VIEW MODE: CFO (Conservative) vs Sales (Aggressive)
  // =============================================
  const [viewMode, setViewMode] = useState<'cfo' | 'sales'>('cfo');

  // =============================================
  // IVRM: Theory of Constraints
  // =============================================
  const [isBottleneck, setIsBottleneck] = useState(true);

  // =============================================
  // IVRM: Cost of Poor Quality (COPQ)
  // =============================================
  const [scrapRate, setScrapRate] = useState(3);
  const [reworkRate, setReworkRate] = useState(5);
  const [warrantyRate, setWarrantyRate] = useState(1);

  // =============================================
  // IVRM: Total Cost of Ownership (TCO)
  // =============================================
  const [integrationCost, setIntegrationCost] = useState(25000);
  const [hardwareCapex, setHardwareCapex] = useState(40000);

  // =============================================
  // IVRM: Implementation Risk
  // =============================================
  const [jCurveDip, setJCurveDip] = useState(15);
  const [contingencyPercent, setContingencyPercent] = useState(20);

  // =============================================
  // Advanced Critique: Data Quality & Survivor Bias
  // =============================================
  const [dataQualityScore, setDataQualityScore] = useState(65);
  const survivorBiasRate = 40; // ~40% of projects fail in the J-Curve valley

  // =============================================
  // UTILITY FACTORS (from strategic analysis)
  // =============================================
  const UTILITY_GENERAL = 0.5;
  const UTILITY_SPECIALIST = 1.2;

  const EFFICIENCY_FACTORS = {
    conservative: 0.50,
    moderate: 0.75,
    aggressive: 1.00,
  };

  // =============================================
  // MEVA CALCULATION (Industrial Value Realization Model)
  // =============================================
  const calculations = useMemo(() => {
    const efficiencyFactor = EFFICIENCY_FACTORS[efficiencyMode];
    const totalEmployees = generalStaffCount + specialistCount;

    // ===========================================
    // THROUGHPUT CALCULATION (Revenue Impact)
    // ===========================================
    const generalStaffAnnualHours = generalStaffHours * 52;
    const specialistAnnualHours = specialistHours * 52;

    // Raw Throughput Benefit (before constraint adjustment)
    const generalStaffBenefitRaw =
      generalStaffCount * generalStaffWage * generalStaffAnnualHours * UTILITY_GENERAL * efficiencyFactor;
    const specialistBenefitRaw =
      specialistCount * specialistWage * specialistAnnualHours * UTILITY_SPECIALIST * efficiencyFactor;

    // THEORY OF CONSTRAINTS ADJUSTMENT
    // If not a bottleneck, only 10% of the value is realized (per Goldratt)
    const constraintMultiplier = isBottleneck ? 1.0 : 0.1;

    const generalStaffBenefit = generalStaffBenefitRaw * constraintMultiplier;
    const specialistBenefit = specialistBenefitRaw * constraintMultiplier;
    const totalThroughputBenefit = generalStaffBenefit + specialistBenefit;

    // ===========================================
    // COPQ CALCULATION (Cost of Poor Quality)
    // ===========================================
    const totalAnnualLaborCost =
      (generalStaffCount * generalStaffWage * generalStaffAnnualHours) +
      (specialistCount * specialistWage * specialistAnnualHours);

    // Internal Failure Costs (1-10x)
    const scrapCost = totalAnnualLaborCost * (scrapRate / 100) * 1; // Base cost
    const reworkCost = totalAnnualLaborCost * (reworkRate / 100) * 2; // 2x because rework consumes capacity twice
    const internalFailureCost = scrapCost + reworkCost;

    // External Failure Costs (100x)
    const warrantyCost = totalAnnualLaborCost * (warrantyRate / 100) * 10; // External failures are 10x more expensive
    const externalFailureCost = warrantyCost;

    const totalCOPQ = internalFailureCost + externalFailureCost;

    // COPQ Reduction (assuming tool reduces COPQ by efficiency factor)
    const copqReduction = totalCOPQ * efficiencyFactor * 0.5; // Tool can eliminate 50% of COPQ at max efficiency

    // ===========================================
    // TCO CALCULATION (Total Cost of Ownership)
    // ===========================================
    // Subscription cost (same as before)
    const subscriptionCost = 10000 + (50 * totalEmployees);

    // Integration + Hardware (amortized over 3 years)
    const amortizedCapex = (integrationCost + hardwareCapex) / 3;

    // Total OpEx + CapEx
    const totalOpEx = subscriptionCost + amortizedCapex;

    // ===========================================
    // RISK ADJUSTMENT
    // ===========================================
    // J-Curve disruption cost (first year)
    const jCurveDisruptionCost = totalAnnualLaborCost * (jCurveDip / 100) * 0.25; // Q1 disruption

    // Contingency reserve
    const contingencyReserve = totalOpEx * (contingencyPercent / 100);

    // ===========================================
    // VALUE CAPTURE RATE APPLICATION (CFO AUDIT FIX)
    // "Hours Saved" → How much actually converts to P&L?
    // ===========================================
    const valueCaptureMultiplier = valueCaptureRate / 100;

    // MEVA (Strategic Value) - Full theoretical value
    const grossBenefitTheoretical = totalThroughputBenefit + copqReduction;

    // Net Savings (Accounting Value) - With Value Capture Rate applied
    const grossBenefitRealized = grossBenefitTheoretical * valueCaptureMultiplier;

    const totalCosts = totalOpEx + jCurveDisruptionCost + contingencyReserve;

    // MEVA = Strategic (full theoretical value minus costs)
    const meva = grossBenefitTheoretical - totalCosts;

    // Net Savings = Accounting (realized value minus costs)
    const netSavingsAccounting = grossBenefitRealized - totalCosts;

    // ===========================================
    // DUAL ROI CALCULATION (CFO AUDIT FIX)
    // ===========================================
    const initialInvestment = integrationCost + hardwareCapex;
    const totalCostBasis = subscriptionCost + initialInvestment;

    // ROI Option A (CFO Preferred - Total Cost-based)
    // ROI = (Net Benefit - Total Cost) / Total Cost × 100
    const roiTotalCostBased = totalCostBasis > 0
      ? ((grossBenefitRealized - totalCostBasis) / totalCostBasis) * 100
      : 0;

    // ROI Option B (Sales/VC - Initial Investment-based)
    // ROI = Net Annual Cash Flow / Initial Investment × 100
    const netAnnualCashFlow = grossBenefitRealized - subscriptionCost;
    const roiInitialInvestment = initialInvestment > 0
      ? (netAnnualCashFlow / initialInvestment) * 100
      : 0;

    // Conservative/Moderate/Aggressive ranges (for CFO View)
    const roiConservative = roiTotalCostBased * 0.7;
    const roiModerate = roiTotalCostBased;
    const roiAggressive = roiInitialInvestment;

    // ===========================================
    // DUAL PAYBACK (CFO AUDIT FIX)
    // ===========================================
    // Cash Payback = Initial Investment / Monthly Net Cash Flow
    const monthlyNetCashFlow = netAnnualCashFlow / 12;
    const paybackCashMonths = monthlyNetCashFlow > 0
      ? initialInvestment / monthlyNetCashFlow
      : 999;

    // Operational Payback = Post J-Curve (add recovery time)
    const monthsToRecovery = Math.max(4, Math.min(9, 3 + Math.ceil(jCurveDip / 5)));
    const paybackOperationalMonths = paybackCashMonths + monthsToRecovery;

    // 3-Year projections
    const currentSpendYear1 = totalAnnualLaborCost + totalCOPQ;
    const currentSpendYear2 = currentSpendYear1 * 1.05;
    const currentSpendYear3 = currentSpendYear1 * 1.10;

    return {
      // Throughput
      generalStaffBenefit,
      specialistBenefit,
      totalThroughputBenefit,
      constraintMultiplier,

      // COPQ
      scrapCost,
      reworkCost,
      internalFailureCost,
      externalFailureCost,
      totalCOPQ,
      copqReduction,

      // TCO
      subscriptionCost,
      amortizedCapex,
      totalOpEx,
      totalInvestment: totalCostBasis, // Total cost basis for reference
      initialInvestment,

      // Risk
      jCurveDisruptionCost,
      contingencyReserve,

      // MEVA vs Net Savings (CFO AUDIT: separated)
      grossBenefitTheoretical, // MEVA basis (strategic)
      grossBenefitRealized,    // Accounting basis (with capture rate)
      totalCosts,
      meva,                     // Strategic value
      netSavingsAccounting,     // Accounting value

      // Dual ROI (CFO AUDIT FIX)
      roiTotalCostBased,        // ROI Option A (CFO)
      roiInitialInvestment,     // ROI Option B (Sales/VC)
      roiConservative,
      roiModerate,
      roiAggressive,
      currentRoi: roiTotalCostBased, // Default to CFO-preferred

      // Dual Payback (CFO AUDIT FIX)
      paybackCashMonths,        // Cash Payback
      paybackOperationalMonths, // Post J-Curve Payback
      paybackMonths: paybackCashMonths, // Legacy compatibility

      // Other
      monthsToRecovery,
      totalEmployees,
      currentSpendYear1,
      currentSpendYear2,
      currentSpendYear3,

      // Value Leakage (Identified vs Captured)
      valueIdentified: generalStaffBenefitRaw + specialistBenefitRaw + (totalCOPQ * efficiencyFactor),
      valueCaptured: Math.max(0, netSavingsAccounting), // Use accounting value
    };
  }, [
    generalStaffCount, generalStaffWage, generalStaffHours,
    specialistCount, specialistWage, specialistHours,
    efficiencyMode, errorRate, valueCaptureRate,
    isBottleneck, scrapRate, reworkRate, warrantyRate,
    integrationCost, hardwareCapex, jCurveDip, contingencyPercent
  ]);

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">
            Cloud<span>Scale</span>
            <span className="logo-subtitle">IVRM Calculator</span>
          </div>
        </div>

        {/* CFO/Sales View Toggle */}
        <div className="card view-mode-card">
          <div className="view-mode-header">
            <span className="view-mode-icon">👁️</span>
            <h4>View Mode</h4>
          </div>
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === 'cfo' ? 'active cfo' : ''}`}
              onClick={() => setViewMode('cfo')}
            >
              <span className="view-mode-btn-icon">📊</span>
              <span className="view-mode-btn-label">CFO View</span>
              <span className="view-mode-btn-desc">Conservative</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'sales' ? 'active sales' : ''}`}
              onClick={() => setViewMode('sales')}
            >
              <span className="view-mode-btn-icon">🚀</span>
              <span className="view-mode-btn-label">Sales View</span>
              <span className="view-mode-btn-desc">Aggressive</span>
            </button>
          </div>
        </div>

        {/* Value Capture Rate (CFO Audit Fix) */}
        <div className="card value-capture-card">
          <div className="value-capture-header">
            <span className="value-capture-icon">💹</span>
            <h4>Value Capture Rate</h4>
          </div>
          <p className="value-capture-description">
            "Hours Saved" → What % actually converts to P&L?<br />
            <small>(CFO Question: Did you reduce headcount with that time?)</small>
          </p>
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Realized P&L Conversion</span>
              <span className={`slider-value ${valueCaptureRate < 50 ? 'conservative' : valueCaptureRate > 70 ? 'aggressive' : ''}`}>
                {valueCaptureRate}%
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="10"
              value={valueCaptureRate}
              onChange={(e) => setValueCaptureRate(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>30% (Conservative)</span>
              <span>70%+</span>
            </div>
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

        <IVRMInputs
          isBottleneck={isBottleneck}
          setIsBottleneck={setIsBottleneck}
          scrapRate={scrapRate}
          setScrapRate={setScrapRate}
          reworkRate={reworkRate}
          setReworkRate={setReworkRate}
          warrantyRate={warrantyRate}
          setWarrantyRate={setWarrantyRate}
          integrationCost={integrationCost}
          setIntegrationCost={setIntegrationCost}
          hardwareCapex={hardwareCapex}
          setHardwareCapex={setHardwareCapex}
          jCurveDip={jCurveDip}
          setJCurveDip={setJCurveDip}
          contingencyPercent={contingencyPercent}
          setContingencyPercent={setContingencyPercent}
        />

        <div style={{ marginTop: '1.5rem' }}>
          <PDFButton
            roi={calculations.roiTotalCostBased}
            savings={calculations.meva}
            generalStaffBenefit={calculations.generalStaffBenefit}
            specialistBenefit={calculations.specialistBenefit}
            errorReductionSavings={calculations.copqReduction}
            cloudscaleCost={calculations.totalInvestment}
            paybackMonths={calculations.paybackMonths}
            totalEmployees={calculations.totalEmployees}
            efficiencyMode={efficiencyMode}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Industrial Value Realization Model</h1>
          <p>Manufacturing-grade ROI with Theory of Constraints, COPQ, and Risk Adjustment</p>
        </header>

        {/* Constraint Warning */}
        {!isBottleneck && (
          <div className="constraint-alert">
            <div className="constraint-alert-icon">⚠️</div>
            <div className="constraint-alert-content">
              <strong>Theory of Constraints Warning</strong>
              <p>
                You indicated this process is NOT a bottleneck. Per Goldratt's Theory of Constraints,
                improving a non-constraint yields near-zero throughput gains. Only 10% of calculated
                value is being applied.
              </p>
            </div>
          </div>
        )}

        <AdvancedResults
          generalStaffBenefit={calculations.generalStaffBenefit}
          specialistBenefit={calculations.specialistBenefit}
          totalBenefit={calculations.totalThroughputBenefit}
          errorReductionSavings={calculations.copqReduction}
          cloudscaleCost={calculations.totalInvestment}
          roiConservative={calculations.roiConservative}
          roiModerate={calculations.roiModerate}
          roiAggressive={calculations.roiAggressive}
          currentRoi={calculations.roiTotalCostBased}
          netSavings={calculations.meva}
          paybackMonths={calculations.paybackMonths}
          efficiencyMode={efficiencyMode}
        />

        {/* COPQ Breakdown */}
        <div className="card copq-breakdown-card">
          <h3 className="section-title">Cost of Poor Quality (COPQ) Analysis</h3>
          <div className="copq-iceberg">
            <div className="iceberg-visible">
              <span className="iceberg-label">Visible (External Failure)</span>
              <span className="iceberg-value">${Math.round(calculations.externalFailureCost).toLocaleString()}</span>
              <span className="iceberg-desc">Warranty, Recalls, Brand Damage</span>
            </div>
            <div className="iceberg-waterline"></div>
            <div className="iceberg-hidden">
              <span className="iceberg-label">Hidden (Internal Failure)</span>
              <span className="iceberg-value">${Math.round(calculations.internalFailureCost).toLocaleString()}</span>
              <span className="iceberg-desc">Scrap, Rework, Inspection Labor</span>
            </div>
          </div>
          <div className="copq-summary">
            <div className="copq-summary-item">
              <span>Total COPQ (Current)</span>
              <span className="negative">${Math.round(calculations.totalCOPQ).toLocaleString()}</span>
            </div>
            <div className="copq-summary-item">
              <span>COPQ Reduction (CloudScale)</span>
              <span className="positive">+${Math.round(calculations.copqReduction).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* J-Curve Chart */}
        <JCurveChart
          jCurveDip={jCurveDip}
          monthsToRecovery={calculations.monthsToRecovery}
          annualBenefit={calculations.grossBenefitTheoretical}
        />

        <ROIChart
          currentSpendYear1={calculations.currentSpendYear1}
          currentSpendYear2={calculations.currentSpendYear2}
          currentSpendYear3={calculations.currentSpendYear3}
          cloudscaleCost={calculations.totalInvestment}
        />

        {/* MEVA Formula */}
        <div className="card methodology-card">
          <div className="methodology-header">
            <h3 className="section-title">MEVA: Manufacturing Economic Value Added</h3>
            <span className="badge-research">Industrial Value Realization Model</span>
          </div>

          <div className="methodology-content">
            <div className="formula-display large">
              <code>MEVA = ΔThroughput − (ΔOpEx + ΔCapEx + ΔCOPQ + Risk Premium)</code>
            </div>

            <div className="meva-breakdown">
              <div className="meva-item positive">
                <span className="meva-label">Δ Throughput</span>
                <span className="meva-value">+${Math.round(calculations.grossBenefitTheoretical).toLocaleString()}</span>
                <span className="meva-note">Bottleneck-adjusted value creation</span>
              </div>
              <div className="meva-item negative">
                <span className="meva-label">Δ OpEx + CapEx</span>
                <span className="meva-value">-${Math.round(calculations.totalOpEx).toLocaleString()}</span>
                <span className="meva-note">Subscription + Amortized hardware</span>
              </div>
              <div className="meva-item negative">
                <span className="meva-label">Risk Premium</span>
                <span className="meva-value">-${Math.round(calculations.jCurveDisruptionCost + calculations.contingencyReserve).toLocaleString()}</span>
                <span className="meva-note">J-Curve + Contingency</span>
              </div>
              <div className="meva-total">
                <span className="meva-label">Net MEVA</span>
                <span className={`meva-value ${calculations.meva >= 0 ? 'positive' : 'negative'}`}>
                  ${Math.round(calculations.meva).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Leakage Analysis */}
        <ValueLeakage
          identifiedValue={calculations.valueIdentified}
          capturedValue={calculations.valueCaptured}
          survivorBiasRate={survivorBiasRate}
          dataQualityScore={dataQualityScore}
        />

        {/* CapEx vs OpEx 10-Year TCO Comparison */}
        <CapExOpExComparison
          subscriptionCost={calculations.subscriptionCost}
          integrationCost={integrationCost}
          hardwareCapex={hardwareCapex}
        />
      </main>
    </div>
  );
}
