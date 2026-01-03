'use client';

import React from 'react';

interface ValueLeakageProps {
    identifiedValue: number;
    capturedValue: number;
    survivorBiasRate: number;
    dataQualityScore: number;
}

export default function ValueLeakage({
    identifiedValue,
    capturedValue,
    survivorBiasRate,
    dataQualityScore,
}: ValueLeakageProps) {
    const leakagePercent = ((identifiedValue - capturedValue) / identifiedValue) * 100;
    const capturedPercent = (capturedValue / identifiedValue) * 100;

    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`;
        }
        return `$${value.toFixed(0)}`;
    };

    return (
        <div className="card value-leakage-card">
            <div className="value-leakage-header">
                <span className="value-leakage-icon">🕳️</span>
                <h4>Value Realization & Risk</h4>
                <span className="value-leakage-badge">Identified vs. Captured</span>
            </div>

            <p className="value-leakage-description">
                "Value Identified" ≠ "Value Captured". The gap is <strong>Implementation Leakage</strong>.
            </p>

            {/* Value Funnel */}
            <div className="value-funnel">
                <div className="funnel-stage identified">
                    <div className="funnel-bar" style={{ width: '100%' }}></div>
                    <div className="funnel-content">
                        <span className="funnel-label">Value Identified</span>
                        <span className="funnel-value">{formatCurrency(identifiedValue)}</span>
                    </div>
                </div>

                <div className="funnel-arrow">
                    <span className="funnel-loss">-{leakagePercent.toFixed(0)}% Leakage</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="funnel-stage captured">
                    <div className="funnel-bar" style={{ width: `${capturedPercent}%` }}></div>
                    <div className="funnel-content">
                        <span className="funnel-label">Value Captured (P&L)</span>
                        <span className="funnel-value">{formatCurrency(capturedValue)}</span>
                    </div>
                </div>
            </div>

            {/* Leakage Factors */}
            <div className="leakage-factors">
                <h5>Leakage Drivers</h5>
                <div className="leakage-factor">
                    <div className="factor-info">
                        <span className="factor-icon">📉</span>
                        <span className="factor-name">J-Curve Productivity Dip</span>
                    </div>
                    <span className="factor-impact">~1.33 pp decline</span>
                </div>
                <div className="leakage-factor">
                    <div className="factor-info">
                        <span className="factor-icon">🔧</span>
                        <span className="factor-name">Integration Tax (Brownfield)</span>
                    </div>
                    <span className="factor-impact">30-50% of effort</span>
                </div>
                <div className="leakage-factor">
                    <div className="factor-info">
                        <span className="factor-icon">🎯</span>
                        <span className="factor-name">Non-Bottleneck Waste (TOC)</span>
                    </div>
                    <span className="factor-impact">~90% of local gains</span>
                </div>
            </div>

            {/* Survivor Bias Warning -> Adoption Variability */}
            <div className="survivor-bias-section">
                <div className="survivor-bias-header">
                    <span className="survivor-icon">📊</span>
                    <h5>Adoption Variability</h5>
                </div>
                <p className="survivor-description">
                    Not all projects maximize value. Best-in-class teams navigate the "J-Curve" valley successfully.
                </p>
                <div className="survivor-stats">
                    <div className="survivor-stat fail">
                        <span className="survivor-stat-value">{survivorBiasRate}%</span>
                        <span className="survivor-stat-label">Challenged</span>
                    </div>
                    <div className="survivor-stat survive">
                        <span className="survivor-stat-value">{100 - survivorBiasRate}%</span>
                        <span className="survivor-stat-label">Optimized</span>
                    </div>
                </div>
            </div>

            {/* Data Quality Impact -> Readiness */}
            <div className="data-quality-section">
                <div className="data-quality-header">
                    <span className="data-icon">📋</span>
                    <h5>Data Readiness / Maturity</h5>
                    <span className="data-cost">Impact on Automation</span>
                </div>
                <p className="data-description">
                    Consistent data is a prerequisite for automation. Inconsistent data may require a readiness plan.
                </p>
                <div className="data-quality-meter">
                    <div className="meter-label">
                        <span>Data Maturity Score</span>
                        <span className={`meter-value ${dataQualityScore >= 80 ? 'good' : dataQualityScore >= 60 ? 'warning' : 'bad'}`}>
                            {dataQualityScore}%
                        </span>
                    </div>
                    <div className="meter-track">
                        <div
                            className={`meter-fill ${dataQualityScore >= 80 ? 'good' : dataQualityScore >= 60 ? 'warning' : 'bad'}`}
                            style={{ width: `${dataQualityScore}%` }}
                        ></div>
                    </div>
                    <div className="meter-labels">
                        <span>Initiating</span>
                        <span>Developing</span>
                        <span>Optimized</span>
                    </div>
                </div>
                {dataQualityScore < 70 && (
                    <div className="data-warning">
                        <strong>ℹ️ Note:</strong> Lower data maturity may require a phased deployment to ensure reliability.
                    </div>
                )}
            </div>
        </div>
    );
}
