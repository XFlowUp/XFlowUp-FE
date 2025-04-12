import React from 'react';
import { Button } from '@/components/ui/button';

export interface SettingsSectionProps {
  serviceName: string;
}

export const SettingsSection = ({ serviceName }: SettingsSectionProps) => (
  <div className="space-y-4">
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900">
      <h3 className="font-medium mb-2">Service Settings</h3>
      <p className="text-sm text-gray-500 mb-4">Configure your service settings.</p>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Service Name</h4>
          <p className="text-sm">{serviceName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Scaling</h4>
          <p className="text-sm">Auto-scale: Enabled</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Region</h4>
          <p className="text-sm">US East (Ohio)</p>
        </div>
      </div>
    </div>
    <Button className="w-full" variant="outline">
      Edit Settings
    </Button>
    <Button className="w-full" variant="destructive">
      Delete Service
    </Button>
  </div>
);

export default SettingsSection;
