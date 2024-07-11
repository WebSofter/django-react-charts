import React from 'react';
import { Card } from 'primereact/card';

const PageLayout = ({ children, title }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card title={title}>
        {children}
      </Card>
    </div>
  );
};

export default PageLayout;