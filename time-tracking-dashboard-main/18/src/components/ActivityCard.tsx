// components/ActivityCard.tsx
import React from 'react';
import { getActivityConfig } from '../utils';
import { PERIOD_LABELS, TITLE_TRANSLATIONS, COLOR_CLASSES } from '../constans';
import type { Activity, Period } from '../types';

interface ActivityCardProps {
  activityData: Activity;
  currentPeriod: Period;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activityData,
  currentPeriod
}) => {
  const config = getActivityConfig(activityData.title);
  const timeframes = activityData.timeframes[currentPeriod];

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add menu functionality here
    console.log('Menu clicked for:', activityData.title);
  };

  return (
    <div className={`bg-gradient-to-br ${COLOR_CLASSES[config.color]} rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2`}>
      <div className="h-12 relative overflow-hidden">
        <div className="absolute right-4 -top-1 text-5xl opacity-30">
          {config.icon}
        </div>
      </div>
      <div className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-750 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">
            {TITLE_TRANSLATIONS[activityData.title] || activityData.title}
          </h2>
          <button 
            onClick={handleMenuClick}
            className="text-slate-300 hover:text-white text-xl transition-colors duration-300"
            aria-label={`Menú de ${activityData.title}`}
          >
            ⋯
          </button>
        </div>
        <div className="text-5xl font-light text-white mb-2">
          {timeframes.current}hrs
        </div>
        <div className="text-slate-300 text-sm font-light">
          {PERIOD_LABELS[currentPeriod]} - {timeframes.previous}hrs
        </div>
      </div>
    </div>
  );
};