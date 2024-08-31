export interface IChartData {
    timestamps: string;
    data_1ch: number;
    data_2ch: number;
    data_3ch: number;
    data_4ch: number;
    data_5ch: number;
    data_6ch: number;
    data_7ch: number;
    data_8ch: number;
}

export interface IChartComponentProps {
    data: IChartData[];
    num: number;
    filter: number;
    limit: number;
}

export interface IGradientChartData {
    label: string; 
    name: string; 
    center: boolean; 
    data: number[]; //Array<IChartData>
  }

export  interface ILimitY {
    name: string;
    min: number;
    max: number;
}

export interface IBoundY {
    data_1ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_2ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_3ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_4ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_5ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_6ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_7ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
    data_8ch?: {
        max?: number;
        min?: number;
        dataZoomType?: 'inside' | 'slider';
    };
}