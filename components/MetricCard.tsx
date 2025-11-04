
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, className = '' }) => {
  return (
    <div className="bg-gray-700/50 p-4 rounded-lg text-center">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold text-white ${className}`}>{value}</p>
    </div>
  );
};

export default MetricCard;
