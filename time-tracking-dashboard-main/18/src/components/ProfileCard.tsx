import { PERIOD_BUTTONS } from "../constans";
import type { Period } from "../types";


interface ProfileCardProps {
  currentPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  currentPeriod,
  onPeriodChange
}) => {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden row-span-2">
      <div className="bg-blue-600 p-8 rounded-2xl">
        <div className="w-20 h-20 rounded-full border-4 border-white mb-8 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl font-light">
          JR
        </div>
        <p className="text-blue-200 text-sm font-light mb-2">Reporte para</p>
        <h1 className="text-4xl font-light leading-tight">Jeremy Robson</h1>
      </div>
      <div className="p-8">
        {PERIOD_BUTTONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onPeriodChange(key)}
            className={`block w-full text-left py-2 text-lg transition-colors duration-300 ${
              currentPeriod === key 
                ? 'text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};