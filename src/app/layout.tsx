import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "ROI Calculator | CloudScale Automate",
  description: "Calculate your 3-year ROI with CloudScale Automate workflow automation software. See how much you can save by eliminating manual data entry errors.",
  keywords: ["ROI Calculator", "CloudScale", "Workflow Automation", "Cost Savings", "Data Entry"],
  authors: [{ name: "CloudScale Automate" }],
  openGraph: {
    title: "Dynamic ROI Calculator | CloudScale Automate",
    description: "Calculate your potential savings with CloudScale workflow automation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(26, 26, 37, 0.95)',
              color: '#f8fafc',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#0a0a0f',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
