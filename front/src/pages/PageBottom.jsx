import React, {useRef, useEffect, useState} from "react";
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import GraphicLayout from "../components/common/GraphicLayout";
import GradientMapChart from "../components/charts/GradientMapChart";
import StackLineChart from "../components/charts/StackLineChart.v3";
import { downloadOnPage } from "../utils/fetch"
import { Toast } from 'primereact/toast';
import { fetchChart } from "../utils/fetch"
import conf from "../utils/conf";
import {filterByY} from "../utils/filter"

const PageTop = ({ data }) => {
  const toast = useRef(null);
  const num = 2
  const limit = conf.limitData
  //
  const [chartData, setChartData] = useState([]);
  const intervalIDRef = useRef(null);
  //
  const [filter, setFilter] = useState(1.0);
  const [inDownload, setInDownload] = useState(false);
  const onChangeFilter = value => setFilter(value)

  const onDownload = (e, filter, interval = null) => {
    setInDownload(true);
    downloadOnPage({num, filter, limit, interval, success: res => {
      setInDownload(false)
      toast.current.show({severity:'success', summary: 'Success', detail: `Success downloaded`, life: 3000})
    }, fail: err => {
      toast.current.show({severity:'error', summary: 'Failed', detail: `Error downloaded`, life: 3000})
      setInDownload(false)
    }})
  }
  
  useEffect(() => {
    intervalIDRef.current = setInterval(function(){
        fetchChart({num, filter, limit, success: resp => {
          setChartData((conf.limitY.length > 0 ? filterByY(resp, conf.limitY): resp))
        }, fail: e => {}})
    }, conf.loadSeconds)
    return(() => {
      clearInterval(intervalIDRef.current);
    })
  }, [filter])

  return (
    <>
      <Toast ref={toast}/>
      <PageLayout title={`Страница ${num}`}>
        <Splitter style={{ width: '100%', height: '100%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center p-2">
              <GraphicLayout size={{width:'700px'}} menu={true} onChangeFilter={onChangeFilter} onDownload={onDownload} inDownload={inDownload}>
                <StackLineChart data={chartData}/>
              </GraphicLayout>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center p-2">
              <GraphicLayout size={{width:'450px'}}>
                <GradientMapChart data={chartData}/>
              </GraphicLayout>
            </SplitterPanel>
        </Splitter>
      </PageLayout>
    </>
  );
};

export default PageTop;
