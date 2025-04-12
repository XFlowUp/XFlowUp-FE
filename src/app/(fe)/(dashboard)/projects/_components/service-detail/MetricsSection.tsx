import React from 'react';

export interface MetricsSectionProps {
  // Add any properties you might need in the future
}

export const MetricsSection = ({}: MetricsSectionProps) => (
  <div className="space-y-4">
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900">
      <h3 className="font-medium mb-2">Service Metrics</h3>
      <p className="text-sm text-gray-500">Monitor your service's performance metrics.</p>
      <div className="h-40 mt-4 flex items-center justify-center border border-dashed rounded-md">
        <p className="text-gray-500">Service metrics visualization</p>
      </div>
    </div>
  </div>
);

export default MetricsSection;
