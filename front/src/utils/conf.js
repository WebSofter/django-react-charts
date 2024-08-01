export default {
    apiUrl: process.env.REACT_APP_API_URL || '',
    limitData: process.env.REACT_APP_LIMIT_DATA || 50,
    loadSeconds: process.env.REACT_APP_LOAD_SECONDS || 1000,
    filterCoefficient: process.env.REACT_APP_FILTER_COEFFICIENT || 0.1,
}