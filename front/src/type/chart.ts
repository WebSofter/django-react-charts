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
    data: IChartData;
    num: number;
    filter: number;
    limit: number;
}