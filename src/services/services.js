import axios from "axios";

var baseurl = "";
if (import.meta.env.DEV) {
  baseurl =  "https://localhost:3018/course-t8"   //"https://localhost/course-management";
} else {
  baseurl = "https://project2.eaglesoftwareteam.com/course-t8";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {

    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
   
    return data;
  },
});

export default apiClient;
