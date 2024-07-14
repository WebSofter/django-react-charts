import axios from 'axios';
import { getFormatedTime } from "./formatedTime"

export const downloadOnPage = ({num, filter, limit = 50, success = e => {}, fail = e => {}}) => axios({
    url: `https://api.rehome.wsofter.com/api/charts/${num}/download?filter=${filter}&limit=${limit}`, //your url
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
    fetch(`https://api.rehome.wsofter.com/api/charts/${num}?filter=${filter}&limit=${limit}`)
    .then(res => res.json())
    .then(
      (result) => success(result),
      (error) => fail(error),
  )
}