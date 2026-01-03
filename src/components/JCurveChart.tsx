'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Area,
    ComposedChart,
} from 'recharts';

interface JCurveChartProps {
    jCurveDip: number;
    monthsToRecovery: number;
    annualBenefit: number;
}

export default function JCurveChart({
    jCurveDip,
    monthsToRecovery,
    annualBenefit,
}: JCurveChartProps) {
    // Generate J-Curve data points
    const generateJCurveData = () => {
        const data = [];
        const monthlyBenefit = annualBenefit / 12;
        const dipMultiplier = jCurveDip / 100;

        for (let month = 0; month <= 12; month++) {
            let value = 0;

            if (month === 0) {
                value = 0; // Starting point
            } else if (month <= 3) {
                // Dip phase: negative productivity
                const dipProgress = month / 3;
                value = -monthlyBenefit * dipMultiplier * (1 - dipProgress * 0.5);
            } else if (month <= monthsToRecovery) {
                // Recovery phase: climbing back
                const recoveryProgress = (month - 3) / (monthsToRecovery - 3);
                value = -monthlyBenefit * dipMultiplier * 0.5 * (1 - recoveryProgress) +
                    monthlyBenefit * recoveryProgress * 0.5;
            } else {
                // Full value phase
                value = monthlyBenefit;
            }

            data.push({
                month: `M${month}`,
                value: Math.round(value),
                baseline: 0,
            });
        }

        return data;
    };

    const data = generateJCurveData();

    const formatCurrency = (value: number) => {
        if (value >= 1000 || value <= -1000) {
            return `$${(value / 1000).toFixed(0)}K`;
        }
        return `$${value}`;
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            return (
                <div className="jcurve-tooltip">
                    <p className="jcurve-tooltip-label">{label}</p>
                    <p className={`jcurve-tooltip-value ${value >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(value)}
                    </p>
                    <p className="jcurve-tooltip-note">
                        {value < 0 ? 'Implementation Disruption' : 'Value Realized'}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card jcurve-card">
            <div className="jcurve-header">
                <span className="jcurve-icon">📈</span>
                <h4>Implementation J-Curve</h4>
                <span className="jcurve-badge">Value Over Time</span>
            </div>

            <div className="jcurve-legend">
                <div className="jcurve-legend-item dip">
                    <span className="legend-dot"></span>
                    <span>Disruption Phase (M1-M3)</span>
                </div>
                <div className="jcurve-legend-item recovery">
                    <span className="legend-dot"></span>
                    <span>Recovery Phase (M4-M{monthsToRecovery})</span>
                </div>
                <div className="jcurve-legend-item value">
                    <span className="legend-dot"></span>
                    <span>Value Realization (M{monthsToRecovery}+)</span>
                </div>
            </div>

            <div className="jcurve-chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="jcurveGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="50%" stopColor="#10b981" stopOpacity={0} />
                                <stop offset="50%" stopColor="#ef4444" stopOpacity={0} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={0} stroke="#475569" strokeWidth={2} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            fill="url(#jcurveGradient)"
                            stroke="none"
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                            activeDot={{ fill: '#8b5cf6', strokeWidth: 0, r: 6 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="jcurve-summary">
                <div className="jcurve-stat negative">
                    <span className="jcurve-stat-label">Initial Disruption</span>
                    <span className="jcurve-stat-value">-{jCurveDip}%</span>
                </div>
                <div className="jcurve-stat neutral">
                    <span className="jcurve-stat-label">Break-Even</span>
                    <span className="jcurve-stat-value">Month {monthsToRecovery}</span>
                </div>
                <div className="jcurve-stat positive">
                    <span className="jcurve-stat-label">Steady State</span>
                    <span className="jcurve-stat-value">{formatCurrency(annualBenefit / 12)}/mo</span>
                </div>
            </div>
        </div>
    );
}
