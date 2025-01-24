import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`${color} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>
        <div className="rounded-full bg-white/20 p-4">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default MetricCard;