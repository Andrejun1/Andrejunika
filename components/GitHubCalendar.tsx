// components/GitHubCalendar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';


// Interface
interface GitHubCalendarProps {
  username?: string;
  showLegend?: boolean;
  showTotal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  blockRadius?: number;
}

// Dynamic import untuk menghindari SSR error
const Calendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

// Loading skeleton
const CalendarSkeleton: React.FC = () => (
  <div className="w-full flex justify-center px-4">
    <div className="animate-pulse">
      <div className="mb-3 h-4 bg-gray-300/20 dark:bg-gray-700/30 rounded w-48"></div>
      <div className="grid grid-cols-52 gap-1">
        {Array.from({ length: 364 }, (_, i) => (
          <div key={i} className="w-3 h-3 bg-gray-300/10 rounded-sm" />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2 items-center">
        <span className="text-xs text-gray-600 dark:text-gray-400">Less</span>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="w-3 h-3 bg-gray-300/20 rounded-sm" />
        ))}
        <span className="text-xs text-gray-600 dark:text-gray-400">More</span>
      </div>
    </div>
  </div>
);

// Main Component
const GitHubCalendar: React.FC<GitHubCalendarProps> = ({
  username = 'Andrejun1',
  showLegend = false,
  showTotal = false,
  className = '',
  style = {},
  blockRadius = 3,
}) => {
  const { theme, systemTheme } = useTheme(); // Ambil theme dari next-themes
  const [mounted, setMounted] = useState(false);

  // Tentukan colorScheme berdasarkan tema
  const colorScheme = (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'))
    ? 'dark'
    : 'light';

  // Pastikan hanya render setelah mount (SSR-safe)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CalendarSkeleton />;
  }

  return (
    <div className={`w-full flex justify-center px-4 ${className}`}>
      <Calendar
        username={username}
        colorScheme={colorScheme} // Otomatis: 'dark' atau 'light'
        fontSize={14}
        blockSize={12}
        blockRadius={blockRadius}
        hideColorLegend={!showLegend}
        hideTotalCount={!showTotal}
        style={{
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          ...style,
        }}
      />
    </div>
  );
};

export default GitHubCalendar;