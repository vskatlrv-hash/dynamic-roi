'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Line,
    ComposedChart,
} from 'recharts';

interface CapExOpExComparisonProps {
    subscriptionCost: number;
    integrationCost: number;
    hardwareCapex: number;
}

export default function CapExOpExComparison({
    subscriptionCost,
    integrationCost,
    hardwareCapex,
}: CapExOpExComparisonProps) {
    // Generate 10-year TCO comparison
    const generateTCOData = () => {
        const data = [];

        // CapEx Model: High upfront, lower ongoing (maintenance ~15% of initial)
        const capexUpfront = (subscriptionCost * 5) + hardwareCapex; // 5 year license buy-out + hardware
        const capexMaintenance = capexUpfront * 0.15;

        // OpEx Model: Integration + ongoing subscription
        const opexUpfront = integrationCost;
        const opexAnnual = subscriptionCost * 1.05; // 5% annual increase

        let capexCumulative = capexUpfront;
        let opexCumulative = opexUpfront;

        for (let year = 0; year <= 10; year++) {
            if (year === 0) {
                data.push({
                    year: `Y0`,
                    capex: capexUpfront,
                    opex: opexUpfront,
                    capexCumulative,
                    opexCumulative,
                });
            } else {
                capexCumulative += capexMaintenance;
                opexCumulative += opexAnnual * Math.pow(1.05, year - 1);

                data.push({
                    year: `Y${year}`,
                    capex: capexMaintenance,
                    opex: opexAnnual * Math.pow(1.05, year - 1),
                    capexCumulative: Math.round(capexCumulative),
                    opexCumulative: Math.round(opexCumulative),
                });
            }
        }

        return data;
    };

    const data = generateTCOData();

    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`;
        }
        return `$${value}`;
    };

    const crossoverYear = data.findIndex((d, i) => i > 0 && d.opexCumulative > d.capexCumulative);
    const year10CapEx = data[10]?.capexCumulative || 0;
    const year10OpEx = data[10]?.opexCumulative || 0;
    const opexPremium = ((year10OpEx - year10CapEx) / year10CapEx) * 100;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="tco-tooltip">
                    <p className="tco-tooltip-label">{label}</p>
                    <p className="tco-tooltip-capex">
                        CapEx: {formatCurrency(payload[0]?.value || 0)}
                    </p>
                    <p className="tco-tooltip-opex">
                        OpEx: {formatCurrency(payload[1]?.value || 0)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card capex-opex-card">
            <div className="capex-opex-header">
                <span className="capex-opex-icon">💰</span>
                <h4>CapEx vs OpEx: 10-Year TCO</h4>
                <span className="capex-opex-badge">The Double-Edged Sword</span>
            </div>

            <p className="capex-opex-description">
                OpEx "frees capital" but over 10 years, you may end up <strong>renting your nervous system forever</strong>.
            </p>

            <div className="capex-opex-chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="year"
                            stroke="#64748b"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ color: '#94a3b8' }}
                            formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
                        />
                        <Line
                            type="monotone"
                            dataKey="capexCumulative"
                            name="CapEx (Cumulative)"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: '#10b981', r: 3 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="opexCumulative"
                            name="OpEx (Cumulative)"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ fill: '#f59e0b', r: 3 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="capex-opex-summary">
                <div className="tco-stat">
                    <span className="tco-stat-label">Crossover Point</span>
                    <span className="tco-stat-value">
                        {crossoverYear > 0 ? `Year ${crossoverYear}` : 'N/A'}
                    </span>
                    <span className="tco-stat-note">OpEx exceeds CapEx</span>
                </div>
                <div className="tco-stat">
                    <span className="tco-stat-label">10-Year CapEx TCO</span>
                    <span className="tco-stat-value capex">{formatCurrency(year10CapEx)}</span>
                </div>
                <div className="tco-stat">
                    <span className="tco-stat-label">10-Year OpEx TCO</span>
                    <span className="tco-stat-value opex">{formatCurrency(year10OpEx)}</span>
                </div>
                <div className="tco-stat">
                    <span className="tco-stat-label">OpEx Premium</span>
                    <span className={`tco-stat-value ${opexPremium > 0 ? 'warning' : 'good'}`}>
                        {opexPremium > 0 ? '+' : ''}{opexPremium.toFixed(0)}%
                    </span>
                </div>
            </div>

            <div className="capex-opex-note">
                <strong>Note:</strong> CapEx shields EBITDA via depreciation. OpEx hits EBITDA directly.
                For asset-heavy industries, this distinction matters.
            </div>
        </div>
    );
}
