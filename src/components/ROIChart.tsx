'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';

interface ROIChartProps {
    currentSpendYear1: number;
    currentSpendYear2: number;
    currentSpendYear3: number;
    cloudscaleCost: number;
}

export default function ROIChart({
    currentSpendYear1,
    currentSpendYear2,
    currentSpendYear3,
    cloudscaleCost,
}: ROIChartProps) {
    const data = [
        {
            name: 'Year 1',
            'Current Spend': currentSpendYear1,
            'With CloudScale': cloudscaleCost,
        },
        {
            name: 'Year 2',
            'Current Spend': currentSpendYear2,
            'With CloudScale': cloudscaleCost,
        },
        {
            name: 'Year 3',
            'Current Spend': currentSpendYear3,
            'With CloudScale': cloudscaleCost,
        },
    ];

    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`;
        }
        return `$${value}`;
    };

    const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        background: 'rgba(26, 26, 37, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '16px',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <p style={{ fontWeight: 600, marginBottom: '8px', color: '#f8fafc' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
                            {entry.name}: {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                            }).format(entry.value)}
                        </p>
                    ))}
                    {payload.length === 2 && (
                        <p style={{ color: '#10b981', marginTop: '8px', fontWeight: 600, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                            Savings: {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                            }).format(payload[0].value - payload[1].value)}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card">
            <h3 className="section-title">3-Year Cost Comparison</h3>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={8}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#94a3b8', fontSize: 14 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <YAxis
                            tickFormatter={formatCurrency}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
                        />
                        <Bar dataKey="Current Spend" radius={[8, 8, 0, 0]} maxBarSize={60}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-current-${index}`}
                                    fill="url(#currentGradient)"
                                />
                            ))}
                        </Bar>
                        <Bar dataKey="With CloudScale" radius={[8, 8, 0, 0]} maxBarSize={60}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-cloudscale-${index}`}
                                    fill="url(#cloudscaleGradient)"
                                />
                            ))}
                        </Bar>
                        <defs>
                            <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                            </linearGradient>
                            <linearGradient id="cloudscaleGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
