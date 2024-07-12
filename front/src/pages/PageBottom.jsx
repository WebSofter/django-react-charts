import React from "react";
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import GraphicLayout from "../components/common/GraphicLayout";
import HeatMapChart from "../components/charts/HeatMapChart";
import StackLineChart from "../components/charts/StackLineChart";
const PageBottom = ({ data }) => {
  return (
    <PageLayout title="Страница 2">
      <Splitter style={{ width: '100%', height: '100%' }}>
          <SplitterPanel className="flex align-items-center justify-content-center p-8">
            <GraphicLayout menu={true}>
              <StackLineChart/>
            </GraphicLayout>
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center p-8">
            <GraphicLayout>
              <HeatMapChart/>
            </GraphicLayout>
          </SplitterPanel>
      </Splitter>
    </PageLayout>
  );
};

export default PageBottom;
