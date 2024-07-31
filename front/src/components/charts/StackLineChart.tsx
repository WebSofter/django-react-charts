import React, { useRef, useEffect, useState } from 'react';
import { IChartComponentProps, IChartData } from "../../type/chart";
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
    AreaChart,
    Area,
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
    const [data_, setData_] = React.useState<IChartData[]>(data);
    useEffect(() => {
        setData_(data)
    }, [data]);

    //
    return (
        <div className="flex flex-col">
            {charts.map((chart, i) =><div className={`flex flex-row chart-item ${(i === charts.length - 1) ? 'last-chart': ''}`}>
                <div className="flex align-items-center justify-content-center" key={`circle-${i}`}>
                    <div className={'chart-circle'} style={{backgroundColor: chart.color}}>
                        <span className={'chart-circle-text font-bold text-white'}>{i + 1}</span>
                    </div>
                </div>
                <div className="flex align-items-center justify-content-center" key={`chart-wrap-${i}`}>
                    <LineChart
                        key={`chart-${i}`}
                        width={1500}
                        height={100}
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
