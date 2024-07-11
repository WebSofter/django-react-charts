import React, {useState} from "react";
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import GraphicLayout from "../components/common/GraphicLayout";
import HeatMapChart from "../components/charts/HeatMapChart";
import LineChart from "../components/charts/LineChart";
import { UserData } from "../components/charts/Data";
const PageTop = ({ data }) => {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <PageLayout title="Страница 1" style={{ width: 700 }}>
<LineChart chartData={userData}/>
    </PageLayout>
  );
};

export default PageTop;
