import React from "react";
import './styles.css'
import chartData from './data.json'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
    AreaChart,
    Area,
} from "recharts";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
type IChartData = { timestamps: string; data_1ch: number; data_2ch: number; data_3ch: number; data_4ch: number; data_5ch: number; data_6ch: number; data_7ch: number; data_8ch: number; }
// const getCharts = (chartData: IChartData[]) => {
//     const list = []
//     if (chartData.length > 0) {
//         for (const [key, value] of Object.entries(chartData[0])) {
//             if(key !== 'timestamps') list.push(key)
//         }
//     }
//     return list
// }
// const charts = chartData ? getCharts(chartData) : [];
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
console.log(charts)
export default function StackLineChart() {
    return (
        <div className="flex flex-col">
            {charts.map((chart, i) =><div className={`flex flex-row chart-item ${(i === charts.length - 1) ? 'last-chart': ''}`}>
                <div className="flex align-items-center justify-content-center">
                    <div className={'chart-circle'} style={{backgroundColor: chart.color}}>
                        <span className={'chart-circle-text'}>{i + 1}</span>
                    </div>
                </div>
                <div className="flex align-items-center justify-content-center">
                    <LineChart
                        width={1500}
                        height={100}
                        data={chartData}
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
                        <Line type="monotone" dataKey={chart.name} stroke={chart.color} fill={chart.color} />
                        {i === charts.length - 1 && (
                            <Brush />
                        )}
                    </LineChart>
                </div>
            </div>)}
        </div>
    );
}
