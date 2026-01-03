'use client';

import React from 'react';

interface AdvancedResultsProps {
    // Tiered calculations
    generalStaffBenefit: number;
    specialistBenefit: number;
    totalBenefit: number;
    errorReductionSavings: number;

    // Costs
    cloudscaleCost: number;

    // ROI Range
    roiConservative: number;
    roiModerate: number;
    roiAggressive: number;
    currentRoi: number;

    // Savings
    netSavings: number;

    // Payback
    paybackMonths: number;

    // Efficiency mode for display
    efficiencyMode: 'conservative' | 'moderate' | 'aggressive';
}

export default function AdvancedResults({
    generalStaffBenefit,
    specialistBenefit,
    totalBenefit,
    errorReductionSavings,
    cloudscaleCost,
    roiConservative,
    roiModerate,
    roiAggressive,
    currentRoi,
    netSavings,
    paybackMonths,
    efficiencyMode,
}: AdvancedResultsProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatPercent = (value: number) => {
        if (value >= 10000) {
            return `${(value / 1000).toFixed(1)}K%`;
        }
        return `${value.toFixed(0)}%`;
    };

    const formatPayback = (months: number) => {
        if (months <= 0 || !isFinite(months)) return "Immediate";
        if (months < 1) return `${Math.round(months * 30)} days`;
        if (months > 24) return "24+ months";
        return `${months.toFixed(1)} months`;
    };

    // Calculate position on the range bar
    const getRangePosition = () => {
        const range = roiAggressive - roiConservative;
        if (range === 0) return 50;
        return ((currentRoi - roiConservative) / range) * 100;
    };

    return (
        <div className="advanced-results animate-fade-in">
            {/* Confidence Range Banner */}
            <div className="confidence-range-card">
                <h3 className="section-title">ROI Confidence Range</h3>
                <div className="range-visualization">
                    <div className="range-bar">
                        <div
                            className="range-fill"
                            style={{ width: '100%' }}
                        />
                        <div
                            className="current-marker"
                            style={{ left: `${getRangePosition()}%` }}
                        >
                            <span className="marker-label">{formatPercent(currentRoi)}</span>
                        </div>
                    </div>
                    <div className="range-labels">
                        <div className="range-endpoint conservative">
                            <span className="endpoint-label">Conservative</span>
                            <span className="endpoint-value">{formatPercent(roiConservative)}</span>
                        </div>
                        <div className="range-endpoint current">
                            <span className="endpoint-label">{efficiencyMode.charAt(0).toUpperCase() + efficiencyMode.slice(1)}</span>
                            <span className="endpoint-value">{formatPercent(currentRoi)}</span>
                        </div>
                        <div className="range-endpoint aggressive">
                            <span className="endpoint-label">Aggressive</span>
                            <span className="endpoint-value">{formatPercent(roiAggressive)}</span>
                        </div>
                    </div>
                </div>
                <p className="range-note">
                    Your ROI is likely between <strong>{formatPercent(roiConservative)}</strong> (worst-case) and <strong>{formatPercent(roiAggressive)}</strong> (best-case)
                </p>
            </div>

            {/* Payback Period Highlight */}
            <div className="payback-highlight">
                <div className="payback-icon">📈</div>
                <div className="payback-content">
                    <div className="payback-value">{formatPayback(paybackMonths)}</div>
                    <div className="payback-label">Payback Period</div>
                </div>
                <div className="payback-visual">
                    {paybackMonths <= 12 && paybackMonths > 0 && (
                        <div className="payback-bar">
                            {Array.from({ length: 12 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`payback-month ${i < Math.ceil(paybackMonths) ? 'filled' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tiered Benefits Breakdown */}
            <div className="card benefits-breakdown">
                <h3 className="section-title">Value by Workforce Tier</h3>
                <div className="tier-benefits">
                    <div className="tier-benefit-row">
                        <div className="tier-info">
                            <span className="tier-badge general">Tier 1</span>
                            <span className="tier-name">General Staff</span>
                            <span className="utility-factor">×0.5 utility</span>
                        </div>
                        <div className="tier-value">{formatCurrency(generalStaffBenefit)}</div>
                    </div>
                    <div className="tier-benefit-row specialist">
                        <div className="tier-info">
                            <span className="tier-badge specialist">Tier 2</span>
                            <span className="tier-name">Specialists</span>
                            <span className="utility-factor">×1.2 utility</span>
                        </div>
                        <div className="tier-value">{formatCurrency(specialistBenefit)}</div>
                    </div>
                    <div className="tier-benefit-row error">
                        <div className="tier-info">
                            <span className="tier-badge error">Bonus</span>
                            <span className="tier-name">Error Reduction</span>
                        </div>
                        <div className="tier-value">{formatCurrency(errorReductionSavings)}</div>
                    </div>
                    <div className="tier-total">
                        <span>Total Annual Benefit</span>
                        <span>{formatCurrency(totalBenefit + errorReductionSavings)}</span>
                    </div>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-value positive">{formatCurrency(netSavings)}</div>
                    <div className="stat-label">Net Annual Savings</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-value">{formatCurrency(cloudscaleCost)}</div>
                    <div className="stat-label">CloudScale Investment</div>
                </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="disclaimer">
                <p>
                    <strong>Disclaimer:</strong> The results provided by this calculator are estimates based on the information you provided and industry benchmarks.
                    Actual results may vary based on your specific business environment, implementation quality, and adoption rates.
                    This tool is provided for educational and planning purposes only.
                </p>
            </div>
        </div>
    );
}
