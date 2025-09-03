// components/TimeTrackingDashboard.tsx
import React, { useState } from 'react';
import { ActivityCard } from './ActivityCard';
import { LoadingScreen, ErrorScreen, EmptyState } from './UI';
import type { Period } from '../types';
import { useTimeTrackingData } from '../hooks/useTrackingData';
import { ProfileCard } from './ProfileCard';

export const TimeTrackingDashboard: React.FC = () => {
  const { data, loading, error } = useTimeTrackingData();
  const [currentPeriod, setCurrentPeriod] = useState<Period>('daily');

  const handlePeriodChange = (period: Period) => {
    setCurrentPeriod(period);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={handleRetry} />;
  }

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 grid-rows-2 gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        <ProfileCard
          currentPeriod={currentPeriod}
          onPeriodChange={handlePeriodChange}
        />
        {data.map((activityData, index) => (
          <ActivityCard 
            key={`${activityData.title}-${index}`} 
            activityData={activityData}
            currentPeriod={currentPeriod}
          />
        ))}
      </div>
    </div>
  );
};