import React, {useState} from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const GraphicLayout = ({menu = false, children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const items = Array.from({ length: 3 }).map((_, i) => ({ label: `Filter #${i}`, value: i }));

  const end = (
    <div className="flex align-items-center gap-2">
      <Button label="Export Data" icon="pi pi-download" className="p-button font-bold"/>
    </div>
);
const start = (
  <div className="flex align-items-center gap-2">
      <Dropdown value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={items} virtualScrollerOptions={{ itemSize: 38 }}
        placeholder="Select mode" className="w-8rem sm:w-auto" />
  </div>
);

  return (
    <ScrollPanel style={{ width: '750px', minHeight: '550px' }}>
      {menu && <Menubar model={[]} start={start} end={end} className='mb-5'/>}
      {children}
    </ScrollPanel>
  );
};

export default GraphicLayout;