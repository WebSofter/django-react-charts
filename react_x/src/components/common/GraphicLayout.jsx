import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';

const GraphicLayout = ({ children }) => {
  return (
    <ScrollPanel style={{ width: 'auto', minHeight: '550px' }}>
        {children}
    </ScrollPanel>
  );
};

export default GraphicLayout;