import type { Metadata } from 'next';
import './globals.css';
import { AcademicProvider } from '@/lib/store/academicContext';

export const metadata: Metadata = {
  title: 'StudyPilot — Your Personal AI Academic Workspace',
  description: 'Everything happening in your classes, organized into one intelligent study workspace. Grounded in your real coursework, notes, and exams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <AcademicProvider>
          {children}
        </AcademicProvider>
      </body>
    </html>
  );
}
