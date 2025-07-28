import React from 'react';
import { Card, CardContent } from './ui/Card';

const MandapRegistrationForm: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Mandap Registration Form
          </h2>
          <p className="text-gray-600">
            This component is currently under development. Please use the Mandap Management section in the sidebar to add new mandaps.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MandapRegistrationForm;