import React, {useState, useRef, useCallback} from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import moment from 'moment';
import conf from '../../utils/conf'
const GraphicLayout = ({size = {}, menu = false, defaultFilter = 1.0, onChangeFilter = ()=>{}, onDownload = ()=>{}, inDownload = false, children }) => {
  const filters = [
    { label: `Direct`, value: 1.0 },
    { label: `Ratio 0.1`, value: conf.filterCoefficient }
  ]
  const Status = {
    Stop: 'Stop',
    Play: 'Play',
    Ready: 'Ready'
  };
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [status, setStatus] = useState(Status.Stop);
  const [timer, setTimer] = useState(0);
  const [timerRange, setTimerRange] = useState({ start: null, stop: null })
  const intervalIDRef = useRef(null);
  const onChange = e => {
    setSelectedFilter(e.value)
    onChangeFilter(e.value)
  }
  // 2029-12-31 23:59:59

  const onDwnldPlay = useCallback(e => {
    setStatus(Status.Play)
    intervalIDRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
    }, 1000);
    //
    setTimerRange(prev => ({...prev, ...{start: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.sssz')}}))
  }, []);

  const onDwnldStop = useCallback(e => {
    setStatus(Status.Ready)
    clearInterval(intervalIDRef.current);
    intervalIDRef.current = null;
    //
    setTimerRange(prev => ({...prev, ...{stop: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.sssz')}}))
  }, []);

  const onDwnldReady = e => {
    setStatus(Status.Stop)
    setTimer(0);
    setTimerRange('')
    onDownload(e, selectedFilter, timerRange)
  }
  const onDwnldCancel = useCallback(e => {
    setStatus(Status.Stop)
    clearInterval(intervalIDRef.current);
    intervalIDRef.current = null;
    setTimer(0);
    setTimerRange({ start: null, stop: null })
  }, []);

  const end = (
    <div className="flex align-items-center gap-2">
      {(Status.Play === status || Status.Ready === status) && <InputText disabled={true} value={moment.utc(timer * 1000).format('mm:ss')} placeholder="00:00" style={{width:'70px'}}/>}
      {Status.Ready === status && <Button icon="pi pi-download" onClick={onDwnldReady} outlined aria-label="Download" severity="info"/>}
      {Status.Play === status && <Button icon="pi pi-pause" onClick={onDwnldStop} outlined aria-label="Stop" severity="danger"/>}
      {Status.Stop === status && <Button icon="pi pi-play" onClick={onDwnldPlay} outlined aria-label="Start" severity="success" label="Export by time"/>}
      {(Status.Play === status || Status.Ready === status) && <Button icon="pi pi-times" onClick={onDwnldCancel} rounded text severity="danger" aria-label="Cancel" />}
      <Button disabled={inDownload} label="Export last 50" icon="pi pi-download" onClick={e => onDownload(e, selectedFilter)} className="p-button font-bold"/>
    </div>
  );
const start = (
  <div className="flex align-items-center gap-2">
      <Dropdown value={selectedFilter} onChange={onChange} options={filters} virtualScrollerOptions={{ itemSize: 38 }}
        placeholder="Select mode" className="w-8rem sm:w-auto" />
  </div>
);

  return (
    <ScrollPanel style={{ width: size.width, minHeight: '550px' }}>
      {menu && <Menubar model={[]} start={start} end={end} className='mb-5'/>}
      {children}
    </ScrollPanel>
  );
};

export default GraphicLayout;