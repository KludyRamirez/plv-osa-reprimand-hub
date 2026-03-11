import React from 'react';

const StatCard = ({ title, value, color = '#006bff', bgColor = 'white', borderColor = 'blue-200', icon, onClick, subtitle }) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 min-w-[180px] flex-1 rounded-xl border border-${borderColor} bg-${bgColor === 'white' ? 'white' : bgColor} relative overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      style={bgColor !== 'white' && !bgColor.startsWith('bg-') ? { backgroundColor: bgColor } : undefined}
    >
      <div className="flex flex-col gap-1 relative z-10">
        {icon && <div className="text-[20px] mb-1" style={{ color }}>{icon}</div>}
        <div className="text-[13px] text-gray-500 font-medium">{title}</div>
        <div className="text-[32px] font-bold leading-tight" style={{ color }}>
          {value}
        </div>
        {subtitle && (
          <div className="text-[12px] text-gray-400 mt-1">{subtitle}</div>
        )}
      </div>
      <svg
        className="absolute top-0 right-0 w-[120px] h-[120px] opacity-[0.07]"
        viewBox="0 0 120 120"
      >
        <circle cx="90" cy="30" r="60" fill={color} />
      </svg>
    </div>
  );
};

export default StatCard;
