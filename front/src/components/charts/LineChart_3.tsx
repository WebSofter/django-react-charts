import "./styles.less";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartOption } from "echarts";
import data from './data.json'

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// import { TransformComponent } from 'echarts/components'
// import { use } from "echarts/types/dist/shared";
// use([ TransformComponent ])


import revenueData from "./revenueData.json";
import sourceData from "./sourceData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

console.log(data)
export default function LineChart() {
  // const chartRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (chartRef.current) {
  //     initChart(chartRef.current);
  //   }
  // }, []);

  // function initChart(dom: HTMLDivElement) {
  //   let chart = echarts.init(dom);

  //   chart.setOption(option);
  // }

  // return (<div style={{ width: '900px', height: '150px' }} className="chartRef" ref={chartRef}></div>);
  return       <div className="dataCard revenueCard">
  <Line
  style={{ width: '900px', height: '150px' }}
    data={{
      labels: revenueData.map((data) => data.label),
      datasets: [
        {
          label: "Revenue",
          data: revenueData.map((data) => data.revenue),
          backgroundColor: "#064FF0",
          borderColor: "#064FF0",
        },
        {
          label: "Cost",
          data: revenueData.map((data) => data.cost),
          backgroundColor: "#FF3030",
          borderColor: "#FF3030",
        },
      ],
    }}
    options={{
      elements: {
        line: {
          tension: 0.5,
        },
      },
      plugins: {
        title: {
          text: "Monthly Revenue & Cost",
        },
      },
    }}
  />
</div>
}
