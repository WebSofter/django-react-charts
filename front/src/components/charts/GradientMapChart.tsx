import React, { useEffect, useRef } from "react";
import './styles.css'
import { IChartComponentProps, IGradientChartData } from "../../type/chart";
/*
[{
    "timestamps": "2024-05-07T10:13:29.930000Z",
    "data_1ch": 332.86,
    "data_2ch": 17799.4,
    "data_3ch": 12481.9,
    "data_4ch": 34559.2,
    "data_5ch": 8666.49,
    "data_6ch": 13773.4,
    "data_7ch": 21895.4,
    "data_8ch": 10761.3
},
...
}
*/
const GradientMapChart = ({ data, }: IChartComponentProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      initChart(chartRef.current);
    }
  }, []);

  function initChart(dom: HTMLDivElement) {

  }
  //
  var div = 360 / 6;
  var radius = 150;
  var offsetToParentCenter = 75 // parseInt(chartRef.current?.offsetWidth / 2); //assumes parent is square
  var offsetToChildCenter = 20;
  var totalOffset = offsetToParentCenter - offsetToChildCenter;
  
  //
  const colors = [
    '#3a60c8ff',
    '#475cbfff',
    '#5956afff',
    '#6e4ca0ff',
    '#864388ff',
    '#9e397bff',
    '#b63164ff',
    '#cc2a51ff',
    '#e4223dff',
    '#e4223dff',
    '#fb182bff',
  ] //.reverse()
  const getColorByPercent = (percent: number) => {
    const index = Math.floor(percent / 10)
    return colors[(index === 10 ? 9 :  index)]
}
  const circles: IGradientChartData[]  = [ 
    { label: '6', name: 'data_6ch', center: false, data: [], }, { label: '8', name: 'data_8ch', center: false, data: [], }, 
    { label: '7', name: 'data_7ch', center: false, data: [], }, { label: '3', name: 'data_3ch', center: false, data: [], }, 
    { label: '1', name: 'data_1ch', center: false, data: [], }, { label: '2', name: 'data_2ch', center: false, data: [], },
    { label: '5', name: 'data_5ch', center: true, data: [], }, { label: '4', name: 'data_4ch', center: true, data: [], } ]
  
  data.slice(0, 10).forEach((dataRow, i)=> {
    for (const [k, v] of Object.entries(dataRow)) {
      circles.forEach((circle, j) => {
        if(circle.name === k) circle.data.push(v)
      })
    }
  })
  const getGradByData = (points: number[]) => {
    // const min = Math.min(...points)
    const max = Math.max(...points)
    return points.map((point, i) => getColorByPercent((point / max * 100))).join(',')
  }
  const pies = circles.map((c, i) => {
    if(c.center) {
      radius = 50
      div = 360 / circles.filter(c => c.center).length
    }
    //
    var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
    var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
    const style : React.CSSProperties = {position: 'absolute', top: (y + totalOffset).toString() + "px", left: (x + totalOffset).toString() + "px"}
    //
    return <div className="circle-wrap" style={style}>
      <div className="circle-chart" style={{backgroundImage: `radial-gradient(${getGradByData(c.data)})`}}>{c.label}</div>
    </div>
  })
  //
  return (<div style={{ width: '550px', height: '550px' }} className="chartRef circle" ref={chartRef}>
    <div id="parentdiv">{pies}
      <div className={'circle-bg'}></div>
    </div>
  </div>);
}

export default GradientMapChart;