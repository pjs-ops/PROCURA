import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { SupplierMetric } from '../../types';

interface SupplierRadarChartProps {
  metrics: SupplierMetric;
  supplierName: string;
  benchmarkMetrics?: SupplierMetric;
}

export const SupplierRadarChart: React.FC<SupplierRadarChartProps> = ({
  metrics,
  supplierName,
  benchmarkMetrics = {
    delivery: 88,
    quality: 90,
    cost: 85,
    reliability: 89,
    compliance: 92,
    overall: 88,
  },
}) => {
  const data = [
    { subject: 'Delivery OTIF', value: metrics.delivery, benchmark: benchmarkMetrics.delivery, fullMark: 100 },
    { subject: 'Quality PPM', value: metrics.quality, benchmark: benchmarkMetrics.quality, fullMark: 100 },
    { subject: 'Cost & Margin', value: metrics.cost, benchmark: benchmarkMetrics.cost, fullMark: 100 },
    { subject: 'Reliability', value: metrics.reliability, benchmark: benchmarkMetrics.reliability, fullMark: 100 },
    { subject: 'Compliance & ESG', value: metrics.compliance, benchmark: benchmarkMetrics.compliance, fullMark: 100 },
  ];

  return (
    <div className="w-full h-72 flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#3D3342" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#A99EAA', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            stroke="#3D3342"
            tick={{ fill: '#7C727D', fontSize: 9, fontFamily: 'JetBrains Mono' }}
          />
          {/* Benchmark polygon */}
          <Radar
            name="Category Benchmark"
            dataKey="benchmark"
            stroke="#B8A06A"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="#B8A06A"
            fillOpacity={0.12}
          />
          {/* Active Supplier polygon */}
          <Radar
            name={supplierName}
            dataKey="value"
            stroke="#D4774C"
            strokeWidth={2}
            fill="#D4774C"
            fillOpacity={0.4}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#211B24',
              borderColor: '#3D3342',
              borderRadius: '6px',
              fontFamily: 'JetBrains Mono',
              fontSize: '11px',
              color: '#F3EBDD',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend footer */}
      <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-[#A99EAA] pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#D4774C]" />
          <span>{supplierName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-[#B8A06A]" />
          <span>Category Benchmark</span>
        </div>
      </div>
    </div>
  );
};
