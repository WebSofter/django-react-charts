import React from "react";
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import GraphicLayout from "../components/common/GraphicLayout";
// import { SciChartReact } from "scichart-react";
// import { drawStackCharts } from '../components/charts/StackCharts'
// import classes from "../components/charts/styles/Examples.module.scss";
const PageTop = ({ data }) => {
  return (
    <PageLayout title="Страница 1">
      <Splitter style={{ width: '100%', height: '100%' }}>
          <SplitterPanel className="flex align-items-center justify-content-center p-8">
            <GraphicLayout>

            </GraphicLayout>
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center p-8">
            <GraphicLayout>
              
            </GraphicLayout>
          </SplitterPanel>
      </Splitter>
    </PageLayout>
  );
};

export default PageTop;
