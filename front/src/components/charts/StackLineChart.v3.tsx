import React, { RefObject, useEffect, useRef, } from 'react';
import * as echarts from "echarts";
import { IBoundY, IChartComponentProps, IChartData, } from "../../type/chart";
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
import conf from '../../utils/conf';

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
      // useDirtyRect: false
    });
    chartCanvas.resize({
      width: 750,
      height: 1200,
    });
    var option: echarts.EChartOption;

    const xDataList = data_.map(d => d.timestamps)
    const yDataList = (name: string) => data_.map(d => d[name  as keyof IChartData])

    option = {
      legend: {
        show: false // Hide the legend
      },

      title: charts.map((v, i) => ({ top: `${(i * 12) + 1.5}%`, left: '0%', textStyle: { fontSize: 14 }, text: v.name })),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            // yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      grid: charts.map((v, i) => ({ top: `${(i * 12 + 4.5)}%`, bottom: `${((charts.length - 1) - i) * 12 + 4.5}%` })),

      xAxis: charts.map((v, i) => ({ data: xDataList, gridIndex: i, type: 'category', boundaryGap: true, })), //(v.name as keyof typeof IBoundY)
      yAxis: charts.map((v, i) => {
        if(conf.boundY.hasOwnProperty(v.name)) {
          const bound = conf.boundY[v.name as keyof IBoundY]
          return ({ gridIndex: i, ...{ min: bound?.min ?? 0, max: bound?.max ?? 0 } })
        } else {
          return ({ gridIndex: i })
        }
    }),
      dataZoom: [
        {
          //type: 'inside', 
          xAxisIndex: charts.map((v, i) => i),
        },
        ...charts.map((v, i) => {
          if(conf.boundY.hasOwnProperty(v.name)) {
            const bound = conf.boundY[v.name as keyof IBoundY]
            return { 
              type: bound?.dataZoomType ?? 'inside', // 'inside' | 'slider
              yAxisIndex: [i,], 
            }
          } else {
            return { yAxisIndex: [i,], }
          }
      }),],
      series: charts.map((v, i) => ({
        type: 'line',
        showSymbol: false,
        data: yDataList(v.name),
        // markPoint: {
        //   data: [
        //     { type: 'max', name: 'Max' },
        //     { type: 'min', name: 'Min' }
        //   ]
        // },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }]
        // },
        xAxisIndex: i,
        yAxisIndex: i,
        lineStyle: { color: v.color }
      })),
    };
    chartCanvas.setOption(option);
  }
  //
  const getRenderedChart = (ref: RefObject<HTMLDivElement>) => {
    // const chart = charts[index];
    return (
      <div className={`flex flex-row chart-item`}>
        <div className="flex flex-col align-items-center justify-content-evenly">
          {charts.map((chart, index) => (<div className="flex align-items-center justify-content-center" key={`circle-${index}`}>
            <div className={'chart-circle'} style={{ backgroundColor: chart.color }}>
              <span className={'chart-circle-text font-bold text-white'}>{index + 1}</span>
            </div>
          </div>))}
        </div>
        <div className="flex flex-col align-items-center">
          {/* { width: '1500px', height: '110px' } */}
          <div style={{ left: '-25px' }} ref={ref}></div>
        </div>
      </div>)
  }
  //
  return (
    <div className="flex flex-col">

      {getRenderedChart(ref as unknown as RefObject<HTMLDivElement>)}

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
