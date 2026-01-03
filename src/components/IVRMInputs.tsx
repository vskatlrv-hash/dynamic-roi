'use client';

import React from 'react';

interface IVRMInputsProps {
    // Constraint Identification
    isBottleneck: boolean;
    setIsBottleneck: (value: boolean) => void;

    // COPQ (Cost of Poor Quality)
    scrapRate: number;
    setScrapRate: (value: number) => void;
    reworkRate: number;
    setReworkRate: (value: number) => void;
    warrantyRate: number;
    setWarrantyRate: (value: number) => void;

    // TCO (Total Cost of Ownership)
    integrationCost: number;
    setIntegrationCost: (value: number) => void;
    hardwareCapex: number;
    setHardwareCapex: (value: number) => void;

    // Risk & Implementation
    jCurveDip: number;
    setJCurveDip: (value: number) => void;
    contingencyPercent: number;
    setContingencyPercent: (value: number) => void;
}

export default function IVRMInputs({
    isBottleneck,
    setIsBottleneck,
    scrapRate,
    setScrapRate,
    reworkRate,
    setReworkRate,
    warrantyRate,
    setWarrantyRate,
    integrationCost,
    setIntegrationCost,
    hardwareCapex,
    setHardwareCapex,
    jCurveDip,
    setJCurveDip,
    contingencyPercent,
    setContingencyPercent,
}: IVRMInputsProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="ivrm-inputs">
            {/* Theory of Constraints */}
            <div className="card constraint-card">
                <div className="constraint-header">
                    <span className="constraint-icon">🎯</span>
                    <h4>Theory of Constraints</h4>
                </div>
                <p className="constraint-description">
                    Per Goldratt: "An hour saved at a non-bottleneck is a mirage."
                </p>

                <div className="constraint-toggle">
                    <button
                        className={`constraint-btn ${isBottleneck ? 'active bottleneck' : ''}`}
                        onClick={() => setIsBottleneck(true)}
                    >
                        <span className="constraint-btn-icon">✓</span>
                        <span className="constraint-btn-label">Bottleneck</span>
                        <span className="constraint-btn-sublabel">Improvement creates throughput</span>
                    </button>
                    <button
                        className={`constraint-btn ${!isBottleneck ? 'active non-bottleneck' : ''}`}
                        onClick={() => setIsBottleneck(false)}
                    >
                        <span className="constraint-btn-icon">✗</span>
                        <span className="constraint-btn-label">Non-Bottleneck</span>
                        <span className="constraint-btn-sublabel">~90% of value is wasted</span>
                    </button>
                </div>

                {!isBottleneck && (
                    <div className="constraint-warning">
                        <strong>⚠️ Warning:</strong> TOC dictates that improving a non-constraint resource
                        yields near-zero throughput gains. Only 10% of calculated value will be applied.
                    </div>
                )}
            </div>

            {/* Cost of Poor Quality (COPQ) */}
            <div className="card copq-card">
                <div className="copq-header">
                    <span className="copq-icon">🧊</span>
                    <h4>Cost of Poor Quality (COPQ)</h4>
                    <span className="copq-badge">The Hidden Factory</span>
                </div>

                <div className="copq-grid">
                    <div className="copq-section internal">
                        <span className="copq-section-label">Internal Failure ($1-$10)</span>

                        <div className="slider-container">
                            <div className="slider-label">
                                <span>Scrap Rate</span>
                                <span className="slider-value error">{scrapRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="15"
                                step="0.5"
                                value={scrapRate}
                                onChange={(e) => setScrapRate(parseFloat(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(scrapRate / 15) * 100}%, #1a1a25 ${(scrapRate / 15) * 100}%, #1a1a25 100%)`
                                }}
                            />
                        </div>

                        <div className="slider-container">
                            <div className="slider-label">
                                <span>Rework Rate</span>
                                <span className="slider-value warning">{reworkRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="0.5"
                                value={reworkRate}
                                onChange={(e) => setReworkRate(parseFloat(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(reworkRate / 20) * 100}%, #1a1a25 ${(reworkRate / 20) * 100}%, #1a1a25 100%)`
                                }}
                            />
                        </div>
                    </div>

                    <div className="copq-section external">
                        <span className="copq-section-label">External Failure ($100)</span>

                        <div className="slider-container">
                            <div className="slider-label">
                                <span>Warranty/Recall Rate</span>
                                <span className="slider-value error">{warrantyRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="0.1"
                                value={warrantyRate}
                                onChange={(e) => setWarrantyRate(parseFloat(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(warrantyRate / 5) * 100}%, #1a1a25 ${(warrantyRate / 5) * 100}%, #1a1a25 100%)`
                                }}
                            />
                        </div>
                        <p className="copq-note">
                            1-10-100 Rule: External failures cost 100× prevention
                        </p>
                    </div>
                </div>
            </div>

            {/* Total Cost of Ownership */}
            <div className="card tco-card">
                <div className="tco-header">
                    <span className="tco-icon">💰</span>
                    <h4>Total Cost of Ownership (TCO)</h4>
                    <span className="tco-badge">The Brownfield Tax</span>
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Integration & Engineering Cost</span>
                        <span className="slider-value">{formatCurrency(integrationCost)}</span>
                    </div>
                    <p className="slider-sublabel">Legacy PLC integration, middleware, custom coding</p>
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        step="5000"
                        value={integrationCost}
                        onChange={(e) => setIntegrationCost(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(integrationCost / 100000) * 100}%, #1a1a25 ${(integrationCost / 100000) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Hardware CapEx</span>
                        <span className="slider-value">{formatCurrency(hardwareCapex)}</span>
                    </div>
                    <p className="slider-sublabel">Sensors, gateways, HMIs, servers</p>
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        step="10000"
                        value={hardwareCapex}
                        onChange={(e) => setHardwareCapex(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(hardwareCapex / 200000) * 100}%, #1a1a25 ${(hardwareCapex / 200000) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Implementation Risk */}
            <div className="card risk-card">
                <div className="risk-header">
                    <span className="risk-icon">📉</span>
                    <h4>Implementation Risk</h4>
                    <span className="risk-badge">The J-Curve</span>
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Productivity Dip (Months 1-3)</span>
                        <span className="slider-value warning">-{jCurveDip}%</span>
                    </div>
                    <p className="slider-sublabel">Training, debugging, workflow disruption</p>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={jCurveDip}
                        onChange={(e) => setJCurveDip(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(jCurveDip / 30) * 100}%, #1a1a25 ${(jCurveDip / 30) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>

                <div className="slider-container">
                    <div className="slider-label">
                        <span>Contingency Reserve</span>
                        <span className="slider-value">{contingencyPercent}%</span>
                    </div>
                    <p className="slider-sublabel">Buffer for scope creep, integration issues</p>
                    <input
                        type="range"
                        min="0"
                        max="40"
                        value={contingencyPercent}
                        onChange={(e) => setContingencyPercent(parseInt(e.target.value))}
                        style={{
                            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(contingencyPercent / 40) * 100}%, #1a1a25 ${(contingencyPercent / 40) * 100}%, #1a1a25 100%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
