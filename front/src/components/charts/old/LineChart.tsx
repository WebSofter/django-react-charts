// import "./styles.less";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartOption } from "echarts";
import data from '../data.json'
console.log(data)
export default function LineChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      initChart(chartRef.current);
    }
  }, []);

  function initChart(dom: HTMLDivElement) {
    let chart = echarts.init(dom);
    const option: EChartOption = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['data_4ch', ],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        data: data.map(item => item.timestamps)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'data_4ch',
          type: 'line',
          stack: 'data_4ch',
          data: data.map(item => item.data_4ch)
        },
        // {
        //   name: 'data_2ch',
        //   type: 'line',
        //   stack: 'data_2ch',
        //   data: data.map(item => item.data_2ch)
        // },
      ]
    };
    chart.setOption(option);
  }

  return (<div style={{ width: '550px', height: '150px' }} className="chartRef" ref={chartRef}></div>);
}
