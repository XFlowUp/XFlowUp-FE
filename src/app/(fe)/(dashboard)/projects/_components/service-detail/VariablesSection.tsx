import React from 'react';
import { Button } from '@/components/ui/button';

export interface EnvironmentVariable {
  key: string;
  value: string;
}

export interface VariablesSectionProps {
  variables?: EnvironmentVariable[];
}

export const VariablesSection = ({
  variables = [
    { key: 'PORT', value: '3000' },
    { key: 'NODE_ENV', value: 'production' },
  ],
}: VariablesSectionProps) => (
  <div className="space-y-4">
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900">
      <h3 className="font-medium mb-2">Environment Variables</h3>
      <p className="text-sm text-gray-500 mb-4">
        Securely manage your service's environment variables.
      </p>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="font-medium text-gray-500">KEY</div>
        <div className="col-span-2 font-medium text-gray-500">VALUE</div>
        {variables.map((variable, index) => (
          <React.Fragment key={index}>
            <div>{variable.key}</div>
            <div className="col-span-2">{variable.value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
    <Button className="w-full">Add Variable</Button>
  </div>
);

export default VariablesSection;
