'use client';

import React from 'react';

interface TieredInputsProps {
    // General Staff (80%)
    generalStaffCount: number;
    setGeneralStaffCount: (value: number) => void;
    generalStaffWage: number;
    setGeneralStaffWage: (value: number) => void;
    generalStaffHours: number;
    setGeneralStaffHours: (value: number) => void;

    // Specialists (20%)
    specialistCount: number;
    setSpecialistCount: (value: number) => void;
    specialistWage: number;
    setSpecialistWage: (value: number) => void;
    specialistHours: number;
    setSpecialistHours: (value: number) => void;

    // Efficiency Factor
    efficiencyMode: 'conservative' | 'moderate' | 'aggressive';
    setEfficiencyMode: (value: 'conservative' | 'moderate' | 'aggressive') => void;

    // Error Rate
    errorRate: number;
    setErrorRate: (value: number) => void;
}

export default function TieredInputs({
    generalStaffCount,
    setGeneralStaffCount,
    generalStaffWage,
    setGeneralStaffWage,
    generalStaffHours,
    setGeneralStaffHours,
    specialistCount,
    setSpecialistCount,
    specialistWage,
    setSpecialistWage,
    specialistHours,
    setSpecialistHours,
    efficiencyMode,
    setEfficiencyMode,
    errorRate,
    setErrorRate,
}: TieredInputsProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const totalEmployees = generalStaffCount + specialistCount;

    return (
        <div className="tiered-inputs">
            {/* Tier 1: General Staff */}
            <div className="card tier-card">
                <div className="tier-header">
                    <span className="tier-badge general">Tier 1</span>
                    <h4>General Staff</h4>
                    <p className="tier-description">Standard tasks, lower focus time value</p>
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Headcount</span>
                        <span className="slider-value">{generalStaffCount}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={generalStaffCount}
                        onChange={(e) => setGeneralStaffCount(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(generalStaffCount / 200) * 100}%, #1a1a25 ${(generalStaffCount / 200) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Fully Loaded Hourly Cost</span>
                        <span className="slider-value">{formatCurrency(generalStaffWage)}/hr</span>
                    </div>
                    <input
                        type="range"
                        min="15"
                        max="75"
                        value={generalStaffWage}
                        onChange={(e) => setGeneralStaffWage(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((generalStaffWage - 15) / 60) * 100}%, #1a1a25 ${((generalStaffWage - 15) / 60) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Hours Saved Weekly</span>
                        <span className="slider-value">{generalStaffHours} hrs</span>
                    </div>
                    <p className="slider-sublabel" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Less manual reporting, admin tasks
                    </p>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={generalStaffHours}
                        onChange={(e) => setGeneralStaffHours(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((generalStaffHours - 1) / 19) * 100}%, #1a1a25 ${((generalStaffHours - 1) / 19) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Tier 2: Specialists */}
            <div className="card tier-card specialist">
                <div className="tier-header">
                    <span className="tier-badge specialist">Tier 2</span>
                    <h4>Specialists / High-Performers</h4>
                    <p className="tier-description">Complex tasks, high focus time value (×1.2 utility)</p>
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Headcount</span>
                        <span className="slider-value">{specialistCount}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={specialistCount}
                        onChange={(e) => setSpecialistCount(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(specialistCount / 50) * 100}%, #1a1a25 ${(specialistCount / 50) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Fully Loaded Hourly Cost</span>
                        <span className="slider-value">{formatCurrency(specialistWage)}/hr</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="250"
                        value={specialistWage}
                        onChange={(e) => setSpecialistWage(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((specialistWage - 50) / 200) * 100}%, #1a1a25 ${((specialistWage - 50) / 200) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Hours Saved Weekly</span>
                        <span className="slider-value">{specialistHours} hrs</span>
                    </div>
                    <p className="slider-sublabel" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Fewer inspection loops, faster analysis
                    </p>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={specialistHours}
                        onChange={(e) => setSpecialistHours(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((specialistHours - 1) / 29) * 100}%, #1a1a25 ${((specialistHours - 1) / 29) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Efficiency Mode & Error Rate */}
            <div className="card">
                <h4 className="section-title">Productivity & Risk Factors</h4>

                <div className="efficiency-toggle">
                    <label>Efficiency Capture Rate</label>
                    <div className="toggle-buttons">
                        <button
                            className={`toggle-btn ${efficiencyMode === 'conservative' ? 'active conservative' : ''}`}
                            onClick={() => setEfficiencyMode('conservative')}
                        >
                            Conservative
                            <span className="toggle-value">50%</span>
                        </button>
                        <button
                            className={`toggle-btn ${efficiencyMode === 'moderate' ? 'active moderate' : ''}`}
                            onClick={() => setEfficiencyMode('moderate')}
                        >
                            Moderate
                            <span className="toggle-value">75%</span>
                        </button>
                        <button
                            className={`toggle-btn ${efficiencyMode === 'aggressive' ? 'active aggressive' : ''}`}
                            onClick={() => setEfficiencyMode('aggressive')}
                        >
                            Aggressive
                            <span className="toggle-value">100%</span>
                        </button>
                    </div>
                    <p className="efficiency-note">
                        Accounts for coffee breaks, context switching, and human efficiency factors
                    </p>
                </div>

                <div className="divider"></div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Current Error Rate (Eliminated by Tool)</span>
                        <span className="slider-value error">{errorRate}%</span>
                    </div>
                    <p className="slider-sublabel" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Reduced rework & "firefighting"
                    </p>
                    <input
                        type="range"
                        min="1"
                        max="25"
                        value={errorRate}
                        onChange={(e) => setErrorRate(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((errorRate - 1) / 24) * 100}%, #1a1a25 ${((errorRate - 1) / 24) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="team-summary">
                    <div className="summary-item">
                        <span>Total Team Size</span>
                        <span className="summary-value">{totalEmployees}</span>
                    </div>
                    <div className="summary-item">
                        <span>Specialist Ratio</span>
                        <span className="summary-value">
                            {totalEmployees > 0 ? Math.round((specialistCount / totalEmployees) * 100) : 0}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
