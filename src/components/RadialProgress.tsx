import React from 'react';

interface RadialProgressProps {
  value: number;
  color: string;
  size?: number;
}

const RadialProgress: React.FC<RadialProgressProps> = ({ value, color, size = 190 }) => {
  const radius = size / 2 - 10;
  const circumference = radius * 2 * Math.PI;
  const progress = ((100 - value) / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
      </div>
    </div>
  );
}

export default RadialProgress;