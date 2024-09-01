import { IChartData, ILimitY } from "../type/chart"

export const filterByY = (data:IChartData[], limitY: ILimitY[]) => {
    return data.filter((row, i) => {
        let isTrue = true
        for (const [key, value] of Object.entries(row)) {
            limitY.forEach((limit) => {
                if((limit.name === key) && (value > limit.max || value < limit.min)) isTrue = false
            })
        }
        return isTrue
    })
}