import React, { useEffect, useRef } from "react";
import './styles.css'
import { IChartComponentProps, IChartData, IGradientChartData } from "../../type/chart";
import conf from '../../utils/conf';
import { filterByY } from "../../utils/filter";

const GradientMapChart = ({ data = [], }: IChartComponentProps) => {

  const filter = []
  for (const [key, value] of Object.entries(conf.boundY)) {
    filter.push({ name: key, min: value.min, max: value.max})
  }
  const d_ = filterByY(data, filter)
  

  const [data_, setData_] = React.useState<IChartData[]>(d_);
  useEffect(() => {
    setData_(d_)
  }, [data]);

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
  const getColorByPercent = (percent: number, label: string = '') => {
    const index = Math.floor(percent / 10)
    return colors[(index === 10 ? 9 :  index)]
}
  const circles: IGradientChartData[]  = [ 
    { label: '6', name: 'data_6ch', center: false, data: [], }, { label: '8', name: 'data_8ch', center: false, data: [], }, 
    { label: '7', name: 'data_7ch', center: false, data: [], }, { label: '3', name: 'data_3ch', center: false, data: [], }, 
    { label: '1', name: 'data_1ch', center: false, data: [], }, { label: '2', name: 'data_2ch', center: false, data: [], },
    { label: '5', name: 'data_5ch', center: true, data: [], }, { label: '4', name: 'data_4ch', center: true, data: [], } ]
  
  data_.slice(0, 10).forEach((dataRow, i)=> {
    for (const [k, v] of Object.entries(dataRow)) {
      circles.forEach((circle, j) => {
        if(circle.name === k) circle.data.push(v)
      })
    }
  })
  const getGradByData = (points: number[], label: string = '') => {
    // const min = Math.min(...points)
    const max = Math.max(...points.map((point) => Math.abs(point)))
    return points.map((point, i) => getColorByPercent((point / max * 100), label)).filter(c => c).join(',')
  }
  const pies = circles.map((c, i) => {
    if(c.center) {
      radius = 50
      div = 360 / circles.filter(c => c.center).length
    }
    //
    var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
    var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
    const style : React.CSSProperties = {position: 'absolute', top: ((y + totalOffset).toFixed(2)) + "px", left: ((x + totalOffset).toFixed(2)) + "px"}
    // console.log(style)
    //
    // console.log(c.label, getGradByData(c.data))
    return <div className="circle-wrap" style={style} key={(c.label + i)}>
      <div className="circle-chart" style={{backgroundImage: `radial-gradient(${getGradByData(c.data, c.label)})`}}>{c.label}</div>
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