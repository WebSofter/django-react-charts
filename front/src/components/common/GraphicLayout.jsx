import React, {useState} from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const GraphicLayout = ({menu = false, defaultFilter = 1.0, onChangeFilter = ()=>{}, onDownload = ()=>{}, inDownload = false, children }) => {
  const filters = [
    { label: `Direct`, value: 1.0 },
    { label: `Ratio 0.1`, value: 0.1 }
  ]
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const onChange = e => {
    setSelectedFilter(e.value)
    onChangeFilter(e.value)
  }
  const end = (
    <div className="flex align-items-center gap-2">
      <Button disabled={inDownload} label="Export Data" icon="pi pi-download" onClick={e => onDownload(e, selectedFilter)} className="p-button font-bold"/>
    </div>
  );
const start = (
  <div className="flex align-items-center gap-2">
      <Dropdown value={selectedFilter} onChange={onChange} options={filters} virtualScrollerOptions={{ itemSize: 38 }}
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