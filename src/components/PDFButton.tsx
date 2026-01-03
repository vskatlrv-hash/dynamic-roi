'use client';

import React from 'react';
import toast from 'react-hot-toast';

interface PDFButtonProps {
    roi: number;
    savings: number;
}

export default function PDFButton({ roi, savings }: PDFButtonProps) {
    const handleGeneratePDF = () => {
        // Simulate PDF generation with a toast notification
        toast.success(
            <div>
                <strong>Business Case PDF Generated!</strong>
                <p style={{ fontSize: '14px', marginTop: '4px', opacity: 0.8 }}>
                    ROI of {roi.toFixed(0)}% with ${savings.toLocaleString()} annual savings
                </p>
            </div>,
            {
                duration: 5000,
                icon: '📄',
            }
        );
    };

    return (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>📊</span>
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Ready to Present?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
                Generate a professional business case document to share with your stakeholders.
            </p>
            <button className="btn btn-success" onClick={handleGeneratePDF}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Generate Business Case PDF
            </button>
        </div>
    );
}
