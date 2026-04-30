interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  current: number;
  total: number;
}

export default function ProgressRing({
  percent,
  size = 100,
  strokeWidth = 8,
  color = '#f97316',
  label,
  current,
  total,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-gray-700">{percent}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-700 mt-0.5">
          {current} <span className="text-gray-400 font-normal">/ {total}</span>
        </p>
      </div>
    </div>
  );
}
