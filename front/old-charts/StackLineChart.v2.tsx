import React, { RefObject, useEffect, useRef, } from 'react';
import * as echarts from "echarts";
import { IChartComponentProps, IChartData, } from "../../type/chart";
import './styles.css'
// import chartData from './data.json'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
} from "recharts";

const charts = [
    {
        name: "data_1ch",
        color: "#818181FF"
    },
    {
        name: "data_2ch",
        color: "#7C4A8FFF"
    },
    {
        name: "data_3ch",
        color: "#36599AFF"
    },
    {
        name: "data_4ch",
        color: "#2F725AFF"
    },
    {
        name: "data_5ch",
        color: "#DFB010FF"
    },
    {
        name: "data_6ch",
        color: "#FE5D30FF"
    },
    {
        name: "data_7ch",
        color: "#EC312EFF"
    },
    {
        name: "data_8ch",
        color: "#9F5233FF"
    }
]

export default function StackLineChart({ data = [], }: IChartComponentProps) {
    const ref = useRef();
    const [data_, setData_] = React.useState<IChartData[]>(data);
    useEffect(() => {
        setData_(data)
        initChart(ref.current)
    }, [data, ref]);
    
    function initChart(dom: HTMLElement | null | undefined) {
        // const chart = charts[index];
        let chartCanvas = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        chartCanvas.resize({
          width: 750,
          height: 750,
        });
        var option: echarts.EChartOption;
/*
data_ = [{
    "timestamps": "2024-05-07T10:25:59.067000Z",
    "data_1ch": 76.17,
    "data_2ch": 19123.1,
    "data_3ch": 12155.5,
    "data_4ch": 33300.2,
    "data_5ch": 7269.59,
    "data_6ch": 3349.27,
    "data_7ch": 20539.3,
    "data_8ch": 2327.35
},
...]
*/

        // const seriesData = data_.map(d => d[chart.name  as keyof IChartData])
        // const max = Math.max(...seriesData.map((point) => Math.abs(point as number)))
        // const min = Math.min(...seriesData.map((point) => Math.abs(point as number)))
        // console.log({min, max})
        option = {
          title: {
            text: 'Temperature Change in the Coming Week'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: 'Highest',
              type: 'line',
              data: [10, 11, 13, 11, 12, 12, 9],
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            } as echarts.EChartOption.Series,
            {
              name: 'Lowest',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
              },
              markLine: {
                data: [
                  { type: 'average', name: 'Avg' },
                  [
                    {
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        position: 'start',
                        formatter: 'Max'
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ]
              }
            } as echarts.EChartOption.Series
          ],
          dataZoom: [
            { yAxisIndex: 0, xAxisIndex: [0], bottom: 0, filterMode: "none", startValue: 20, endValue: 30 },
            { yAxisIndex: 1, xAxisIndex: [1], filterMode: "none", startValue: 20, endValue: 30 },
          ]
        };
      /*
      option2 = {
            title: {
              text: "chart2"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["今天", "昨天", "上周"]
            },
            xAxis: {
              data: ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
            },
            yAxis: [{}],
            series: [
              {
                name: "上周",
                type: "line",
                data: [10, 35, 20, 13, 12, 18, 41]
              },
              {
                name: "上周",
                type: "line",
                data: [23, 45, 20, 43, 12, 28, 21]
              }
            ],
            dataZoom: [
              { yAxisIndex: 0, filterMode: "none", startValue: 20, endValue: 30 }
            ]
          }
        */
          chartCanvas.setOption(option);
    }
    //
    const getRenderedChart = (ref: RefObject<HTMLDivElement>, index: number) => {
      const chart = charts[index];
      return (
      <div className={`flex flex-row chart-item ${(index === charts.length - 1) ? 'last-chart': ''}`}>
        <div className="flex align-items-center justify-content-center" key={`circle-${index}`}>
            <div className={'chart-circle'} style={{backgroundColor: chart.color}}>
                <span className={'chart-circle-text font-bold text-white'}>{index + 1}</span>
            </div>
        </div>
        <div className="flex align-items-center justify-content-center" key={`chart-wrap-${index}`}>
        {/* { width: '1500px', height: '110px' } */}
          <div style={{ left: '-100px' }} key={index} ref={ref}></div>
        </div>
      </div>)
    }
    //
    return (
        <div className="flex flex-col">
          
          {getRenderedChart(ref as unknown as RefObject<HTMLDivElement>, 0)}

          {/* {charts.map((chart, i) =><div className={`flex flex-row chart-item ${(i === charts.length - 1) ? 'last-chart': ''}`}>
              <div className="flex align-items-center justify-content-center" key={`circle-${i}`}>
                  <div className={'chart-circle'} style={{backgroundColor: chart.color}}>
                      <span className={'chart-circle-text font-bold text-white'}>{i + 1}</span>
                  </div>
              </div>
              <div className="flex align-items-center justify-content-center" key={`chart-wrap-${i}`}>
                  <div className={'side-limit-container'}>
                      <LineChart
                          key={`chart-${i}`}
                          width={1500}
                          height={110}
                          data={data_}
                          syncId="anyId"
                          margin={{
                              top: 0,
                              right: 0,
                              left: 0,
                              bottom: -10,
                          }}
                      >
                          <CartesianGrid strokeDasharray="1 1" />
                          <XAxis dataKey={'timestamps'}/>
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey={chart.name} stroke={chart.color} fill={chart.color}/>
                          {i === charts.length - 1 && (
                              <Brush />
                          )}
                      </LineChart>
                  </div>
              </div>
          </div>)} */}
        </div>
    );
}
