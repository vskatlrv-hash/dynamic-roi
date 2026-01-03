'use client';

import React from 'react';

interface ResultsDisplayProps {
    annualCost: number;
    errorCost: number;
    totalWaste: number;
    cloudscaleCost: number;
    roi: number;
    savings: number;
}

export default function ResultsDisplay({
    annualCost,
    errorCost,
    totalWaste,
    cloudscaleCost,
    roi,
    savings,
}: ResultsDisplayProps) {
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

    return (
        <div className="animate-fade-in">
            {/* ROI Highlight Card */}
            <div className="roi-highlight" style={{ marginBottom: '1.5rem' }}>
                <div className="roi-value">{formatPercent(roi)}</div>
                <div className="roi-label">Return on Investment (Year 1)</div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-value negative">{formatCurrency(annualCost)}</div>
                    <div className="stat-label">Annual Manual Labor Cost</div>
                </div>

                <div className="card stat-card">
                    <div className="stat-value negative">{formatCurrency(errorCost)}</div>
                    <div className="stat-label">Cost of Data Entry Errors</div>
                </div>

                <div className="card stat-card">
                    <div className="stat-value negative">{formatCurrency(totalWaste)}</div>
                    <div className="stat-label">Total Current Waste</div>
                </div>

                <div className="card stat-card">
                    <div className="stat-value">{formatCurrency(cloudscaleCost)}</div>
                    <div className="stat-label">CloudScale Annual Cost</div>
                </div>

                <div className="card stat-card" style={{ gridColumn: 'span 2' }}>
                    <div className="stat-value positive">{formatCurrency(savings)}</div>
                    <div className="stat-label">Your Annual Savings</div>
                </div>
            </div>
        </div>
    );
}
