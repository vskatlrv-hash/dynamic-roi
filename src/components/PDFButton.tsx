'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';

interface PDFButtonProps {
    roi: number;
    savings: number;
    generalStaffBenefit: number;
    specialistBenefit: number;
    errorReductionSavings: number;
    cloudscaleCost: number;
    paybackMonths: number;
    totalEmployees: number;
    efficiencyMode: string;
}

export default function PDFButton({
    roi,
    savings,
    generalStaffBenefit,
    specialistBenefit,
    errorReductionSavings,
    cloudscaleCost,
    paybackMonths,
    totalEmployees,
    efficiencyMode,
}: PDFButtonProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatPayback = (months: number) => {
        if (months <= 0 || !isFinite(months)) return "Immediate";
        if (months < 1) return `${Math.round(months * 30)} days`;
        if (months > 24) return "24+ months";
        return `${months.toFixed(1)} months`;
    };

    const handleGeneratePDF = () => {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            let y = 20;

            // Title
            doc.setFontSize(24);
            doc.setTextColor(99, 102, 241); // Accent color
            doc.text('CloudScale Automate', pageWidth / 2, y, { align: 'center' });
            y += 10;

            doc.setFontSize(16);
            doc.setTextColor(100);
            doc.text('Business Case Summary', pageWidth / 2, y, { align: 'center' });
            y += 15;

            // Date
            doc.setFontSize(10);
            doc.setTextColor(150);
            const date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            doc.text(`Generated: ${date}`, pageWidth / 2, y, { align: 'center' });
            y += 20;

            // Divider
            doc.setDrawColor(200);
            doc.line(20, y, pageWidth - 20, y);
            y += 15;

            // Executive Summary Box
            doc.setFillColor(245, 247, 250);
            doc.roundedRect(20, y, pageWidth - 40, 40, 3, 3, 'F');
            y += 10;

            doc.setFontSize(12);
            doc.setTextColor(50);
            doc.text('EXECUTIVE SUMMARY', 25, y);
            y += 8;

            doc.setFontSize(22);
            doc.setTextColor(16, 185, 129); // Green
            doc.text(`${roi.toFixed(0)}% ROI`, 25, y);
            doc.setFontSize(22);
            doc.text(formatCurrency(savings), pageWidth / 2, y);
            y += 8;

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text('Return on Investment', 25, y);
            doc.text('Annual Net Savings', pageWidth / 2, y);
            y += 25;

            // Investment Details
            doc.setFontSize(14);
            doc.setTextColor(50);
            doc.text('Investment Analysis', 20, y);
            y += 10;

            doc.setFontSize(11);
            doc.setTextColor(80);

            // Table headers
            doc.setFillColor(240, 240, 245);
            doc.rect(20, y - 5, pageWidth - 40, 10, 'F');
            doc.text('Category', 25, y);
            doc.text('Value', pageWidth - 60, y);
            y += 12;

            // Data rows
            const rows = [
                ['CloudScale Investment', formatCurrency(cloudscaleCost)],
                ['General Staff Savings (Tier 1)', formatCurrency(generalStaffBenefit)],
                ['Specialist Savings (Tier 2)', formatCurrency(specialistBenefit)],
                ['Error Elimination Savings', formatCurrency(errorReductionSavings)],
                ['Total Annual Benefit', formatCurrency(generalStaffBenefit + specialistBenefit + errorReductionSavings)],
            ];

            rows.forEach(([label, value], index) => {
                if (index === rows.length - 1) {
                    doc.setFillColor(230, 255, 240);
                    doc.rect(20, y - 5, pageWidth - 40, 10, 'F');
                    doc.setTextColor(16, 120, 80);
                }
                doc.text(label, 25, y);
                doc.text(value, pageWidth - 60, y);
                y += 10;
            });

            y += 10;

            // Key Metrics
            doc.setFontSize(14);
            doc.setTextColor(50);
            doc.text('Key Metrics', 20, y);
            y += 10;

            doc.setFontSize(11);
            doc.setTextColor(80);
            doc.text(`• Payback Period: ${formatPayback(paybackMonths)}`, 25, y);
            y += 8;
            doc.text(`• Total Employees Covered: ${totalEmployees}`, 25, y);
            y += 8;
            doc.text(`• Efficiency Model: ${efficiencyMode.charAt(0).toUpperCase() + efficiencyMode.slice(1)}`, 25, y);
            y += 20;

            // Methodology Note
            doc.setFontSize(10);
            doc.setTextColor(120);
            doc.text('Methodology: Tiered Weighted Model based on O\'Boyle & Aguinis (2012)', 20, y);
            y += 6;
            doc.text('Formula: Total Benefit = Σ(Ni × Ci × ΔTi × Ui × E)', 20, y);
            y += 15;

            // Disclaimer
            doc.setFontSize(8);
            doc.setTextColor(150);
            const disclaimer = 'Disclaimer: These results are estimates based on the inputs provided. Actual results may vary based on implementation and adoption rates.';
            const lines = doc.splitTextToSize(disclaimer, pageWidth - 40);
            doc.text(lines, 20, y);

            // Save the PDF
            doc.save(`CloudScale_BusinessCase_${new Date().toISOString().split('T')[0]}.pdf`);

            toast.success(
                <div>
                    <strong>PDF Downloaded!</strong>
                    <p style={{ fontSize: '14px', marginTop: '4px', opacity: 0.8 }}>
                        CloudScale_BusinessCase_{new Date().toISOString().split('T')[0]}.pdf
                    </p>
                </div>,
                {
                    duration: 5000,
                    icon: '✅',
                }
            );
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error('Failed to generate PDF. Please try again.');
        }
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
