'use client';

import React from 'react';

interface InputSlidersProps {
    employees: number;
    setEmployees: (value: number) => void;
    hourlyWage: number;
    setHourlyWage: (value: number) => void;
    hoursPerWeek: number;
    setHoursPerWeek: (value: number) => void;
    errorRate: number;
    setErrorRate: (value: number) => void;
}

export default function InputSliders({
    employees,
    setEmployees,
    hourlyWage,
    setHourlyWage,
    hoursPerWeek,
    setHoursPerWeek,
    errorRate,
    setErrorRate,
}: InputSlidersProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="card">
            <h3 className="section-title">Your Current Situation</h3>

            <div className="slider-container">
                <div className="slider-label">
                    <span>Number of Employees</span>
                    <span className="slider-value">{employees.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="500"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(employees / 500) * 100}%, #1a1a25 ${(employees / 500) * 100}%, #1a1a25 100%)`
                    }}
                />
            </div>

            <div className="slider-container">
                <div className="slider-label">
                    <span>Average Hourly Wage</span>
                    <span className="slider-value">{formatCurrency(hourlyWage)}/hr</span>
                </div>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(parseInt(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((hourlyWage - 10) / 90) * 100}%, #1a1a25 ${((hourlyWage - 10) / 90) * 100}%, #1a1a25 100%)`
                    }}
                />
            </div>

            <div className="slider-container">
                <div className="slider-label">
                    <span>Hours on Manual Entry (Weekly)</span>
                    <span className="slider-value">{hoursPerWeek} hrs</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="40"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((hoursPerWeek - 1) / 39) * 100}%, #1a1a25 ${((hoursPerWeek - 1) / 39) * 100}%, #1a1a25 100%)`
                    }}
                />
            </div>

            <div className="slider-container">
                <div className="slider-label">
                    <span>Data Entry Error Rate</span>
                    <span className="slider-value">{errorRate}%</span>
                </div>
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
        </div>
    );
}
