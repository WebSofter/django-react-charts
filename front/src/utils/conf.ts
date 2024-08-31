import { IBoundY, ILimitY } from "../type/chart";

const conf = {
    apiUrl: process.env.REACT_APP_API_URL || '',
    limitData: process.env.REACT_APP_LIMIT_DATA || 50,
    loadSeconds: process.env.REACT_APP_LOAD_SECONDS || 1000,
    filterCoefficient: process.env.REACT_APP_FILTER_COEFFICIENT || 0.1,
    limitY: [
        // {
        //     name: 'data_1ch',
        //     max: 70,
        //     min: 10,
        // }
    ] as ILimitY[],
    boundY : {
        data_1ch: {
            max: 80,
            min: 0,
            dataZoomType: 'slider',
        },
        data_2ch: {
            max: 19123,
            min: 0,
            dataZoomType: 'inside',
        },
        data_3ch: {
            max: 12156,
            min: 0,
            dataZoomType: 'inside',
        },
        data_4ch: {
            max: 33416,
            min: 0,
            dataZoomType: 'inside',
        },
        data_5ch: {
            max: 7414,
            min: 0,
            dataZoomType: 'inside',
        },
        data_6ch: {
            max: 3689,
            min: 0,
            dataZoomType: 'inside',
        },
        data_7ch: {
            max: 20641,
            min: 0,
            dataZoomType: 'inside',
        },
        data_8ch: {
            max: 2535,
            min: 0,
            dataZoomType: 'inside',
        }
    } as IBoundY,
}

export default conf