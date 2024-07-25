import axios from 'axios';
import { getFormatedTime } from "./formatedTime"
import conf from "../utils/conf"

export const downloadOnPage = ({num, filter, limit = 50, interval = null, success = e => {}, fail = e => {}}) => axios({
    url: `${conf.apiUrl}/api/charts/${num}/download?filter=${filter}&limit=${limit}&interval=${encodeURIComponent(JSON.stringify(interval))}`, //your url
    method: 'GET',
    responseType: 'blob',
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `page_#${num}_${getFormatedTime()}.csv`); //or any other extension
    document.body.appendChild(link);
    link.click();
    success(response)
}).catch(function (error) {
    console.error(error.toJSON());
    fail(error)
})

export const fetchChart = ({num, filter, limit, success = e => {}, fail = e => {}}) => {
    fetch(`${conf.apiUrl}/api/charts/${num}?filter=${filter}&limit=${limit}`)
    .then(res => res.json())
    .then(
      (result) => success(result),
      (error) => fail(error),
  )
}