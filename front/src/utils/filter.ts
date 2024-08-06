import { IChartData, ILimitY } from "../type/chart"

export const filterByY = (data:IChartData[], limitY: ILimitY[]) => {
    return data.filter((row, i) => {
        let isTrue = true
        for (const [key, value] of Object.entries(row)) {
            limitY.forEach((limit) => {
                if(limit.name === key) {
                    // data[i][key as keyof IChartData] = 2
                    // let value_ = value
                    // if(value > limit.max) {
                    //     value_ = limit.max
                    // } else if(value < limit.min) {
                    //     value_ = limit.min
                    // } else {
                    //     isDel = true
                    // }
                    // data[i] = { ...data[i], ...{[key]: value_ } }
                    if(value > limit.max || value < limit.min) isTrue = false
                }
            })
        }
        // if(isDel) data = removeAt(data, i)
        return isTrue
    })
}