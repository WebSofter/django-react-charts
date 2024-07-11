import React from "react";
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import GraphicLayout from "../components/common/GraphicLayout";

const PageBottom = ({ data }) => {
  return (
    <PageLayout title="Страница 2">
      <Splitter style={{ width: '100%', height: '100%' }}>
          <SplitterPanel className="flex align-items-center justify-content-center p-8">
            <GraphicLayout>1</GraphicLayout>
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center p-8">
            <GraphicLayout>2</GraphicLayout>
          </SplitterPanel>
      </Splitter>
    </PageLayout>
  );
};

export default PageBottom;
