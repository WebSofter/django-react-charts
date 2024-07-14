import React, {useRef, useEffect, useState} from "react";
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import GraphicLayout from "../components/common/GraphicLayout";
import StackLineChart from "../components/charts/StackLineChart";
import { downloadOnPage } from "../utils/fetch"
import { Toast } from 'primereact/toast';
import { fetchChart } from "../utils/fetch"
import HeatMapChart from "../components/charts/HeatMapChart";
import HeatMapJS from "../components/charts/HeatMapJS";

const PageTop = ({ data }) => {
  const toast = useRef(null);
  const num = 1
  const limit = 50
  //
  const [chartData, setChartData] = useState([]);
  //
  const [filter, setFilter] = useState(1.0);
  const [inDownload, setInDownload] = useState(false);
  const onChangeFilter = value => setFilter(value)

  const onDownload = (e, filter) => {
    setInDownload(true);
    downloadOnPage({num, filter, limit, success: res => {
      setInDownload(false)
      toast.current.show({severity:'success', summary: 'Success', detail: `Success downloaded`, life: 3000})
    }, fail: err => {
      toast.current.show({severity:'error', summary: 'Failed', detail: `Error downloaded`, life: 3000})
      setInDownload(false)
    }})
  }
  
  useEffect(() => {
      //setInterval(function(){
          fetchChart({num, filter, limit, success: resp => {
              setChartData(resp)
          }, fail: e => {}})
      //}, interval)
  }, [filter])

  return (
    <>
      <Toast ref={toast}/>
      <PageLayout title={`Страница ${num}`}>
        <Splitter style={{ width: '100%', height: '100%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center p-8">
              <GraphicLayout menu={true} onChangeFilter={onChangeFilter} onDownload={onDownload} inDownload={inDownload}>
                <StackLineChart data={chartData}/>
              </GraphicLayout>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center p-8">
              <GraphicLayout>
                <HeatMapChart data={chartData}/>
                <HeatMapJS/>
              </GraphicLayout>
            </SplitterPanel>
        </Splitter>
      </PageLayout>
    </>
  );
};

export default PageTop;
